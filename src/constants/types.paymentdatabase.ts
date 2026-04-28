// Updated Payment interface for Single Item

export interface PaymentItem {
  id: string | number;
  name: string;
  price: number; // Naira
  quantity: number;
}

export interface PaymentMetadata {
  type: 'buy_now' | 'cart';
  items: PaymentItem[];
}

export interface Payment {
  id: string;
  reference: string;
  address_id: string;
  delivery_fee: number;
  user_id: string | null;
  email: string | null;
  amount: number; // Kobo
  status: 'pending' | 'success' | 'failed';
  metadata: PaymentMetadata; // Simplified
  created_at: string;
}

