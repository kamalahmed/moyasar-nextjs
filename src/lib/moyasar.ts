// src/lib/moyasar.ts

import { PaymentData, PaymentResponse } from '../types/moyasar';

export class Moyasar {
  private apiKey: string;
  private baseUrl: string = 'https://api.moyasar.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private base64Encode(str: string): string {
    return btoa(str);
  }

  async request(method: string, path: string, data?: any): Promise<any> {
    const url = `${this.baseUrl}${path}`;
    const response = await fetch(url, {
      method,
      headers: {
        'Authorization': `Basic ${this.base64Encode(this.apiKey + ':')}`,
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  payment = {
    create: (data: PaymentData): Promise<PaymentResponse> => this.request('POST', '/payments', data),
    fetch: (id: string): Promise<PaymentResponse> => this.request('GET', `/payments/${id}`),
    refund: (id: string, amount?: number): Promise<PaymentResponse> => this.request('POST', `/payments/${id}/refund`, amount ? { amount } : undefined),
  };
}