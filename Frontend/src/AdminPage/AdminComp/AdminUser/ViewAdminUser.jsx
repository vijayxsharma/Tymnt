import React from "react";
import { Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { closeViewPopup } from "../../../Utility/AdminSlice";

const ViewAdminUser = () => {
  const dispatch = useDispatch();
  const { isViewPopupOpen, viewUser } = useSelector(
    (state) => state.AdminSlice,
  );
  return (
    <>
      {isViewPopupOpen && (
        <div style={overlay}>
          <div style={viewCard}>
            {/* Gradient Header */}
            <div style={header}>
              <div style={avatarWrapper}>
                <Image
                  src={viewUser?.image}
                  roundedCircle
                  width={120}
                  height={120}
                />
              </div>
            </div>

            {/* Body */}
            <div style={body}>
              <h3 style={nameStyle}>{viewUser?.name}</h3>

              <div style={infoBox}>
                <div style={infoItem}>
                  <span style={label}> 📧 Email </span>
                  <span style={value}>{viewUser?.email}</span>
                </div>

                <div style={infoItem}>
                  <span style={label}>📱 Mobile </span>
                  <span style={value}>{viewUser?.mobile}</span>
                </div>
              </div>

              <button
                style={closeBtn}
                onClick={() => dispatch(closeViewPopup())}
              >
                Close Profile
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
  background: "rgba(0,0,0,0.55)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backdropFilter: "blur(6px)",
  zIndex: 1000,
};

const viewCard = {
  width: "340px",
  borderRadius: "25px",
  overflow: "hidden",
  background: "#fff",
  boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
  animation: "fadeIn 0.3s ease",
};

const header = {
  height: "140px",
  background: "linear-gradient(135deg, #0d6efd, #4dabf7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
};

const avatarWrapper = {
  marginBottom: "-60px",
  background: "#fff",
  padding: "6px",
  borderRadius: "50%",
  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
};

const body = {
  padding: "70px 25px 30px 25px",
  textAlign: "center",
};

const nameStyle = {
  fontWeight: "700",
  fontSize: "22px",
  marginBottom: "10px",
  color: "#222",
  textTransform: "capitalize",
};


const infoBox = {
  background: "#f8f9fa",
  borderRadius: "15px",
  padding: "15px",
  marginBottom: "20px",
  boxShadow:"2px 2px 2px 2px rgb(0,0,0,0.5)"
};

const infoItem = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 0",
  fontSize: "14px",
  borderBottom: "1px solid #e9ecef",
};

const label = {
  fontWeight: "600",
  color: "#555",
};

const value = {
  color: "#333",
  maxWidth: "160px",
  textAlign: "right",
  wordBreak: "break-word",
};


const closeBtn = {
  padding: "12px 25px",
  borderRadius: "15px",
  border: "none",
  background: "linear-gradient(135deg, #0d6efd, #4dabf7)",
  color: "#fff",
  fontWeight: "600",
  fontSize: "14px",
  cursor: "pointer",
  transition: "0.2s ease",
};


export default ViewAdminUser;
