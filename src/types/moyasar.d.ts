declare module 'moyasar' {
    export default class Moyasar {
      constructor(secretKey: string);
      payment: {
        create: (options: {
          amount: number;
          currency: string;
          description: string;
          callback_url: string;
        }) => Promise<{
          source: {
            transaction_url: string;
          };
        }>;
      };
    }
  }