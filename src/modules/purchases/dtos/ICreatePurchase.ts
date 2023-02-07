import { IPurchaseCart } from "./IPurchaseCart";

interface ICreatePurchase {
  user_id: string;
  address_id: string;
  cart: IPurchaseCart[];
  purchase_id?: string;
  created_at?: Date;
  products_value?: number;
  delivery_value?: number;
  total_value?: number;
  status?: string;
  payment_type: string;
}

export { ICreatePurchase };
