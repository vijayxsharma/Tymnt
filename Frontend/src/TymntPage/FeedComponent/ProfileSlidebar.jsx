import React from "react";
import {
  FaUserCircle,
  FaInfoCircle,
  FaUser,
  FaListAlt,
  FaBriefcase,
  FaHistory,
  FaStar,
  FaMoneyBill,
  FaCog,
} from "react-icons/fa";

const ProfileSidebar = () => {
  return (
    <div
      style={{
        width: "280px",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        backgroundColor: "#fff",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          backgroundColor: "#0d6efd",
          color: "white",
          padding: "15px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <img
          src="https://i.pravatar.cc/100"
          alt="profile"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid white",
          }}
        />
        <div style={{ flexGrow: 1 }}>
          <h6 style={{ margin: 0, fontWeight: "bold" }}>VIJAY KUMAR</h6>
        </div>
        <FaUserCircle size={28} />
      </div>

      {/* MENU */}
      <ul style={{ listStyle: "none", padding: "10px", margin: 0 }}>
        <MenuItem icon={<FaInfoCircle />} text="Basic Profile Information" />
        <MenuItem icon={<FaUser />} text="Account type" />
        <MenuItem icon={<FaListAlt />} text="Service preferences" />
        <MenuItem icon={<FaBriefcase />} text="Experience & Skills" />
        <MenuItem icon={<FaHistory />} text="Request & Task History" />
        <MenuItem icon={<FaStar />} text="Rating & Reputation" />
        <MenuItem icon={<FaMoneyBill />} text="Transaction & Rewards Info" />
        <MenuItem icon={<FaCog />} text="Settings & Control" />
      </ul>
    </div>
  );
};

const MenuItem = ({ icon, text }) => (
  <li
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "5px",
      cursor: "pointer",
      borderRadius: "6px",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5ff")}
    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
  >
    <span style={{ color: "#0d6efd", fontSize: "12px" }}>{icon}</span>
    <span style={{ fontWeight: "400" }}>{text}</span>
  </li>
);

export default ProfileSidebar;
