import React, { useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Form,
  Image,
} from "react-bootstrap";
import {
  FaUser,
  FaCheckCircle,
  FaHourglassHalf,
  FaShieldAlt,
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import {
  closeUserDeletePopup,
  deleteUser,
  // deleteUser,
  fetchUsers,
  opensUserForm,
  openUserDeletePopup,
  openViewPopup,
  setSelectedUser,
} from "../../Utility/AdminSlice";
import EditUser from "./AdminUser/EditUser";
import ViewAdminUser from "./AdminUser/ViewAdminUser";
const TymntUser = () => {
  const dispatch = useDispatch();
  const { users, isDeletePopupOpen, deleteUserId } = useSelector(
    (state) => state.AdminSlice,
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <Container
        fluid
        className="bg-light p-3"
        style={{ maxWidth: "430px", minHeight: "100vh" }}
      >
        {/* Summary Cards */}
        <Row className="g-2 mb-3">
          <Col xs={6}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <FaUser size={22} className="mb-2 text-primary" />
                <div>Total Users</div>
                <h5>{users.length}</h5>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={6}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <FaCheckCircle size={22} className="mb-2 text-success" />
                <div>Active</div>
                <h5>6</h5>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={6}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <FaHourglassHalf size={22} className="mb-2 text-warning" />
                <div>Pending</div>
                <h5>1</h5>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={6}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <FaShieldAlt size={22} className="mb-2 text-info" />
                <div>Admin</div>
                <h5>1</h5>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Search */}
        <Form className="mb-3">
          <Form.Control type="text" placeholder="Search users..." />
        </Form>

        {/* Users List */}
        {users.map((user) => (
          <Card key={user.id} className="mb-3 shadow-sm">
            <Card.Body>
              {/* Top Section */}
              <div className="d-flex align-items-center justify-content-between">
                {/* Left: Image + Details */}
                <div className="d-flex align-items-center">
                  <Image
                    src={user.image}
                    roundedCircle
                    width={55}
                    height={55}
                    className="me-3"
                  />

                  <div>
                    <h6 className="mb-1 fw-bold">{user.name}</h6>
                    <small className="text-muted">{user.email}</small>
                    <div>
                      <small>{user.role}</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Centered */}
              <div className="d-flex justify-content-center gap-2 mt-3">
                <Button size="sm" variant="primary"
                onClick={()=>dispatch(openViewPopup(user))}
                >
                  <FaEye /> View
                </Button>

                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => {
                    dispatch(setSelectedUser(user));
                    dispatch(opensUserForm());
                  }}
                >
                  <FaEdit /> Edit
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    dispatch(openUserDeletePopup(user.id));
                  }}
                >
                  <FaTrash /> Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Container>
      <ViewAdminUser/>
      <EditUser />
      {isDeletePopupOpen && (
        <div style={overlay}>
          <div style={popup}>
            <p>Delete this user?</p>
            <div style={popupActions}>
              <button
                style={cancelBtn}
                onClick={() => dispatch(closeUserDeletePopup())}
              >
                Cancel
              </button>
              <button
                style={deleteBtn}
                onClick={() => dispatch(deleteUser(deleteUserId))}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const popup = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  width: "280px",
  textAlign: "center",
};

const popupActions = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "15px",
};

const cancelBtn = {
  flex: 1,
  padding: "10px",
  borderRadius: "10px",
  border: "none",
  background: "#9ca3af",
  color: "#fff",
  margin:"5px"
};
const deleteBtn = {
  flex: 1,
  padding: "10px",
  borderRadius: "10px",
  border: "none",
  background: "#e73c22",
  color: "#fff",
  margin:"5px"
};


export default TymntUser;
