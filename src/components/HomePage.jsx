import React from 'react';
import './HomePage.css';

function HomePage() {
  return (
    <div>
      {/* Header */}
      <header>
        <div className="logo">HandyHive</div>
        <nav>
          <a href="/">Home</a>
          <a href="/find-workers">Find Workers</a>
          <a href="/post-job">Post a Job</a>
          <a href="/login">Login/Signup</a>
        </nav>
        <input type="text" placeholder="Search for workers..." />
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>Find Trusted Workers for Your Home Needs – Anytime, Anywhere!</h1>
        <button>Find Workers</button>
        <button>Post a Job</button>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Explore Services</h2>
        <div className="category-buttons">
          <button>Maid Services</button>
          <button>Plumbing</button>
          <button>Electricians</button>
          <button>Carpenters</button>
          <button>Painting</button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How HandyHive Works</h2>
        <div className="steps">
          <div>1. Post a Job</div>
          <div>2. Choose a Worker</div>
          <div>3. Get It Done</div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="quick-links">
          <a href="/">Home</a>
          <a href="/find-workers">Find Workers</a>
          <a href="/post-job">Post a Job</a>
          <a href="/about">About Us</a>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
