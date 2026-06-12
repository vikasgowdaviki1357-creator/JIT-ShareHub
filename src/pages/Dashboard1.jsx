import "./../styles/Dashboard.css";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {

  const user =
    JSON.parse(localStorage.getItem("currentUser"));

  const products =
    JSON.parse(localStorage.getItem("products")) || [];

  const resources =
    JSON.parse(localStorage.getItem("resources")) || [];

  const activities =
    JSON.parse(localStorage.getItem("activities")) || [];

  const totalProducts = products.length;
  const totalResources = resources.length;
  const chartData = {

  labels: [
    "Resources",
    "Marketplace"
  ],

  datasets: [

    {

      label: "Total Items",

      data: [
        totalResources,
        totalProducts
      ],

      backgroundColor: [
        "#2563eb",
        "#7c3aed"
      ],

      borderRadius: 12
    }

  ]
};

  const handleLogout = () => {

    localStorage.removeItem("currentUser");

    window.location.href = "/login";
  };

  return (

    <div className="dashboard">

      {/* Sidebar */}

      <aside className="sidebar">

        <div className="sidebar-logo">

  🎓 JIT ShareHub

</div>

        <ul>

          <li>
            <Link to="/dashboard">
              🏠 Dashboard
            </Link>
          </li>

          <li>
            <Link to="/resources">
              📚 Resources
            </Link>
          </li>

          <li>
            <Link to="/marketplace">
              🛒 Marketplace
            </Link>
          </li>

          <li>
            <Link to="/my-products">
              📦 My Products
            </Link>
          </li>

          <li>
            <Link to="/placements">
              🎯 Placements
            </Link>
          </li>

          <li>
            <Link to="/resume-builder">
              📄 Resume Builder
            </Link>
          </li>

          <li>
            <Link to="/events">
              🎉 Events
            </Link>
          </li>

          <li>
            <Link to="/ai-assistant">
              🤖 AI Assistant
            </Link>
          </li>

          <li>
            <Link to="/profile">
              👤 Profile
            </Link>
          </li>

          <li>
            <Link to="/leaderboard">
              🏆 Leaderboard
            </Link>
          </li>

          <li>
            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>
          </li>

        </ul>

      </aside>

      {/* Main Content */}

      <main className="main-content">

        {/* Welcome Banner */}

        <div className="welcome-card">

  <div className="welcome-content">

    <span className="welcome-badge">
      🚀 Student Dashboard
    </span>

    <h1>
      Welcome Back,
      <br />
      {user?.name || "Student"}
    </h1>

    <p>
      Manage resources, marketplace items,
      placements and academic activities
      from one place.
    </p>

  </div>

</div>
<div className="analytics-row">

  <div className="analytics-card">

    <h3>📚 Resources</h3>

    <div className="analytics-number">
      {totalResources}
    </div>

    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{
          width: `${Math.min(totalResources * 10, 100)}%`
        }}
      ></div>
    </div>

  </div>

  <div className="analytics-card">

    <h3>🛒 Products</h3>

    <div className="analytics-number">
      {totalProducts}
    </div>

    <div className="progress-bar">
      <div
        className="progress-fill purple"
        style={{
          width: `${Math.min(totalProducts * 10, 100)}%`
        }}
      ></div>
    </div>

  </div>

</div>
<div className="chart-card">

  <h2>
    📊 Platform Analytics
  </h2>

  <Bar
    data={chartData}
  />

</div>

        {/* Profile Summary */}

        <div className="profile-summary">

          <div className="profile-avatar">
            👨‍🎓
          </div>

          <div>

            <h3>
              {user?.name || "Student"}
            </h3>

            <p>
              {user?.email || "No Email"}
            </p>

          </div>

        </div>

        {/* Stats */}

        <div className="cards">

          <div className="card">
            <h2>
              📚 {totalResources}
            </h2>
            <p>Resources</p>
          </div>

          <div className="card">
            <h2>
              👨‍🎓 1
            </h2>
            <p>Current User</p>
          </div>

          <div className="card">
            <h2>
              🛒 {totalProducts}
            </h2>
            <p>Marketplace Items</p>
          </div>

          <div className="card">
            <h2>
              🎯 50+
            </h2>
            <p>Subjects</p>
          </div>

        </div>

        {/* Quick Actions */}

        <div className="quick-actions">

          <Link to="/sell">
            <button>
              📦 Sell Item
            </button>
          </Link>

          <Link to="/upload-resource">
            <button>
              📚 Upload Resource
            </button>
          </Link>

          <Link to="/resume-builder">
            <button>
              📄 Build Resume
            </button>
          </Link>

        </div>

        {/* Latest Resources */}

        <div className="recent-widget">

          <h2>
            📚 Latest Resources
          </h2>

          {resources.length === 0 ? (

            <p>
              No Resources Uploaded Yet
            </p>

          ) : (

            resources
              .slice(0, 5)
              .map((resource, index) => (

                <div
                  key={index}
                  className="widget-item"
                >

                  📄 {resource.title}

                </div>

              ))

          )}

        </div>

        {/* Activity Feed */}

        <div className="activity-section">

          <h2>
            🔔 Recent Activity
          </h2>

          {activities.length === 0 ? (

            <p>
              No Activity Yet
            </p>

          ) : (

            activities
              .slice(0, 5)
              .map((activity, index) => (

                <div
                  key={index}
                  className="activity-card"
                >

                  <p>
                    {activity.text}
                  </p>

                  <small>
                    {activity.time}
                  </small>

                </div>

              ))

          )}

        </div>

      </main>

    </div>

  );
}

export default Dashboard;