import "./../styles/Marketplace.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Marketplace() {

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("All");

  useEffect(() => {

    const storedProducts =
      JSON.parse(localStorage.getItem("products")) || [];

    setProducts(storedProducts);

  }, []);

  const filteredProducts = products.filter((product) => {

    const matchesBranch =
      selectedBranch === "All" ||
      product.branch === selectedBranch;

    const matchesSearch =
      product.itemName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesBranch && matchesSearch;

  });

  const deleteProduct = (index) => {

    const updatedProducts =
      products.filter((_, i) => i !== index);

    localStorage.setItem(
      "products",
      JSON.stringify(updatedProducts)
    );

    setProducts(updatedProducts);
  };

  return (
    <div className="marketplace">

      <div className="market-header">

        <h1>🛒 Student Marketplace</h1>

        <Link
          to="/sell"
          className="sell-btn"
        >
          + Sell Item
        </Link>

      </div>

      <div className="branch-filters">

        <button onClick={() => setSelectedBranch("All")}>
          All
        </button>

        <button onClick={() => setSelectedBranch("CSE")}>
          CSE
        </button>

        <button onClick={() => setSelectedBranch("ISE")}>
          ISE
        </button>

        <button onClick={() => setSelectedBranch("ECE")}>
          ECE
        </button>

        <button onClick={() => setSelectedBranch("EEE")}>
          EEE
        </button>

        <button onClick={() => setSelectedBranch("MECH")}>
          MECH
        </button>

        <button onClick={() => setSelectedBranch("CIVIL")}>
          CIVIL
        </button>

      </div>

      <div className="search-box">

        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

      </div>

      <div className="products-grid">

        {filteredProducts.length === 0 ? (

          <div className="empty-products">

            <h2>No Products Found 🚀</h2>

            <p>
              Try another branch or post a new item.
            </p>

          </div>

        ) : (

          filteredProducts.map((product, index) => (

            <div
              className="product-card"
              key={index}
            >

              <img
                src={
                  product.image
                    ? product.image
                    : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500"
                }
                alt={product.itemName}
              />

              <div className="product-details">

                <h3>
                  {product.itemName}
                </h3>

                <p className="product-price">
                  ₹{product.price}
                </p>

                <span className="branch-badge">
                  {product.branch}
                </span>

                <a
                  href={`https://wa.me/91${product.phone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-btn"
                >
                  💬 Chat on WhatsApp
                </a>

                <button
                  className="delete-btn"
                  onClick={() => deleteProduct(index)}
                >
                  🗑 Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Marketplace;