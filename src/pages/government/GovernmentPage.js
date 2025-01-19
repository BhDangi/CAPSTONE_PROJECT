import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Table, Alert, Spinner, InputGroup, FormControl, Pagination, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap'; // Import necessary Bootstrap components
import Footer from '../Footer';
import Header from '../Header';

const GovernmentPage = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(5);
  const [sortDirection, setSortDirection] = useState('asc');
  const navigate = useNavigate();

  // Fetch subsidy requests on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/subsidy/requests');
        const filteredData = response.data.filter(request => request.status === "In the process");
        setRequests(filteredData);
        setFilteredRequests(filteredData);
      } catch (err) {
        console.error('Error fetching subsidy requests:', err);
        setError('Failed to fetch subsidy requests.');
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // Filter and search requests based on user input
  useEffect(() => {
    const result = requests.filter(request => {
      return (
        (request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          request.applicationNumber.includes(searchQuery)) &&
        (statusFilter ? request.status === statusFilter : true)
      );
    });
    setFilteredRequests(result);
    setCurrentPage(1); // Reset to page 1 when search or filter changes
  }, [searchQuery, statusFilter, requests]);

  // Handle page changes for pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Sort the requests based on name, status, or application number
  const handleSort = (key) => {
    const sortedRequests = [...filteredRequests];
    sortedRequests.sort((a, b) => {
      if (key === 'name' || key === 'status') {
        return sortDirection === 'asc'
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      } else {
        return sortDirection === 'asc' ? a[key] - b[key] : b[key] - a[key];
      }
    });
    setFilteredRequests(sortedRequests);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  // Get current requests for the page
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);

  // Navigate to the details page of a request
  const handleRequestClick = (id) => {
    navigate(`/request/${id}`);
  };

  // Render the loading skeleton
  const renderLoadingSkeleton = () => (
    <div className="skeleton-loader">
      <Spinner animation="border" variant="primary" />
      <p>Loading requests...</p>
    </div>
  );

  return (
    <>
    <Header />
    <Container className="my-5">
      <h1 className="text-center text-primary mb-4">Welcome to the Government Dashboard</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <h2 className="text-center mb-4">Subsidy Requests</h2>

      {loading ? (
        renderLoadingSkeleton()
      ) : (
        <>
          {/* Search and Filter Section */}
          <InputGroup className="mb-4">
            <FormControl
              placeholder="Search by name or application number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>

          <Dropdown className="mb-4">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Filter by Status
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setStatusFilter('')}>All Statuses</Dropdown.Item>
              <Dropdown.Item onClick={() => setStatusFilter('In the process')}>In the process</Dropdown.Item>
              <Dropdown.Item onClick={() => setStatusFilter('Approved')}>Approved</Dropdown.Item>
              <Dropdown.Item onClick={() => setStatusFilter('Rejected')}>Rejected</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {currentRequests.length === 0 ? (
            <p>No requests found.</p>
          ) : (
            <Table striped bordered hover responsive className="shadow-lg">
              <thead>
                <tr>
                  <th>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Click to sort by Application Number</Tooltip>}
                    >
                      <Button variant="link" onClick={() => handleSort('applicationNumber')}>
                        Application Number
                      </Button>
                    </OverlayTrigger>
                  </th>
                  <th>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Click to sort by Name</Tooltip>}
                    >
                      <Button variant="link" onClick={() => handleSort('name')}>
                        Name
                      </Button>
                    </OverlayTrigger>
                  </th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRequests.map((request) => (
                  <tr key={request._id}>
                    <td>{request.applicationNumber}</td>
                    <td>{request.name}</td>
                    <td>{request.type}</td>
                    <td>{request.status}</td>
                    <td>
                      <Button
                        variant="info"
                        onClick={() => handleRequestClick(request._id)}
                        className="w-100"
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          {/* Pagination */}
          <Pagination className="justify-content-center">
            {Array.from({ length: Math.ceil(filteredRequests.length / requestsPerPage) }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      )}
    </Container>
    <Footer />
    </>
  );
};

export default GovernmentPage;
