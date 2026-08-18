import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount, selectSearchTerm } from "../store/selectors";
import { setSearchTerm } from "../store/cartSlice";

function SearchBar() {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);

  return (
    <label className="search-box" aria-label="Search products">
      <span className="search-icon" aria-hidden="true">⌕</span>
      <input
        value={searchTerm}
        onChange={(event) => dispatch(setSearchTerm(event.target.value))}
        placeholder="search products..."
        type="search"
      />
    </label>
  );
}

export default function Header() {
  const cartCount = useSelector(selectCartCount);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/" aria-label="ShoppyGlobe home">
          <span className="brand-mark">S</span>
          <span>Shoppy<span>Globe</span></span>
        </Link>

        <SearchBar />

        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Home
          </NavLink>
          <NavLink to="/cart" className="cart-link">
            <span aria-hidden="true">🛒</span>
            <span>Cart</span>
            <span className="cart-badge">{cartCount}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}