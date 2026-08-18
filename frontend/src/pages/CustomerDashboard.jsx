import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerDashboard.css";

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [search, setSearch] = useState("");

  const categories = [
    {
      name: "Burgers",
      icon: "🍔",
    },
    {
      name: "Pizza",
      icon: "🍕",
    },
    {
      name: "Chicken",
      icon: "🍗",
    },
    {
      name: "Drinks",
      icon: "🥤",
    },
    {
      name: "Desserts",
      icon: "🍰",
    },
    {
      name: "Healthy",
      icon: "🥗",
    },
  ];

  const popularFood = [
    {
      id: 1,
      name: "Classic Beef Burger",
      description: "Beef patty, lettuce, tomato and special sauce",
      price: "R89.99",
      rating: "4.8",
      image: "🍔",
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      description: "Mozzarella, tomato sauce and pepperoni",
      price: "R129.99",
      rating: "4.7",
      image: "🍕",
    },
    {
      id: 3,
      name: "Crispy Chicken",
      description: "Crispy chicken with fries and our special sauce",
      price: "R109.99",
      rating: "4.9",
      image: "🍗",
    },
    {
      id: 4,
      name: "Loaded Fries",
      description: "Crispy fries loaded with cheese and bacon",
      price: "R69.99",
      rating: "4.6",
      image: "🍟",
    },
  ];

  const restaurants = [
    {
      id: 1,
      name: "Burger House",
      cuisine: "Burgers • Fast Food",
      rating: "4.8",
      delivery: "20-30 min",
      image: "🍔",
    },
    {
      id: 2,
      name: "Pizza Palace",
      cuisine: "Pizza • Italian",
      rating: "4.7",
      delivery: "25-35 min",
      image: "🍕",
    },
    {
      id: 3,
      name: "Chicken Hub",
      cuisine: "Chicken • Fast Food",
      rating: "4.9",
      delivery: "15-25 min",
      image: "🍗",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredFood = popularFood.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="customer-dashboard">
      {/* =========================
          NAVIGATION BAR
      ========================== */}

      <nav className="dashboard-navbar">
        <div className="dashboard-logo">
          <span className="dashboard-logo-icon">🍔</span>

          <span>Local Byte</span>
        </div>

        <div className="dashboard-nav-links">
          <button className="nav-link active">Home</button>

          <button className="nav-link">Restaurants</button>

          <button className="nav-link">Orders</button>
        </div>

        <div className="dashboard-nav-right">
          <button className="cart-button" onClick={() => navigate("/cart")}>
            🛒
            <span>Cart</span>
          </button>

          <div className="user-menu">
            <div className="user-avatar">
              {(user.name || "U").charAt(0).toUpperCase()}
            </div>

            <span className="user-name">{user.name || "User"}</span>
          </div>

          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* =========================
          HERO SECTION
      ========================== */}

      <section className="dashboard-hero">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-small-text">Hungry? We've got you covered! 🍴</p>

            <h1>
              Good food,
              <br />
              <span>good mood.</span>
            </h1>

            <p className="hero-description">
              Discover delicious meals from your favourite local restaurants and
              get them delivered straight to your door.
            </p>

            {/* Search */}
            <div className="food-search">
              <span className="search-icon">🔍</span>

              <input
                type="text"
                placeholder="Search for food..."
                value={search}
                onChange={handleSearch}
              />

              <button>Search</button>
            </div>
          </div>

          <div className="hero-food">
            <div className="hero-circle">🍔</div>
          </div>
        </div>
      </section>

      {/* =========================
          MAIN CONTENT
      ========================== */}

      <main className="dashboard-content">
        {/* Categories */}

        <section className="dashboard-section">
          <div className="section-header">
            <div>
              <p className="section-label">EXPLORE</p>

              <h2>What are you craving?</h2>
            </div>
          </div>

          <div className="categories-grid">
            {categories.map((category) => (
              <button className="category-card" key={category.name}>
                <div className="category-icon">{category.icon}</div>

                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Popular Food */}

        <section className="dashboard-section">
          <div className="section-header">
            <div>
              <p className="section-label">POPULAR</p>

              <h2>Popular near you</h2>
            </div>

            <button className="view-all">View all →</button>
          </div>

          <div className="food-grid">
            {filteredFood.map((food) => (
              <div className="food-card" key={food.id}>
                <div className="food-image">
                  <span>{food.image}</span>

                  <button className="favorite-button">♡</button>
                </div>

                <div className="food-card-content">
                  <div className="food-rating">⭐ {food.rating}</div>

                  <h3>{food.name}</h3>

                  <p>{food.description}</p>

                  <div className="food-card-bottom">
                    <strong>{food.price}</strong>

                    <button className="add-button">+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Restaurants */}

        <section className="dashboard-section">
          <div className="section-header">
            <div>
              <p className="section-label">RESTAURANTS</p>

              <h2>Restaurants you may like</h2>
            </div>

            <button className="view-all">View all →</button>
          </div>

          <div className="restaurant-grid">
            {restaurants.map((restaurant) => (
              <div className="restaurant-card" key={restaurant.id}>
                <div className="restaurant-image">{restaurant.image}</div>

                <div className="restaurant-info">
                  <h3>{restaurant.name}</h3>

                  <p>{restaurant.cuisine}</p>

                  <div className="restaurant-details">
                    <span>⭐ {restaurant.rating}</span>

                    <span>🕐 {restaurant.delivery}</span>
                  </div>

                  <button className="menu-button">View Menu</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Current Order */}

        <section className="current-order">
          <div className="order-icon">🍟</div>

          <div className="order-content">
            <p className="section-label">YOUR ORDER</p>

            <h2>Ready to order?</h2>

            <p>
              Add some delicious food to your cart and place your first order.
            </p>
          </div>

          <button className="start-order-button" onClick={() => navigate("/")}>
            Start Ordering
          </button>
        </section>
      </main>

      {/* =========================
          FOOTER
      ========================== */}

      <footer className="dashboard-footer">
        <div className="footer-brand">
          <span>🍔</span>

          <strong>Local Byte</strong>
        </div>

        <p>Delicious food, delivered to you.</p>

        <p className="footer-copy">© 2026 Local Byte. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CustomerDashboard;
