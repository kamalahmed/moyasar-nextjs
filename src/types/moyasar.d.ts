// src/types/moyasar.d.ts

export interface PaymentSource {
  type: 'creditcard' | 'applepay' | 'stcpay';
  name?: string;
  number?: string;
  cvc?: string;
  month?: string;
  year?: string;
}

export interface PaymentData {
  amount: number;
  currency: string;
  description: string;
  source: PaymentSource;
  callback_url?: string;
}

export interface PaymentResponse {
  id: string;
  status: string;
  amount: number;
  fee: number;
  currency: string;
  refunded: number;
  refunded_at: string | null;
  captured: number;
  captured_at: string | null;
  voided_at: string | null;
  description: string;
  amount_format: string;
  fee_format: string;
  refunded_format: string;
  captured_format: string;
  invoice_id: string | null;
  ip: string;
  callback_url: string;
  created_at: string;
  updated_at: string;
  source: PaymentSource & {
    transaction_url?: string;
    company?: string;
    name?: string;
    number?: string;
    message?: string;
    gateway_id?: string;
    reference_number?: string;
  };
}

export class Moyasar {
  constructor(apiKey: string);
  
  request(method: string, path: string, data?: any): Promise<any>;

  payment: {
    create: (data: PaymentData) => Promise<PaymentResponse>;
    fetch: (id: string) => Promise<PaymentResponse>;
    refund: (id: string, amount?: number) => Promise<PaymentResponse>;
  };
}