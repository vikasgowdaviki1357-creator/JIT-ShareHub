import { useState } from "react";
import "./../styles/SellItem.css";

function SellItem() {

  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [branch, setBranch] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {

  e.preventDefault();

  const user =
    JSON.parse(localStorage.getItem("currentUser"));

  const product = {
    itemName,
    price,
    branch,
    phone,
    image,
    owner: user?.email
  };

  const oldProducts =
    JSON.parse(localStorage.getItem("products")) || [];

  oldProducts.push(product);

  localStorage.setItem(
    "products",
    JSON.stringify(oldProducts)
  );

  // ===== Activity Feed =====

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

  // =========================

  alert("Item Posted Successfully 🚀");

  setItemName("");
  setPrice("");
  setBranch("");
  setPhone("");
  setImage("");
};

  return (
    <div className="sell-page">

      <div className="sell-card">

        <h1>📦 Sell Your Item</h1>

        <p>
          Post old electronics, books,
          lab kits and other student items.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) =>
              setItemName(e.target.value)
            }
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) =>
              setImage(e.target.value)
            }
          />

          <select
            value={branch}
            onChange={(e) =>
              setBranch(e.target.value)
            }
            required
          >
            <option value="">
              Select Branch
            </option>

            <option>CSE</option>
            <option>ISE</option>
            <option>ECE</option>
            <option>EEE</option>
            <option>MECH</option>
            <option>CIVIL</option>
          </select>

          <button type="submit">
            🚀 Post Item
          </button>

        </form>

      </div>

    </div>
  );
}

export default SellItem;