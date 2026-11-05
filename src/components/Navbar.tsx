import { Link } from "react-router-dom";
import CartBadge from "./CartBadge";
import UserMenu from "./UserMenu";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">MyShop</Link>
        <nav className="nav-right">
          <CartBadge />
          <UserMenu />
        </nav>
      </div>
    </header>
  );
}
