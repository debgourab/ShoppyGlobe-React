import { Link } from "react-router-dom";

const heroProducts = [
  {
    src: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    alt: "Brown backpack"
  },
  {
    src: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    alt: "Men's cotton jacket"
  },
  {
    src: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
    alt: "Women's casual top"
  }
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Welcome to ShoppyGlobe</p>
            <h1>Global picks for everyday shopping.</h1>
            <p className="hero-text">
              Discover thoughtfully selected products, review details quickly, and build a cart that feels simple from first click to checkout.
            </p>
            <div className="hero-actions">
              <Link className="primary-btn hero-btn" to="/products">
                Browse Products <span aria-hidden="true">-&gt;</span>
              </Link>
              <Link className="secondary-btn" to="/cart">View Cart</Link>
            </div>
          </div>
          <div className="hero-showcase" aria-label="Featured products">
            {heroProducts.map((product) => (
              <figure className="hero-product" key={product.src}>
                <img src={product.src} alt={product.alt} loading="eager" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="home-highlights">
        <div className="container highlight-grid">
          <article className="highlight-card">
            <span>01</span>
            <h2>Curated Catalogue</h2>
            <p>Browse a focused collection across fashion, jewellery, and everyday essentials.</p>
          </article>
          <article className="highlight-card">
            <span>02</span>
            <h2>Product Details</h2>
            <p>Compare ratings, categories, pricing, and descriptions before adding items to cart.</p>
          </article>
          <article className="highlight-card">
            <span>03</span>
            <h2>Smooth Checkout</h2>
            <p>Review cart totals, shipping, and order information in one streamlined flow.</p>
          </article>
        </div>
      </section>
    </>
  );
}
