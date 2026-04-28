// constants/types.payment.ts

import { Interface } from "readline";

export interface VerifyPaymentResponse {
  status: boolean;
  message: string;
  data: PaymentTransaction;
}

// --------------------
// Core Transaction
// --------------------

export interface PaymentTransaction {
  id: number;
  domain: string;
  status: PaymentStatus;
  reference: string;
  receipt_number: string | null;
  amount: number;
  message: string | null;
  gateway_response: string;
  paid_at: string;
  created_at: string;
  channel: PaymentChannel;
  currency: Currency;
  ip_address: string;
  metadata: Record<string, unknown> | null;
  log: PaymentLog;
  fees: number;
  fees_split: Record<string, unknown> | null;
  authorization: PaymentAuthorization;
  customer: PaymentCustomer;
  plan: Record<string, unknown> | null;
  split: Record<string, unknown>;
  order_id: string | null;
  paidAt: string;
  createdAt: string;
  requested_amount: number;
  pos_transaction_data: Record<string, unknown> | null;
  source: Record<string, unknown> | null;
  fees_breakdown: Record<string, unknown> | null;
  connect: Record<string, unknown> | null;
  transaction_date: string;
  plan_object: Record<string, unknown>;
  subaccount: Record<string, unknown>;
}

export interface ShortPaymentTransactionDetails {
  reference: string;
  amount: number;
  currency: Currency;
  status: PaymentStatus;
  transaction_date: string;
  customer: PaymentCustomer;
  receipt_number: string | null;
}

// --------------------
// Supporting Types
// --------------------

export interface PaymentLog {
  start_time: number;
  time_spent: number;
  attempts: number;
  errors: number;
  success: boolean;
  mobile: boolean;
  input: unknown[];
  history: PaymentLogHistory[];
}

export interface PaymentLogHistory {
  type: "action" | "success" | "error";
  message: string;
  time: number;
}

export interface PaymentAuthorization {
  authorization_code: string;
  bin: string;
  last4: string;
  exp_month: string;
  exp_year: string;
  channel: PaymentChannel;
  card_type: string;
  bank: string;
  country_code: string;
  brand: string;
  reusable: boolean;
  signature: string;
  account_name: string | null;
}

export interface PaymentCustomer {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  customer_code: string;
  phone: string | null;
  metadata: Record<string, unknown> | null;
  risk_action: string;
  international_format_phone: string | null;
}

// --------------------
// Enums (important 🔥)
// --------------------

export type PaymentStatus = "success" | "failed" | "pending";

export type PaymentChannel = "card" | "bank" | "ussd" | "transfer";

export type Currency = "NGN" | "USD" | "EUR";