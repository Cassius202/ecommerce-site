// app/api/whatsapp/webhook/route.ts


import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";
import { SYSTEM_PROMPT } from "@/constants/systemPrompt";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ── Conversation Memory ──────────────────────────────────────────────────────
// Keyed by sender's WhatsApp number. Stores last 15 messages per user.
type Message = { role: "user" | "model"; parts: [{ text: string }] };
const conversationHistory = new Map<string, Message[]>();

const MAX_HISTORY = 16;

function getHistory(sender: string): Message[] {
  if (!conversationHistory.has(sender)) {
    conversationHistory.set(sender, []);
  }
  return conversationHistory.get(sender)!;
}

function addToHistory(sender: string, role: "user" | "model", text: string) {
  const history = getHistory(sender);
  history.push({ role, parts: [{ text }] });

  // Keep only the last MAX_HISTORY messages
  if (history.length > MAX_HISTORY) {
    history.splice(0, history.length - MAX_HISTORY);
  }
}

// ── Deduplication ────────────────────────────────────────────────────────────
const processedMessages = new Set<string>();

// ── GET: Webhook Verification ────────────────────────────────────────────────
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }

  return new Response('Forbidden', { status: 403 });
}

// ── POST: Incoming Messages ──────────────────────────────────────────────────
export async function POST(req: Request) {
  const body = await req.json();
  const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

  if (!message?.text?.body) {
    return NextResponse.json({ status: 'no_message' });
  }

  // Deduplicate
  const messageId = message.id;
  if (processedMessages.has(messageId)) {
    return NextResponse.json({ status: 'duplicate' });
  }
  processedMessages.add(messageId);
  setTimeout(() => processedMessages.delete(messageId), 5 * 60 * 1000);

  const userText = message.text.body;
  const senderNumber = message.from;

  // Save user message to history
  addToHistory(senderNumber, "user", userText);

  const history = getHistory(senderNumber);
  let aiText = "";

  await sleep(3000);

  // ── Attempt 1: Gemini with full chat history ──
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    // Gemini uses the history BEFORE the latest message
    const chatHistory = history.slice(0, -1); // everything except the last user message

    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(userText);
    aiText = result.response.text();

  } catch (err) {
    console.error("[Gemini failed — trying Groq]", err);

    // ── Attempt 2: Groq with full chat history ──
    try {
      // Convert history to Groq's format
      const groqMessages = [
        { role: "system" as const, content: SYSTEM_PROMPT },
        ...history.map((m) => ({
          role: m.role === "model" ? "assistant" as const : "user" as const,
          content: m.parts[0].text,
        })),
      ];

      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: groqMessages,
      });

      aiText = completion.choices[0]?.message?.content ?? "";

    } catch (groqErr) {
      console.error("[Groq also failed]", groqErr);
      aiText = "So sorry, I'm a little tied up right now. I'll get another person to try and call you in a bit 🙏";
    }
  }

  // Save Portia's reply to history
  addToHistory(senderNumber, "model", aiText);

  // ── Send reply via WhatsApp ──
  const waResponse = await fetch(
    `https://graph.facebook.com/v25.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: senderNumber,
        type: "text",
        text: { body: aiText },
      }),
    }
  );

  if (!waResponse.ok) {
    console.error("[WhatsApp send failed]", await waResponse.text());
    return NextResponse.json({ status: 'send_failed' }, { status: 500 });
  }

  return NextResponse.json({ status: 'success' });
}