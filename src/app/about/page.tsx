import Markdown from "@/utils/mark-down";

const aboutText = `
## Welcome to Cassius Store
We are a premium e-commerce destination built for the modern Nigerian shopper. Based right here in **Lagos**, we understand the hustle and the need for quality products without the unnecessary markup.

## Our Mission
Our goal is simple: to provide a seamless shopping experience from browsing to unboxing. Whether you are in the heart of **Ikeja** or ordering from **Abuja**, we bring the store to your doorstep.

## Why Shop With Us?
We know that delivery fees can be a dealbreaker. That is why we have optimized our logistics to offer **nationwide shipping** with some of the **cheapest delivery rates** in the country. 

## Fast, Secure, & Local
By integrating local payment solutions like **Paystack**, we ensure your transactions are always secure. We aren't just an international template; we are built by Nigerians, for Nigeria.
`;

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20 flex justify-center">
      <div className="max-w-2xl lg:max-w-3xl xl:max-w-4xl w-full p-8 backdrop-blur-md">
        <h1 className="text-4xl font-bold text-stone-50 mb-8 border-b border-zinc-800 pb-4">
          About Us
        </h1>
        
        <div className="text-zinc-400 leading-relaxed">
          <Markdown text={aboutText} />
        </div>
      </div>
    </main>
  );
}