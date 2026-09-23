export type ID = number | string;

export type Category = "ao" | "quan" | "phukien";

export enum OrderStatus {
  Pending,
  Paid,
}

export interface Product {
  readonly id: ID;
  name: string;
  price: number;
  category: Category;
  discount?: number;
}

export type CartItem = [Product, number];
