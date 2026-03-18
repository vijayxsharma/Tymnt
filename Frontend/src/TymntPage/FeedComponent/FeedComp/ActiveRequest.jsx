import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaClock,
  FaMoneyBillWave,
  FaCheckCircle,
} from "react-icons/fa";
import { deleteRequestFromBackend, fetchUserRequests } from "../../../Utility/FeedSlice";

const ActiveRequest = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state)=>state.AuthSlice);

  const { userFeed } = useSelector((state) => state.FeedSlice);

  useEffect(() => {
  if (user?.email) {
    dispatch(fetchUserRequests(user.email));
  }
  }, [dispatch, user]);

  const [now, setNow] = useState(new Date().getTime());

  // Global live clock
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (userFeed.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "60px", fontSize: "18px" }}>
        No Active Tymnt Request available
      </p>
    );
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (req, totalCost) => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const options = {
      key: "rzp_test_SHa4JlHGkJydKe",
      amount: Math.round(totalCost * 100), // convert to paise
      currency: "INR",
      name: "Tymnt",
      description: "Emotional Support Session Payment",
      image: "/Tymnt_icon1.png",
      handler: function (response) {
        alert("Payment Successful!");
        console.log(response);

        // After success delete request
        dispatch(deleteRequestFromBackend(req.id));
      },
      prefill: {
        name: req.name,
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#7c3aed",
      },

      method: {
        upi: true,
        card: true,
        netbanking: true,
        wallet: true,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <style>
        {`
        .live-dot {
          width: 8px;
          height: 8px;
          background-color: #dc2626;
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.6); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}
      </style>

      {userFeed.map((req) => {
        const sessionStart = req.sessionStartTime || now;

        const secondsSpent =
          req.status === "executing"
            ? Math.floor((now - sessionStart) / 1000)
            : req.finalSeconds || 0;

        const totalCost =
          req.status === "completed"
            ? req.finalAmount
            : req.helpingCost * (secondsSpent / 3600);

        return (
          <div key={req.id} style={card}>
            {/* LIVE Indicator */}
            {req.status === "executing" && (
              <div style={liveIndicator}>
                <span className="live-dot"></span>
                LIVE SESSION
              </div>
            )}

            {/* Header */}
            <div style={header}>
              <img
                src={
                  req.image ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="User"
                style={profileImage}
              />

              <div style={{ flex: 1 }}>
                <div style={nameRow}>
                  <h2 style={profileName}>{req.name}</h2>
                  <FaCheckCircle style={verifiedBadge} />
                </div>

                <div style={categoryText}>{req.category}</div>
              </div>
            </div>

            {/* Details */}
            <div style={body}>
              <div style={infoRow}>
                {/* <FaAlignLeft style={iconStyle} /> */}
                <span>
                  <strong></strong> {req.description}
                </span>
              </div>

              <div style={divider}></div>

              {/* Billing Section */}
              <div style={billingSection}>
                <div style={billingRow}>
                  <FaMoneyBillWave style={billingIcon} />
                  <span>Helping Cost</span>
                  <strong>₹{req.helpingCost}/hr</strong>
                </div>

                {req.status === "executing" && (
                  <>
                    <div style={billingRow}>
                      <FaClock style={billingIcon} />
                      <span>Worked Time</span>
                      <strong style={timeStyle}>
                        {formatTime(secondsSpent)}
                      </strong>
                    </div>

                    <div style={totalBillRow}>
                      <span>Total Bill</span>
                      <strong style={costStyle}>₹{totalCost.toFixed(2)}</strong>
                    </div>
                  </>
                )}
                {req.status === "completed" && (
                  <button
                    style={paymentBtn}
                    onClick={() => handlePayment(req, req.finalAmount)}
                  >
                    Pay ₹{req.finalAmount?.toFixed(2)}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

/* ================= STYLES ================= */

const card = {
  position: "relative",
  width: "345px",
  margin: "20px auto",
  padding: "22px",
  borderRadius: "20px",
  background: "#ffffff",
  boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
  border: "1px solid #f1f1f1",
};

const header = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  marginBottom: "15px",
};

const profileImage = {
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "2px solid #e5e7eb",
};

const profileName = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#111827",
  margin: 0,
};

const liveIndicator = {
  position: "absolute",
  top: "15px",
  right: "15px",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "4px",
  fontWeight: "600",
  color: "#dc2626",
  backgroundColor: "#ffe5e5",
  padding: "4px 10px",
  borderRadius: "20px",
};

const body = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#374151",
};

const infoRow = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "8px",
};

const divider = {
  height: "1px",
  backgroundColor: "#e5e7eb",
  margin: "16px 0",
};

const billingSection = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const billingRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "14px",
};

const billingIcon = {
  color: "#6b7280",
};

const totalBillRow = {
  marginTop: "8px",
  paddingTop: "8px",
  borderTop: "1px solid #e5e7eb",
  display: "flex",
  justifyContent: "space-between",
  fontSize: "16px",
  fontWeight: "600",
};

const timeStyle = {
  color: "#2563eb",
  fontWeight: "700",
};

const costStyle = {
  color: "#059669",
  fontSize: "18px",
  fontWeight: "800",
};
const nameRow = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
};

const verifiedBadge = {
  width: "15px",
  height: "15px",
  borderRadius: "50%",
  backgroundColor: "#f7f5f9",
  color: "#7c3aed",
  fontSize: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
};

const categoryText = {
  fontSize: "14px",
  color: "#6b7280",
  marginTop: "0px",
};

const paymentBtn = {
  marginTop: "15px",
  width: "100%",
  padding: "10px",
  background: "#059669",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontWeight: "600",
  cursor: "pointer",
};

export default ActiveRequest;
