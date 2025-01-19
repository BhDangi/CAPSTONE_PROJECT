import React, { useState } from "react";
import "animate.css"; // For animation effects
import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { FaCheckCircle, FaRegEdit, FaMoon, FaSun } from "react-icons/fa"; // Icons

const UserPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  // Toggle Dark Mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Show confirmation modal
  const handleButtonClick = (action) => {
    setModalContent(action);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => setShowModal(false);

  return (
    <>
      <Header />

      <div
        className={`container-fluid mt-5 animate__animated animate__fadeIn ${
          darkMode ? "bg-dark text-white" : "bg-light"
        }`}
        style={{
          minHeight: "100vh",
          paddingBottom: "50px", // To avoid footer overlap
          paddingTop: "40px",
          transition: "background-color 0.3s ease-in-out",
        }}
      >
        {/* Dark Mode Toggle */}
        <div className="text-end mb-3">
          <button
            onClick={toggleDarkMode}
            className="btn btn-secondary"
            style={{
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              backgroundColor: darkMode ? "#f39c12" : "#2c3e50",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              transition: "background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            }}
          >
            {darkMode ? <FaSun size={25} color="white" /> : <FaMoon size={25} color="yellow" />}
          </button>
        </div>

        {/* Header Section */}
        <div className="text-center mb-5">
          <h1 className="fw-bold mb-3" style={{ fontSize: "3.5rem", letterSpacing: "1px" }}>
            Welcome to the User Dashboard
          </h1>
          <p className="fs-5 mb-4">
            Explore, apply, and track your subsidies in a seamless and intuitive interface.
          </p>
        </div>

        {/* Action Cards Section */}
        <div className="row justify-content-center">
          {/* Apply for Subsidy Card */}
          <div className="col-md-5 mb-4">
            <div
              className="card shadow-lg border-0 rounded-5 hover-shadow animate__animated animate__fadeInUp"
              style={{
                background: "linear-gradient(135deg, #00c6ff, #0072ff)", // Gradient background
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                overflow: "hidden", // To prevent content overflow on hover
              }}
            >
              <div className="card-body text-center py-5">
                <h5 className="card-title text-white fw-bold" style={{ fontSize: "1.8rem" }}>
                  Apply for Subsidy
                </h5>
                <p className="card-text text-white-50 mb-4" style={{ fontSize: "1rem" }}>
                  Explore available subsidies and apply online easily.
                </p>
                <Link to="/apply-subsidy" style={{ textDecoration: "none" }}>
                  <button
                    onClick={() => handleButtonClick("Apply Now")}
                    className="btn btn-light fw-bold w-100"
                    style={{
                      transition: "background-color 0.3s ease-in-out",
                      borderRadius: "30px",
                      fontSize: "1.3rem",
                      padding: "14px",
                    }}
                  >
                    <FaRegEdit size={22} className="me-2" />
                    Apply Now
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Track Subsidy Card */}
          <div className="col-md-5 mb-4">
            <div
              className="card shadow-lg border-0 rounded-5 hover-shadow animate__animated animate__fadeInUp"
              style={{
                background: "linear-gradient(135deg, #ff7e5f, #feb47b)", // Gradient background
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                overflow: "hidden",
              }}
            >
              <div className="card-body text-center py-5">
                <h5 className="card-title text-white fw-bold" style={{ fontSize: "1.8rem" }}>
                  Track Subsidy
                </h5>
                <p className="card-text text-white-50 mb-4" style={{ fontSize: "1rem" }}>
                  Monitor the status of your subsidy applications in real-time.
                </p>
                <Link to="/track-subsidy" style={{ textDecoration: "none" }}>
                  <button
                    onClick={() => handleButtonClick("Track Now")}
                    className="btn btn-light fw-bold w-100"
                    style={{
                      transition: "background-color 0.3s ease-in-out",
                      borderRadius: "30px",
                      fontSize: "1.3rem",
                      padding: "14px",
                    }}
                  >
                    <FaCheckCircle size={22} className="me-2" />
                    Track Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Modal for Confirmation */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{
            display: "block",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Action</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to {modalContent}?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={closeModal} // You can add logic here to perform the action
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserPage;
