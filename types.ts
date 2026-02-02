
export type OrderStatus = 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
export type PaymentStatus = 'Pending' | 'Approved' | 'Rejected';

export interface Service {
  id: string;
  category: string;
  name: string;
  pricePer1k: number;
  min: number;
  max: number;
  description: string;
}

export interface Order {
  id: string;
  serviceId: string;
  serviceName: string;
  link: string;
  quantity: number;
  charge: number;
  status: OrderStatus;
  createdAt: number;
  paymentId?: string;
}

export interface PaymentRequest {
  id: string;
  method: 'bKash' | 'Nagad';
  amount: number;
  trxId: string;
  status: PaymentStatus;
  createdAt: number;
}
