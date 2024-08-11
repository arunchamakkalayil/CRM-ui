import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid w-100">
          <a className="navbar-brand" href="/">
            <i className="bi bi-people"></i> <b>ERM</b>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about-us" className="nav-link">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <header
        className="text-light text-center py-5"
        style={{
          color: 'white',
          width:'100%',
          background: `linear-gradient(
         rgba(0, 0, 0, 0.7), 
      rgba(0, 0, 0, 0.7)
          ), url('https://images.pexels.com/photos/2219035/pexels-photo-2219035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1') no-repeat center center`,
          backgroundSize: 'cover',
        }}
      >
        <div className="container">
          <h1>About Us</h1>
          <p className="lead">
            I created this platform to overcome communication issues in rescue
            camps during disasters. My aim is to help government agencies and
            other related groups manage resources in camps effectively. During
            times of urgent need, such as when food, clothing, or other
            essentials are required, volunteers in the camp can use this
            platform to connect with the public by raising the needs directly.
            This allows the public to offer support by identifying the
            requirements without wasting resources.
          </p>
        </div>
      </header>

      <section className="py-5  text-dark">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="mb-4">Who I Am</h2>
              <p className="lead">
                My journey started with a passion for innovation and excellence.
                I developed this platform to help people by joining hands
                together during times of disaster, ensuring that resources reach
                those in need efficiently.
              </p>
            </div>
            <div className="col-md-6 text-center">
              <img
                src="https://images.pexels.com/photos/16105713/pexels-photo-16105713/free-photo-of-group-of-paramedics-walking-through-a-demolished-city.jpeg"
                alt="Who I Am Illustration"
                className="img-fluid rounded shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center">
              <img
                src="https://images.pexels.com/photos/5909997/pexels-photo-5909997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="My Aim Illustration"
                className="img-fluid rounded shadow-lg"
              />
            </div>
            <div className="col-md-6">
              <h2 className="text-left mb-4">My Aim</h2>
              <p className="lead">
                My aim is to help government agencies and related groups manage
                resources in disaster camps effectively. This platform enables
                volunteers to raise urgent needs directly to the public,
                allowing for targeted and efficient support during critical
                times.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-dark text-white py-3">
        <div className="container text-center">
          &copy; {new Date().getFullYear()} ERM. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
