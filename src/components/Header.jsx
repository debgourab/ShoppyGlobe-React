// Header: provide global branding, navigation, Redux-powered search, and live cart count.
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount, selectSearchTerm } from "../store/selectors";
import { setSearchTerm } from "../store/cartSlice";

// SearchBar synchronizes the visible query with Redux so product filtering works across the catalogue.
function SearchBar() {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);

  // Render an accessible search field whose changes dispatch the global search action.
  return (
    <label className="search-box" aria-label="Search products">
      <span className="search-icon" aria-hidden="true">⌕</span>
      <input
        value={searchTerm}
        onChange={(event) => dispatch(setSearchTerm(event.target.value))}
        placeholder="Search products..."
        type="search"
      />
    </label>
  );
}

// Header combines branding, search, navigation, and the live cart badge.
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