import "./../styles/Profile.css";

function Profile() {

  const user =
    JSON.parse(
      localStorage.getItem("currentUser")
    ) || {};

  const resources =
    JSON.parse(
      localStorage.getItem("resources")
    ) || [];
    const myResources =
  resources.filter(
    resource =>
      resource.owner === user?.email
  );

  const products =
    JSON.parse(
      localStorage.getItem("products")
    ) || [];

  const myProducts =
    products.filter(
      product =>
        product.owner === user?.email
    );

  return (

    <div className="profile-page">

      <div className="profile-card">

        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="profile"
          className="profile-img"
        />

        <h1>
          {user?.name || "Student"}
        </h1>

        <p>
          {user?.email || "No Email"}
        </p>

        <p>
          🎓 {user?.branch || "Branch Not Added"}
        </p>

        <div className="profile-info">

          <h3>📚 Resources Uploaded</h3>

          <p>
          {myResources.length}
          </p>

          <h3>🛒 Products Posted</h3>

          <p>
            {myProducts.length}
          </p>

          <h3>💻 Skills</h3>

          <p>
            React, Python, AI,
            Web Development
          </p>

          <h3>🚀 Projects</h3>

          <p>
            JIT ShareHub,
            Resume Builder,
            AI Assistant
          </p>

          <h3>🏆 Achievements</h3>

          <p>
            Active JIT ShareHub Member
          </p>

        </div>

      </div>

    </div>

  );
}

export default Profile;