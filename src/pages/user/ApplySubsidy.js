import React from "react";
import { useNavigate } from "react-router-dom";
import "animate.css"; // For animation effects
import { FaGraduationCap, FaHeartbeat, FaSeedling } from "react-icons/fa"; // Icons
import { Tooltip, OverlayTrigger } from "react-bootstrap"; // For tooltips
import Header from "../Header";
import Footer from "../Footer";

const ApplySubsidy = () => {
  const navigate = useNavigate();

  const handleSelectSubsidy = (type) => {
    navigate(`/apply-subsidy/form/${type}`);
  };

  const renderTooltip = (text) => (
    <Tooltip id="tooltip">{text}</Tooltip>
  );

  return (
    <>
    <Header />    
    <div
      className="container-fluid mt-5 animate__animated animate__fadeIn"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", paddingBottom: "50px" }}
    >
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-3" style={{ fontSize: "2.5rem" }}>
          Apply for a Subsidy
        </h1>
        <p className="fs-5 text-muted mb-4">
          Select a subsidy type to proceed with your application.
        </p>
      </div>

      {/* Subsidy Option Cards */}
      <div className="row justify-content-center">
        {/* Education Subsidy Card */}
        <div className="col-md-4 mb-4">
          <OverlayTrigger
            placement="top"
            overlay={renderTooltip("Financial aid for education purposes")}
          >
            <div
              className="card shadow-lg border-0 rounded-4 hover-shadow animate__animated animate__fadeInUp"
              style={{
                backgroundColor: "#ffffff",
                transition: "transform 0.3s ease-in-out",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                cursor: "pointer",
              }}
            >
              <div className="card-body text-center py-5">
                <FaGraduationCap size={50} className="mb-3 text-primary" />
                <h5 className="card-title text-primary fw-bold" style={{ fontSize: "1.75rem" }}>
                  Education Subsidy
                </h5>
                <p className="card-text text-muted" style={{ fontSize: "1.1rem" }}>
                  Apply for financial assistance to support your education.
                </p>
                <button
                  onClick={() => handleSelectSubsidy("education")}
                  className="btn btn-primary fw-bold w-100"
                  style={{
                    transition: "background-color 0.3s ease-in-out",
                    borderRadius: "25px",
                    fontSize: "1.2rem",
                    padding: "12px",
                  }}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </OverlayTrigger>
        </div>

        {/* Health Subsidy Card */}
        <div className="col-md-4 mb-4">
          <OverlayTrigger
            placement="top"
            overlay={renderTooltip("Assistance for medical and healthcare expenses")}
          >
            <div
              className="card shadow-lg border-0 rounded-4 hover-shadow animate__animated animate__fadeInUp"
              style={{
                backgroundColor: "#ffffff",
                transition: "transform 0.3s ease-in-out",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                cursor: "pointer",
              }}
            >
              <div className="card-body text-center py-5">
                <FaHeartbeat size={50} className="mb-3 text-danger" />
                <h5 className="card-title text-danger fw-bold" style={{ fontSize: "1.75rem" }}>
                  Health Subsidy
                </h5>
                <p className="card-text text-muted" style={{ fontSize: "1.1rem" }}>
                  Apply for health assistance to cover medical expenses.
                </p>
                <button
                  onClick={() => handleSelectSubsidy("health")}
                  className="btn btn-danger fw-bold w-100"
                  style={{
                    transition: "background-color 0.3s ease-in-out",
                    borderRadius: "25px",
                    fontSize: "1.2rem",
                    padding: "12px",
                  }}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </OverlayTrigger>
        </div>

        {/* Agriculture Subsidy Card */}
        <div className="col-md-4 mb-4">
          <OverlayTrigger
            placement="top"
            overlay={renderTooltip("Support for agricultural activities and farming")}
          >
            <div
              className="card shadow-lg border-0 rounded-4 hover-shadow animate__animated animate__fadeInUp"
              style={{
                backgroundColor: "#ffffff",
                transition: "transform 0.3s ease-in-out",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                cursor: "pointer",
              }}
            >
              <div className="card-body text-center py-5">
                <FaSeedling size={50} className="mb-3 text-success" />
                <h5 className="card-title text-success fw-bold" style={{ fontSize: "1.75rem" }}>
                  Agriculture Subsidy
                </h5>
                <p className="card-text text-muted" style={{ fontSize: "1.1rem" }}>
                  Apply for financial aid to support agricultural activities.
                </p>
                <button
                  onClick={() => handleSelectSubsidy("agriculture")}
                  className="btn btn-success fw-bold w-100"
                  style={{
                    transition: "background-color 0.3s ease-in-out",
                    borderRadius: "25px",
                    fontSize: "1.2rem",
                    padding: "12px",
                  }}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </OverlayTrigger>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ApplySubsidy;
