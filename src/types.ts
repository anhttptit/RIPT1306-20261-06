export type Category = "Bàn phím" | "Chuột" | "Âm thanh" | "Phụ kiện";

export type CategoryFilter = "Tất cả" | Category;

export type PaymentMethod = "cod" | "bank";

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  emoji: string;
  color: string;
  desc: string;
}

export interface CartItem extends Product {
  qty: number;
}

export interface Order {
  name: string;
  total: number;
  count: number;
  phone: string;
  address: string;
  payment: PaymentMethod;
}

export interface LoginLocationState {
  from: string;
}
