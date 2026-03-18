import React, { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaInfoCircle,
  FaUser,
  FaTasks,
  FaStar,
  FaWallet,
  FaCog,
  FaClipboardList,
  FaHandsHelping,
  FaHandshake,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequests, searchReqAccToCategory } from "../../../Utility/FeedSlice";

const Feed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.AuthSlice);
  const { feed } = useSelector((state) => state.FeedSlice);

  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);

  useEffect(() => {
    if (location.state?.category) {
      dispatch(searchReqAccToCategory(location.state.category));
    }
  }, [feed, location.state, dispatch]);
  

  const NavDetails = [
    {
      icon: <FaInfoCircle />,
      name: "Profile Information",
      path: "/profile",
    },
    {
      icon: <FaHandsHelping />,
      name: "Active Engagement",
      path: "activeRequest",
    },
    {
      icon: <FaHandshake />,
      name: "All Requests",
      path: "requestBody",
    },
    {
      icon: <FaUser />,
      name: "Account Type",
      path: "/account-type",
    },
    {
      icon: <FaClipboardList />,
      name: "Experience & Skills",
      path: "/skills",
    },
    {
      icon: <FaTasks />,
      name: "Sevice History",
      path: "/history",
    },
    {
      icon: <FaStar />,
      name: "Rating & Reputation",
      path: "/rating",
    },
    {
      icon: <FaWallet />,
      name: "Transaction & Rewards",
      path: "/wallet",
    },
    {
      icon: <FaCog />,
      name: "Settings & Control",
      path: "/settings",
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
                src={
                  user?.image ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
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
                <h6 style={{ margin: 0, fontWeight: "700" }}>
                  {user?.name || "Guest User"}
                </h6>
                <small style={{ opacity: 0.9 }}>Emotional Support</small>
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
                        navigate(item.path);
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

export default Feed;
