import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import {
  FaUsers,
  FaCog,
  FaHourglassHalf,
  FaWallet,
  FaUserPlus,
  FaClipboardList,
  FaCheckCircle,
  FaEdit,
  FaArrowUp,
} from "react-icons/fa";

const Dashboard = () => {
  return (
    <Container
      fluid
      className="bg-light p-3"
      style={{ maxWidth: "430px", minHeight: "100vh" }}
    >
      {/* ================= SUMMARY CARDS ================= */}
      <Row className="g-2 mb-3">

        <Col xs={6}>
          <Card className="text-white border-0 shadow-sm bg-primary">
            <Card.Body>
              <div className="d-flex align-items-center gap-2 small">
                <FaUsers />
                <span>Total Users</span>
              </div>
              <h5 className="fw-bold mt-2">12,540</h5>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={6}>
          <Card className="text-white border-0 shadow-sm bg-success">
            <Card.Body>
              <div className="d-flex align-items-center gap-2 small">
                <FaCog />
                <span>Active Services</span>
              </div>
              <h5 className="fw-bold mt-2">320</h5>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={6}>
          <Card className="text-white border-0 shadow-sm bg-warning">
            <Card.Body>
              <div className="d-flex align-items-center gap-2 small">
                <FaHourglassHalf />
                <span>Pending Requests</span>
              </div>
              <h5 className="fw-bold mt-2">45</h5>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={6}>
          <Card className="text-white border-0 shadow-sm bg-dark">
            <Card.Body>
              <div className="d-flex align-items-center gap-2 small">
                <FaWallet />
                <span>Total Transactions</span>
              </div>
              <h5 className="fw-bold mt-2">8,950</h5>
            </Card.Body>
          </Card>
        </Col>

      </Row>

      {/* ================= RECENT ACTIVITY ================= */}
      <Card className="border-0 shadow-sm mb-3">
        <Card.Body>
          <h6 className="fw-semibold mb-3">Recent Activity</h6>

          <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
            <div className="d-flex align-items-center gap-2 text-muted small">
              <FaUserPlus />
              <span>New user registered</span>
            </div>
            <small className="text-muted">5 mins ago</small>
          </div>

          <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
            <div className="d-flex align-items-center gap-2 text-muted small">
              <FaClipboardList />
              <span>Service request submitted</span>
            </div>
            <small className="text-muted">20 mins ago</small>
          </div>

          <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
            <div className="d-flex align-items-center gap-2 text-muted small">
              <FaCheckCircle />
              <span>Payment completed</span>
            </div>
            <small className="text-muted">1 hour ago</small>
          </div>

          <div className="d-flex justify-content-between align-items-center py-2">
            <div className="d-flex align-items-center gap-2 text-muted small">
              <FaEdit />
              <span>Account updated</span>
            </div>
            <small className="text-muted">2 hours ago</small>
          </div>

        </Card.Body>
      </Card>

      {/* ================= QUICK STATS ================= */}
      <h6 className="fw-semibold mb-2">Quick Stats</h6>

      <Row className="g-2">

        <Col xs={6}>
          <Card className="text-white border-0 shadow-sm bg-primary">
            <Card.Body>
              <p className="small mb-1">Daily Growth</p>
              <h6 className="fw-bold">+235</h6>
              <div className="d-flex align-items-center gap-1 small">
                <FaArrowUp />
                18%
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={6}>
          <Card className="text-white border-0 shadow-sm bg-success">
            <Card.Body>
              <p className="small mb-1">Monthly Growth</p>
              <h6 className="fw-bold">+3,250</h6>
              <div className="d-flex align-items-center gap-1 small">
                <FaArrowUp />
                12%
              </div>
            </Card.Body>
          </Card>
        </Col>

      </Row>

    </Container>
  );
};

export default Dashboard;
