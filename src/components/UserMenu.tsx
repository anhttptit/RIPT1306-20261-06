import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UserMenu() {
  const { user, logout } = useAuth();
  if (!user) {
    return (
      <Link to="/login" className="btn btn-ghost">
        Đăng nhập
      </Link>
    );
  }
  return (
    <div className="user-menu">
      <span className="avatar">{user.name[0].toUpperCase()}</span>
      <span className="user-name">{user.name}</span>
      <button className="btn btn-ghost" onClick={logout}>Đăng xuất</button>
    </div>
  );
}
