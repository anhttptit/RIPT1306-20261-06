import { Link, NavLink, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <nav className="nav">
        <Link to="/" className="logo">
          RIPT <span>Music</span>
        </Link>
        <NavLink to="/" end className="nav-link">
          Khám phá
        </NavLink>
        <NavLink to="/gioi-thieu" className="nav-link">
          Giới thiệu
        </NavLink>
      </nav>
      <main className="page">
        <Outlet />
      </main>
      <footer className="credit">
        Dữ liệu và đoạn nghe thử từ iTunes Search API
      </footer>
    </>
  );
}
