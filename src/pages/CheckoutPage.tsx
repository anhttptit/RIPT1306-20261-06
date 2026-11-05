import { useReducer, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearCart, selectItems, selectTotal } from "../store/cartSlice";
import { useAuth } from "../context/AuthContext";
import { formatVND } from "../data/products";
import type { Order, PaymentMethod } from "../types";

interface Fields {
  phone: string;
  address: string;
  payment: PaymentMethod;
}

interface Errors {
  phone?: string;
  address?: string;
}

interface FormState {
  fields: Fields;
  errors: Errors;
  submitting: boolean;
}

type FormAction =
  | { type: "field"; name: "phone" | "address"; value: string }
  | { type: "payment"; value: PaymentMethod }
  | { type: "invalid"; errors: Errors }
  | { type: "submit" };

const initialForm: FormState = {
  fields: { phone: "", address: "", payment: "cod" },
  errors: {},
  submitting: false,
};

function checkoutReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "field":
      return {
        ...state,
        fields: { ...state.fields, [action.name]: action.value },
        errors: { ...state.errors, [action.name]: undefined },
      };
    case "payment":
      return { ...state, fields: { ...state.fields, payment: action.value } };
    case "invalid":
      return { ...state, errors: action.errors };
    case "submit":
      return { ...state, submitting: true };
    default:
      return state;
  }
}

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (fields.phone.length !== 10 || !fields.phone.startsWith("0")) {
    errors.phone = "Số điện thoại gồm 10 chữ số, bắt đầu bằng 0.";
  }
  if (fields.address.trim().length < 10) {
    errors.address = "Nhập địa chỉ đầy đủ (ít nhất 10 ký tự).";
  }
  return errors;
}

export default function CheckoutPage() {
  const [form, dispatchForm] = useReducer(checkoutReducer, initialForm);
  const { user } = useAuth();
  const items = useAppSelector(selectItems);
  const total = useAppSelector(selectTotal);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!user) return null;
  if (items.length === 0 && !form.submitting) {
    return <Navigate to="/cart" replace />;
  }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validate(form.fields);
    if (errors.phone || errors.address) {
      dispatchForm({ type: "invalid", errors: errors });
      return;
    }
    dispatchForm({ type: "submit" });
    const order: Order = {
      name: user.name,
      total: total,
      count: items.length,
      phone: form.fields.phone,
      address: form.fields.address,
      payment: form.fields.payment,
    };
    dispatch(clearCart());
    navigate("/success", { state: order, replace: true });
  };

  const { fields, errors } = form;

  return (
    <section>
      <div className="page-head">
        <h1>Thanh toán</h1>
      </div>
      <div className="cart-layout">
        <form className="checkout-form" onSubmit={submit} noValidate>
          <label>
            Người nhận
            <input value={user.name} disabled />
          </label>
          <label>
            Số điện thoại
            <input
              value={fields.phone}
              onChange={(e) => dispatchForm({ type: "field", name: "phone", value: e.target.value })}
              inputMode="tel"
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </label>
          <label>
            Địa chỉ giao hàng
            <textarea
              rows={3}
              value={fields.address}
              onChange={(e) => dispatchForm({ type: "field", name: "address", value: e.target.value })}
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </label>
          <fieldset>
            <legend>Cách thanh toán</legend>
            <label className="radio">
              <input
                type="radio"
                name="payment"
                checked={fields.payment === "cod"}
                onChange={() => dispatchForm({ type: "payment", value: "cod" })}
              />
              Tiền mặt khi nhận hàng
            </label>
            <label className="radio">
              <input
                type="radio"
                name="payment"
                checked={fields.payment === "bank"}
                onChange={() => dispatchForm({ type: "payment", value: "bank" })}
              />
              Chuyển khoản
            </label>
          </fieldset>
          <button className="btn btn-lg btn-block" disabled={form.submitting}>
            Đặt hàng · {formatVND(total)}
          </button>
        </form>
        <aside className="summary">
          <h2>Đơn hàng</h2>
          {items.map((i) => (
            <div key={i.id} className="summary-row">
              <span>
                {i.name} × {i.qty}
              </span>
              <span>{formatVND(i.price * i.qty)}</span>
            </div>
          ))}
          <div className="summary-row summary-total">
            <span>Tổng</span>
            <span>{formatVND(total)}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
