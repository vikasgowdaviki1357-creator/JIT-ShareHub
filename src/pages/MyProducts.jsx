import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./../styles/MyProducts.css";

function MyProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const myProducts = storedProducts.filter(p => p.owner === user?.email);
    setProducts(myProducts);
  }, []);

  const deleteProduct = (index) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updated = allProducts.filter(
      p => !(p.owner === user?.email && p.itemName === products[index].itemName)
    );
    localStorage.setItem("products", JSON.stringify(updated));
    setProducts(prev => prev.filter((_, i) => i !== index));
  };

  const totalValue = products.reduce((sum, p) => sum + (Number(p.price) || 0), 0);

  return (
    <div className="my-products-page">
      <div className="my-products-container">

        {/* ── Hero ── */}
        <div className="myproducts-hero">
          <div className="hero-inner">
            <div className="hero-left">
              <div className="hero-badge">📦 My Listings</div>
              <h1 className="hero-title">
                My Products
                <span>Everything you're selling.</span>
              </h1>
              <p className="hero-sub">
                Manage your active listings, track prices, and connect with buyers.
              </p>
              {products.length > 0 && (
                <div className="hero-stats">
                  <div className="hero-stat">
                    <span className="hero-stat-num">{products.length}</span>
                    <span className="hero-stat-label">Listings</span>
                  </div>
                  <div className="hero-divider" />
                  <div className="hero-stat">
                    <span className="hero-stat-num">₹{totalValue.toLocaleString()}</span>
                    <span className="hero-stat-label">Total Value</span>
                  </div>
                </div>
              )}
            </div>
            <div className="hero-icon">📦</div>
          </div>
        </div>

        {/* ── Grid ── */}
        <div className="products-grid">
          {products.length === 0 ? (
            <div className="empty-card">
              <span className="empty-icon">📭</span>
              <h2>No products listed yet</h2>
              <p>Post your first item and start selling to your batch!</p>
              <Link to="/sell" className="empty-cta">+ List an Item</Link>
            </div>
          ) : (
            products.map((product, index) => (
              <div
                className="product-card"
                key={index}
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <div className="card-image-wrap">
                  <img
                    src={product.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500"}
                    alt={product.itemName}
                  />
                  <span className="branch-tag">{product.branch}</span>
                  <span className="owner-badge">Mine</span>
                </div>

                <div className="product-info">
                  <h3>{product.itemName}</h3>
                  <div className="product-price">₹{Number(product.price).toLocaleString()}</div>

                  <div className="product-phone">
                    📞 {product.phone}
                  </div>

                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(index)}
                  >
                    <span className="delete-icon">🗑</span>
                    Delete Listing
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default MyProducts;
