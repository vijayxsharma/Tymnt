import React from "react";
import {
  FaBell,
  FaChartLine,
  FaClipboardList,
  FaCog,
  FaExclamationTriangle,
  FaHandsHelping,
  FaMoneyBillWave,
  FaSignOutAlt,
  FaStar,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import { useDispatch, useSelector,} from "react-redux";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { AdminLogout } from "../Utility/AdminSlice";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { admin } = useSelector((state) => state.AdminSlice);
  // if(loading){
  //   return <div>Checking session...</div>;
  // }
  if (!admin) {
    return <Navigate  to="/adminLogin" replace/>;
  }
  const NavDetails = [
    {
      icon: <FaTachometerAlt />,
      name: "Dashboard",
      path: "",
    },
    {
      icon: <FaUsers />,
      name: "Users",
      path: "users",
    },
    {
      icon: <FaHandsHelping />,
      name: "Services",
      path: "services",
    },
    {
      icon: <FaClipboardList />,
      name: "Requests",
      // path: "/adminProfile/requests",
    },
    {
      icon: <FaMoneyBillWave />,
      name: "Payments",
      // path: "/adminProfile/payments",
    },
    {
      icon: <FaExclamationTriangle />,
      name: "Disputes",
      // path: "/adminProfile/disputes",
    },
    {
      icon: <FaStar />,
      name: "Reviews",
      // path: "/adminProfile/reviews",
    },
    {
      icon: <FaBell />,
      name: "Notifications",
      // path: "/adminProfile/notifications",
    },
    {
      icon: <FaChartLine />,
      name: "Analytics",
      // path: "/adminProfile/analytics",
    },
    {
      icon: <FaCog />,
      name: "Settings",
      // path: "/adminProfile/settings",
    },
    {
      icon: <FaSignOutAlt />,
      name: "Logout",
    },
  ];
  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <strong>
              Tymnt<span style={{ color: "yellow" }}>.</span>
            </strong>
          </Link>

          {/* TOGGLER */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#profileOffcanvas"
            aria-controls="profileOffcanvas"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* OFFCANVAS */}
          <div
            className="offcanvas offcanvas-start"
            id="profileOffcanvas"
            data-bs-scroll="true"
            data-bs-backdrop="false"
            tabIndex="-1"
            style={{ width: "75%", backgroundColor: "#fff" }}
          >
            {/* HEADER */}
            <div
              style={{
                backgroundColor: "#0d6efd",
                padding: "20px",
                display: "flex",
                alignItems: "center",
                gap: "15px",
                color: "#fff",
              }}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK6Gn-yLhhvV02BqPoV8P9WcB0qRRaz7XqrnYrZuiazg&s"
                alt="Profile"
                style={{
                  width: "55px",
                  height: "55px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #fff",
                }}
              />

              <div>
                <h6 style={{ margin: 0, fontWeight: "700" }}>VIJAY KUMAR</h6>
                <small style={{ opacity: 0.9 }}>Tymnt Admin</small>
              </div>
            </div>

            {/* BODY */}
            <div className="offcanvas-body" style={{ padding: 0 }}>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {NavDetails.map((item, index) => (
                  <li
                    key={index}
                    style={{
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <div
                      onClick={() => {
                        // LOGOUT
                        if (item.name === "Logout") {
                          dispatch(AdminLogout()).then(() => {
                            navigate("/adminLogin");
                          });
                        } else {
                          navigate(item.path);
                        }
                      }}
                      data-bs-dismiss="offcanvas"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        padding: "10px 20px",
                        fontSize: "15px",
                        textDecoration: "none",
                        color: "#000",
                      }}
                    >
                      <span style={{ fontSize: "18px", color: "#0d6efd" }}>
                        {item.icon}
                      </span>
                      {item.name}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default AdminProfile;
