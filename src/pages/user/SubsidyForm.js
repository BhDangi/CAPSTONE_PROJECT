import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Alert,
  Card,
  Spinner,
} from "react-bootstrap";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaRegFileAlt,
  FaMoneyCheckAlt,
  FaGraduationCap,
  FaTractor,
  FaHeartbeat,
  FaGlobe,
} from "react-icons/fa";
import "animate.css"; // For animation effects
import Header from "../Header";
import Footer from "../Footer";

const SubsidyForm = () => {
  const { type } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
    income: "",
    educationLevel: "",
    landSize: "",
    healthCondition: "",
    region: "",
  });
  const [applicationNumber, setApplicationNumber] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Mapping form types to background images
  const bgImages = {
    education: "/images/education-bg.jpg",
    agriculture: "/images/agriculture-bg.jpg",
    health: "/images/health-bg.jpg",
    default: "/images/default-bg.jpg",
  };

  // Get the background image based on the form type
  const bgImage = bgImages[type] || bgImages.default;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setApplicationNumber(null);
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/subsidy", {
        type,
        ...formData,
      });
      setApplicationNumber(response.data.applicationNumber);
      setFormData({
        name: "",
        email: "",
        phone: "",
        details: "",
        income: "",
        educationLevel: "",
        landSize: "",
        healthCondition: "",
        region: "",
      });
    } catch (error) {
      setError("Failed to submit the subsidy form. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderDynamicFields = () => {
    switch (type) {
      case "education":
        return (
          
          <Row>
            <Col md={6}>
              <Form.Group controlId="formEducationLevel" className="mb-4">
                <Form.Label>
                  <FaGraduationCap /> Highest Level of Education
                </Form.Label>
                <Form.Control
                  type="text"
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleChange}
                  required
                  placeholder="E.g., Undergraduate, Postgraduate"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formIncome" className="mb-4">
                <Form.Label>
                  <FaMoneyCheckAlt /> Parent's Annual Income (USD)
                </Form.Label>
                <Form.Control
                  type="number"
                  name="income"
                  value={formData.income}
                  onChange={handleChange}
                  required
                  placeholder="Enter annual income"
                />
              </Form.Group>
            </Col>
          </Row>
        );

      case "agriculture":
        return (
          <Row>
            <Col md={6}>
              <Form.Group controlId="formLandSize" className="mb-4">
                <Form.Label>
                  <FaTractor /> Land Size (in acres)
                </Form.Label>
                <Form.Control
                  type="number"
                  name="landSize"
                  value={formData.landSize}
                  onChange={handleChange}
                  required
                  placeholder="Enter land size"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formRegion" className="mb-4">
                <Form.Label>
                  <FaGlobe /> Region/Location
                </Form.Label>
                <Form.Control
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  required
                  placeholder="Enter your region"
                />
              </Form.Group>
            </Col>
          </Row>
        );

      case "health":
        return (
          <Row>
            <Col md={12}>
              <Form.Group controlId="formHealthCondition" className="mb-4">
                <Form.Label>
                  <FaHeartbeat /> Health Condition
                </Form.Label>
                <Form.Control
                  type="text"
                  name="healthCondition"
                  value={formData.healthCondition}
                  onChange={handleChange}
                  required
                  placeholder="Describe your health condition"
                />
              </Form.Group>
            </Col>
          </Row>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      {/* Background Section */}
      <div
        className="subsidy-bg"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <Container className="my-5 animate__animated animate__fadeIn ">
          <div class="align-self-center">
          <Row className="justify-content-center  ">
            <Col md={8} lg={6}>
              <Card className="shadow-lg rounded-4 subsidy-card">
                <Card.Body>
                  <h1 className="text-center text-gradient mb-4">
                    Apply for {type.charAt(0).toUpperCase() + type.slice(1)} Subsidy
                  </h1>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="formName" className="mb-4">
                          <Form.Label>
                            <FaUser /> Full Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formEmail" className="mb-4">
                          <Form.Label>
                            <FaEnvelope /> Email
                          </Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="formPhone" className="mb-4">
                          <Form.Label>
                            <FaPhoneAlt /> Phone Number
                          </Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="Enter your phone"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formDetails" className="mb-4">
                          <Form.Label>
                            <FaRegFileAlt /> Additional Details
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            name="details"
                            value={formData.details}
                            onChange={handleChange}
                            placeholder="Provide additional info"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    {renderDynamicFields()}
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 py-2 mt-3"
                      disabled={loading}
                    >
                      {loading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        "Submit Application"
                      )}
                    </Button>
                  </Form>
                  {applicationNumber && (
                    <Alert variant="success" className="mt-4">
                      Application submitted successfully! Application Number:{" "}
                      <strong>{applicationNumber}</strong>
                    </Alert>
                  )}
                  {error && (
                    <Alert variant="danger" className="mt-4">
                      {error}
                    </Alert>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default SubsidyForm;
