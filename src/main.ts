import { OrderStatus } from "./types.js";
import type { Product } from "./types.js";
import { Card, formatPrice } from "./card.js";

const json = `[
  { "id": 1,     "name": "Áo thun",      "price": 150000, "category": "ao" },
  { "id": 2,     "name": "Quần jean",    "price": 420000, "category": "quan", "discount": 15 },
  { "id": "SP3", "name": "Mũ lưỡi trai", "price": 120000, "category": "phukien" }
]`;

const products: Product[] = JSON.parse(json);

const cart = new Card();

const producList = document.querySelector<HTMLUListElement>("#products");
const cartList = document.querySelector<HTMLUListElement>("#cart");
const totalEl = document.getElementById("total");
const msgEL = document.getElementById("msg");

function renderProducts(): void {
  if (!producList) return;

  products.forEach((p) => {
    const li = document.createElement("li");

    li.textContent = `${p.name} - ${formatPrice(p.price)}${p.discount ? ` (-${p.discount}%)` : ""}`;

    const addBtn = document.createElement("button");

    addBtn.textContent = "Thêm";

    addBtn.addEventListener("click", () => {
      cart.add(p);
      renderCart();
    });

    li.appendChild(addBtn);
    producList.appendChild(li);
  });
}

function renderCart(): void {
  if (!cartList) return;

  cartList.innerHTML = "";

  cart.getItems().forEach(([p, qty]) => {
    const li = document.createElement("li");

    li.textContent = `${p.name} * ${qty}`;

    const removeBtn = document.createElement("button");

    removeBtn.textContent = "Xóa";

    removeBtn.addEventListener("click", () => {
      cart.remove(p.id);
      renderCart();
    });

    li.appendChild(removeBtn);
    cartList.appendChild(li);
  });

  if (totalEl) {
    totalEl.textContent = formatPrice(cart.getTotal());
  }
}

document.getElementById("btn-pay")?.addEventListener("click", () => {
  const paid = cart.checkout();

  if (msgEL) {
    msgEL.textContent =
      cart.status === OrderStatus.Paid && paid > 0
        ? `Thanh toán thành công ${formatPrice(paid)}`
        : "Giỏ hàng rỗng";
  }
});

renderProducts();
renderCart();
