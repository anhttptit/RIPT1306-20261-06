import { OrderStatus } from "./types.js";
import type { ID, Product, CartItem } from "./types.js";

export function formatPrice(price: number): string {
  return price.toLocaleString("vi-Vn") + " đ";
}

export class Card {
  private items: CartItem[] = [];
  public status: OrderStatus = OrderStatus.Pending;

  add(product: Product, qty: number = 1): void {
    const item = this.items.find(([p]) => p.id === product.id);
    // console.log("🚀 ~ Card ~ add ~ product:", product);
    // console.log("🚀 ~ Card ~ add ~ item:", item);

    if (item) {
      item[1] += qty;
    } else {
      this.items.push([product, qty]);
    }

    this.status = OrderStatus.Pending;
  }

  remove(id: ID): void {
    this.items = this.items.filter(([p]) => p.id !== id);
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  getTotal(): number {
    return this.items.reduce((total, [p, qty]) => {
      const price = p.price * (1 - (p.discount ?? 0) / 100);

      return total + price * qty;
    }, 0);
  }

  checkout(): number {
    const total = this.getTotal();

    if (total === 0) return 0;

    this.items = [];
    this.status = OrderStatus.Paid;

    return total;
  }
}
