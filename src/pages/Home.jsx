// Home page: combine the promotional hero with the reusable product catalogue.
import ProductList from "../components/ProductList";

export default function Home() {
  // Compose the marketing hero with the product catalogue to form the store landing page.
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Welcome to ShoppyGlobe</p>
            <h1>Everything you need.<br /><span>All in one place.</span></h1>
            <p className="hero-text">
              Discover quality products across electronics, fashion, beauty,
              groceries and more — with a simple shopping experience.
            </p>
            <a className="primary-btn hero-btn" href="#products-heading">Shop now <span>→</span></a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="orb orb-one" />
            <div className="orb orb-two" />
            <div className="floating-card card-one">⚡<b>Fast</b><small>Shopping</small></div>
            <div className="floating-card card-two">★<b>Top rated</b><small>Products</small></div>
            <div className="hero-bag">🛍️</div>
          </div>
        </div>
      </section>

      <div className="container">
        <ProductList />
      </div>
    </>
  );
}