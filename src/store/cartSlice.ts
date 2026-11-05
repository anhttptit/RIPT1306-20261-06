import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, Product } from "../types";
import type { RootState } from "./index";

interface CartState {
  items: CartItem[];
}

interface AddToCartPayload {
  product: Product;
  qty?: number;
}

function loadCart(): CartState {
  try {
    const saved = localStorage.getItem("cart");
    return saved ? (JSON.parse(saved) as CartState) : { items: [] };
  } catch {
    return { items: [] };
  }
}

const initialState: CartState = loadCart();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<AddToCartPayload>) {
      const { product, qty = 1 } = action.payload;
      const item = state.items.find((i) => i.id === product.id);
      if (item) item.qty += qty;
      else state.items.push({ ...product, qty });
    },
    increase(state, action: PayloadAction<number>) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.qty += 1;
    },
    decrease(state, action: PayloadAction<number>) {
      const item = state.items.find((i) => i.id === action.payload);
      if (!item) return;
      if (item.qty > 1) item.qty -= 1;
      else state.items = state.items.filter((i) => i.id !== action.payload);
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, increase, decrease, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

export const selectItems = (state: RootState): CartItem[] => state.cart.items;
export const selectCount = (state: RootState): number =>
  state.cart.items.reduce((sum, i) => sum + i.qty, 0);
export const selectTotal = (state: RootState): number =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);
