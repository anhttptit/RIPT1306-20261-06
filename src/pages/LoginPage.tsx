import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { LoginLocationState } from "../types";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LoginLocationState | null;
  const from = state?.from ?? "/";

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.trim() === "") {
      setError("Nhập tên đăng nhập.");
      return;
    }
    const ok = login(username.trim(), password);
    if (!ok) {
      setError("Sai mật khẩu. Mật khẩu demo là 123.");
      return;
    }
    navigate(from, { replace: true });
  };

  return (
    <section className="auth-card">
      <h1>Đăng nhập</h1>
      {from !== "/" && (
        <p className="notice">Đăng nhập để tiếp tục thanh toán.</p>
      )}
      <form onSubmit={submit}>
        <label>
          Tên đăng nhập
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
        </label>
        <label>
          Mật khẩu
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="btn btn-lg btn-block">Đăng nhập</button>
      </form>
      <p className="muted">
        Demo: tên bất kỳ, mật khẩu <b>123</b>.
      </p>
    </section>
  );
}
