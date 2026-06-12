import "./../styles/Marketplace.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const BRANCHES = ["All", "CSE", "ISE", "ECE", "EEE", "MECH", "CIVIL"];

function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("All");

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesBranch = selectedBranch === "All" || product.branch === selectedBranch;
    const matchesSearch = product.itemName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBranch && matchesSearch;
  });

  const deleteProduct = (index) => {
    const updated = products.filter((_, i) => i !== index);
    localStorage.setItem("products", JSON.stringify(updated));
    setProducts(updated);
  };

  return (
    <div className="marketplace">

      {/* ── Hero ── */}
      <div className="market-hero">
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-badge">🛒 JIT ShareHub</div>
            <h1 className="hero-title">
              Student Marketplace
              <span>Buy, sell &amp; trade on campus.</span>
            </h1>
            <p className="hero-sub">
              Find second-hand textbooks, gadgets, lab equipment and more — from fellow students.
            </p>
            <Link to="/sell" className="sell-btn">
              + List an Item
            </Link>
          </div>
          <div className="hero-icon">🛍️</div>
        </div>
      </div>

      {/* ── Controls ── */}
      <div className="market-controls">
        <div className="search-row">
          <span className="search-icon-inner">🔍</span>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="branch-filters">
          {BRANCHES.map((branch) => (
            <button
              key={branch}
              className={selectedBranch === branch ? "active" : ""}
              onClick={() => setSelectedBranch(branch)}
            >
              {branch}
            </button>
          ))}
        </div>
      </div>

      {/* ── Results meta ── */}
      {products.length > 0 && (
        <div className="results-meta">
          <span className="results-count">
            Showing <strong>{filteredProducts.length}</strong> of {products.length} items
            {selectedBranch !== "All" && ` · ${selectedBranch}`}
          </span>
        </div>
      )}

      {/* ── Grid ── */}
      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <div className="empty-products">
            <span className="empty-icon">🚀</span>
            <h2>No products found</h2>
            <p>
              {searchTerm || selectedBranch !== "All"
                ? "Try a different search or branch filter."
                : "Be the first to list something for sale!"}
            </p>
            <Link to="/sell" className="sell-btn" style={{ display: "inline-flex" }}>
              + List an Item
            </Link>
          </div>
        ) : (
          filteredProducts.map((product, index) => (
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
                <span className="branch-badge">{product.branch}</span>
              </div>

              <div className="product-details">
                <h3>{product.itemName}</h3>
                <p className="product-price">₹{product.price}</p>

                <div className="card-actions">
                  <a
                    href={`https://wa.me/91${product.phone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-btn"
                  >
                    💬 WhatsApp
                  </a>
                  <button
                    className="delete-btn"
                    title="Delete listing"
                    onClick={() => deleteProduct(index)}
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default Marketplace;
