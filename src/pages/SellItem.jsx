import { useState } from "react";
import "./../styles/SellItem.css";

function SellItem() {

  const [itemName, setItemName] = useState("");
  const [price, setPrice]       = useState("");
  const [branch, setBranch]     = useState("");
  const [phone, setPhone]       = useState("");
  const [image, setImage]       = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    const user =
      JSON.parse(localStorage.getItem("currentUser"));

    const product = {
      itemName, price, branch,
      phone, image, category,
      owner: user?.email
    };

    const oldProducts =
      JSON.parse(localStorage.getItem("products")) || [];

    oldProducts.push(product);

    localStorage.setItem(
      "products",
      JSON.stringify(oldProducts)
    );

    const activities =
      JSON.parse(localStorage.getItem("activities")) || [];

    activities.unshift({
      text: `📦 ${itemName} listed for sale`,
      time: new Date().toLocaleString()
    });

    localStorage.setItem(
      "activities",
      JSON.stringify(activities)
    );

    alert("Item Posted Successfully 🚀");

    setItemName("");
    setPrice("");
    setBranch("");
    setPhone("");
    setImage("");
    setCategory("");
  };

  const tips = [
    { icon: "📸", title: "Add a clear photo", desc: "Items with images sell 3x faster." },
    { icon: "💰", title: "Price it right", desc: "Check market value before listing." },
    { icon: "📞", title: "Be reachable", desc: "Respond quickly to serious buyers." },
    { icon: "📝", title: "Describe well", desc: "Mention condition, age, and defects." },
  ];

  return (
    <div className="sell-page">

      {/* HERO */}
      <div className="sell-hero">
        <div className="sell-hero-orb orb1"></div>
        <div className="sell-hero-orb orb2"></div>
        <div className="sell-hero-orb orb3"></div>

        <div className="hero-badge">🏪 STUDENT MARKETPLACE</div>

        <h1 className="hero-title">Sell Your Item</h1>
        <p className="hero-subtitle">Turn unused stuff into cash</p>

        <p className="hero-desc">
          Post old electronics, books, lab kits and other
          student items. Reach thousands of JIT students instantly.
        </p>

        <div className="hero-stats">
          <div className="h-stat">
            <strong>350+</strong>
            <span>Items Listed</span>
          </div>
          <div className="h-divider"></div>
          <div className="h-stat">
            <strong>1500+</strong>
            <span>Active Buyers</span>
          </div>
          <div className="h-divider"></div>
          <div className="h-stat">
            <strong>Fast</strong>
            <span>Quick Sales</span>
          </div>
        </div>

        <span className="hero-icon">📦</span>
      </div>

      {/* MAIN CONTENT */}
      <div className="sell-main">

        {/* LEFT — TIPS */}
        <div className="sell-tips">

          <h3 className="tips-title">💡 Selling Tips</h3>

          <div className="tips-list">
            {tips.map((t, i) => (
              <div className="tip-card" key={i}>
                <div className="tip-icon">{t.icon}</div>
                <div>
                  <strong>{t.title}</strong>
                  <p>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="sell-note">
            <span>🔒</span>
            <p>Your contact info is only shared with interested buyers after you approve.</p>
          </div>

        </div>

        {/* RIGHT — FORM */}
        <div className="sell-card">

          <div className="sell-card-header">
            <div className="sell-card-icon">📦</div>
            <div>
              <h2>List Your Item</h2>
              <p>Fill in the details below to post your item</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="sell-form">

            <div className="form-group">
              <label>Item Name *</label>
              <input
                type="text"
                placeholder="e.g. Engineering Drawing Kit"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Price (₹) *</label>
                <input
                  type="number"
                  placeholder="e.g. 299"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option>📚 Books</option>
                  <option>💻 Electronics</option>
                  <option>🔬 Lab Equipment</option>
                  <option>🎒 Stationery</option>
                  <option>👕 Clothing</option>
                  <option>🛠️ Tools</option>
                  <option>📦 Other</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="text"
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Branch *</label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  required
                >
                  <option value="">Select Branch</option>
                  <option>CSE</option>
                  <option>ISE</option>
                  <option>AIML</option>
                  <option>AIDS</option>
                  <option>ECE</option>
                  <option>EEE</option>
                  <option>MECH</option>
                  <option>CIVIL</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Image URL <span className="optional">(optional)</span></label>
              <input
                type="text"
                placeholder="Paste an image link for your item"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            {image && (
              <div className="image-preview">
                <img src={image} alt="Preview" onError={(e) => e.target.style.display = "none"} />
                <span>Preview</span>
              </div>
            )}

            <button type="submit" className="sell-submit-btn">
              🚀 Post Item Now
            </button>

            <p className="form-footer">
              By posting, you agree to JIT ShareHub's community guidelines.
            </p>

          </form>

        </div>

      </div>

    </div>
  );
}

export default SellItem;
