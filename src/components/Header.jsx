import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartCount } from "../store/selectors";

export default function Header() {
  const cartCount = useSelector(selectCartCount);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/" aria-label="ShoppyGlobe home">
          <span className="brand-mark">S</span>
          <span>Shoppy<span>Globe</span></span>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Browse Products
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => isActive ? "cart-link active" : "cart-link"}>
            <span>Cart</span>
            <span className="cart-badge">{cartCount}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
