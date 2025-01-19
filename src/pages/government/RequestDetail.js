import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Alert, Spinner, Modal, Card, Toast } from 'react-bootstrap'; // Bootstrap components
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Icons for Accept/Reject
import Header from '../Header';
import Footer from '../Footer';

const RequestDetail = () => {
  const { id } = useParams();
  const [requestDetails, setRequestDetails] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Modal visibility control
  const [actionType, setActionType] = useState(''); // Accept or Reject action
  const [showToast, setShowToast] = useState(false); // Toast visibility control
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState(''); // success or error type for toast
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/subsidy/requests/${id}`);
        setRequestDetails(response.data);
      } catch (err) {
        console.error('Error fetching request details:', err);
        setError('Failed to fetch request details.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  // Handle Accept button click
  const handleAccept = async () => {
    const updatedRequest = { status: "Subsidy is approved and go to next step on bank" };
    setLoading(true); // Show loading spinner
    try {
      const response = await axios.put(`http://localhost:5000/subsidy/requests/${id}`, updatedRequest);
      setRequestDetails(response.data);
      setToastMessage('Subsidy request accepted successfully!');
      setToastType('success');
      setShowToast(true);
      navigate('/government');
    } catch (err) {
      console.error('Error updating request status to accepted:', err);
      setError('Failed to update request status.');
      setToastMessage('Failed to accept subsidy request.');
      setToastType('error');
      setShowToast(true);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  // Handle Reject button click
  const handleReject = async () => {
    const updatedRequest = { status: "Subsidy is rejected, try next time" };
    setLoading(true); // Show loading spinner
    try {
      const response = await axios.put(`http://localhost:5000/subsidy/requests/${id}`, updatedRequest);
      setRequestDetails(response.data);
      setToastMessage('Subsidy request rejected successfully!');
      setToastType('success');
      setShowToast(true);
      navigate('/government');
    } catch (err) {
      console.error('Error updating request status to rejected:', err);
      setError('Failed to update request status.');
      setToastMessage('Failed to reject subsidy request.');
      setToastType('error');
      setShowToast(true);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  // Handle modal show/hide
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = (action) => {
    setActionType(action); // Set action type (Accept/Reject)
    setShowModal(true);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading request details...</p>
      </Container>
    );
  }

  if (error) {
    return <Alert variant="danger" className="text-center">{error}</Alert>;
  }

  if (!requestDetails) {
    return <p className="text-center">Request details not found.</p>;
  }

  return (
    <>
    <Header />
    <Container className="my-4">
      <h1 className="text-center text-primary mb-4">Request Details</h1>

      <Card className="shadow-sm p-4 mb-4">
        <Card.Body>
          <Card.Title className="text-primary">Application Number: {requestDetails.applicationNumber}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Submitted On: {new Date(requestDetails.createdAt).toLocaleString()}</Card.Subtitle>

          <p><strong>Name:</strong> {requestDetails.name}</p>
          <p><strong>Email:</strong> {requestDetails.email}</p>
          <p><strong>Phone:</strong> {requestDetails.phone}</p>
          <p><strong>Details:</strong> {requestDetails.details}</p>
          <p><strong>Status:</strong> <span className={`text-${requestDetails.status === 'Subsidy is approved and go to next step on bank' ? 'success' : 'danger'}`}>
            {requestDetails.status}
          </span></p>
          <p><strong>Type:</strong> {requestDetails.type}</p>
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-center gap-3">
        <Button 
          variant="success" 
          onClick={() => handleModalShow('accept')} 
          className="w-25 shadow-sm"
          style={{ transition: '0.3s', borderRadius: '8px' }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#28a745'}
          onMouseLeave={(e) => e.target.style.backgroundColor = ''}
        >
          <FaCheckCircle /> Accept Subsidy
        </Button>
        <Button 
          variant="danger" 
          onClick={() => handleModalShow('reject')} 
          className="w-25 shadow-sm"
          style={{ transition: '0.3s', borderRadius: '8px' }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#dc3545'}
          onMouseLeave={(e) => e.target.style.backgroundColor = ''}
        >
          <FaTimesCircle /> Reject Subsidy
        </Button>
      </div>

      {/* Modal for Accept/Reject Confirmation */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to {actionType === 'accept' ? 'accept' : 'reject'} this subsidy request?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button
            variant={actionType === 'accept' ? 'success' : 'danger'}
            onClick={actionType === 'accept' ? handleAccept : handleReject}
          >
            Yes, {actionType === 'accept' ? 'Accept' : 'Reject'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast for success/error feedback */}
      <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
        <Toast.Header>
          <strong className="mr-auto">{toastType === 'success' ? 'Success' : 'Error'}</strong>
        </Toast.Header>
        <Toast.Body className={toastType === 'success' ? 'text-success' : 'text-danger'}>
          {toastMessage}
        </Toast.Body>
      </Toast>
    </Container>
    <Footer />
    </>
  );
};

export default RequestDetail;
