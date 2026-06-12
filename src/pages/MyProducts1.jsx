import { useEffect, useState } from "react";
import "./../styles/MyProducts.css";

function MyProducts() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const storedProducts =
      JSON.parse(localStorage.getItem("products")) || [];

    const user =
      JSON.parse(localStorage.getItem("currentUser"));

    const myProducts = storedProducts.filter(
      product => product.owner === user?.email
    );

    setProducts(myProducts);

  }, []);

  const deleteProduct = (index) => {

    const user =
      JSON.parse(localStorage.getItem("currentUser"));

    const allProducts =
      JSON.parse(localStorage.getItem("products")) || [];

    const updatedProducts = allProducts.filter(
      product =>
        !(
          product.owner === user?.email &&
          product.itemName === products[index].itemName
        )
    );

    localStorage.setItem(
      "products",
      JSON.stringify(updatedProducts)
    );

    setProducts(prev =>
      prev.filter((_, i) => i !== index)
    );

    alert("🗑 Product Deleted Successfully");
  };

  return (

    <div className="my-products-page">

      <div className="my-products-container">

        <h1 className="my-products-title">
          📦 My Products
        </h1>

        <div className="products-grid">

          {products.length === 0 ? (

            <div className="empty-card">

              <h2>
                📦 No Products Added Yet
              </h2>

              <p>
                Post your first item from Marketplace 🚀
              </p>

            </div>

          ) : (

            products.map((product, index) => (

              <div
                className="product-card"
                key={index}
              >

                <img
                  src={
                    product.image ||
                    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500"
                  }
                  alt={product.itemName}
                />

                <div className="product-info">

                  <h3>
                    {product.itemName}
                  </h3>

                  <div className="product-price">
                    ₹{product.price}
                  </div>

                  <div className="product-branch">
                    {product.branch}
                  </div>

                  <div className="product-phone">
                    📞 {product.phone}
                  </div>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteProduct(index)
                    }
                  >
                    🗑 Delete Product
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