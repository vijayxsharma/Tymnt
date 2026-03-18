import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  closeRequestForm,
  openRequestForm,
  submitRequestToBackend,
  updateRequestForm,
  updateScrollState,
} from "../../../Utility/FeedSlice";

const TymntRequest = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthSlice);
  const { isRequestFormOpen, requestForm, isrequestButtonShrunk } = useSelector(
    (state) => state.FeedSlice,
  );

  useEffect(() => {
    const handleScroll = () => {
      dispatch(updateScrollState(window.scrollY));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch]);

  useEffect(() => {
    if (user && isRequestFormOpen) {
      dispatch(updateRequestForm({ field: "name", value: user.name }));
      dispatch(updateRequestForm({ field: "image", value: user.image }));
    }
  }, [user, isRequestFormOpen, dispatch]);

  return (
    <>
      {/* FLOATING BUTTON */}
      {!isRequestFormOpen && (
        <button
          style={{
            ...newRequestBtn,
            width: isrequestButtonShrunk ? "48px" : "150px",
            borderRadius: isrequestButtonShrunk ? "50%" : "28px",
            padding: isrequestButtonShrunk ? "0" : "0 16px",
            transition:
              "width 0.3s ease, border-radius 0.3s ease, padding 0.3s ease",
          }}
          onClick={() => dispatch(openRequestForm())}
        >
          <FaPlus size={18} />
          {!isrequestButtonShrunk && (
            <span style={{ marginLeft: "8px" }}>New Request</span>
          )}
        </button>
      )}

      {/* Request Form */}
      {isRequestFormOpen && (
        <div style={sheet}>
          <h3 style={title}>Create New Request</h3>

          {/* PROFILE CARD */}
          <div style={profileCard}>
            <div style={imageWrapper}>
              <img
                src={
                  user?.image ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Profile"
                style={profileImage}
              />
            </div>

            {/* Name Display */}
            <h4 style={{ marginTop: "12px", marginBottom: "4px" }}>
              {user?.name || "Guest User"}
            </h4>
          </div>

          {/* CATEGORY */}
          <label style={label}>Category</label>
          <select
            style={input}
            value={requestForm.category}
            onChange={(e) =>
              dispatch(
                updateRequestForm({ field: "category", value: e.target.value }),
              )
            }
          >
            <option>Select Helping Category</option>
            <option>Emotional Support Buddy</option>
            <option>Delivery Buddy</option>
            <option>Household Buddy</option>
            <option>Food Buddy</option>
            <option>Assignment Buddy</option>
            <option>Skilled Buddy</option>
            <option>Cloths Buddy</option>
            <option>Queueing Buddy</option>
          </select>

          {/* DESCRIPTION */}
          <label style={label}>Description</label>
          <textarea
            style={textarea}
            value={requestForm.description}
            onChange={(e) =>
              dispatch(
                updateRequestForm({
                  field: "description",
                  value: e.target.value,
                }),
              )
            }
            placeholder="Describe what you’re going through and what kind of support you need..."
          />
          {/* HELPING RATE (Hidden from public card) */}
          <label style={label}>Helping Cost (₹)</label>
          <input
            type="number"
            style={input}
            value={requestForm.helpingCost || ""}
            onChange={(e) =>
              dispatch(
                updateRequestForm({
                  field: "helpingCost",
                  value: e.target.value,
                }),
              )
            }
            placeholder="Enter your Tymnt helping cost"
          />

          {/* ACTIONS */}
          <div style={actions}>
            <button
              style={cancelBtn}
              onClick={() => dispatch(closeRequestForm())}
            >
              Cancel
            </button>
            <button
              style={submitBtn}
              onClick={() => dispatch(submitRequestToBackend(requestForm))}
            >
              Submit Request
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const newRequestBtn = {
  position: "fixed",
  bottom: "70px",
  right: "20px",
  height: "48px",
  background: "#0d6efd",
  color: "#fff",
  border: "none",
  borderRadius: "28px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  fontSize: "14px",
  fontWeight: "500",
  cursor: "pointer",
  boxShadow: "0 8px 20px rgba(13,110,253,0.35)",
  zIndex: 1000,
};

const sheet = {
  position: "fixed",
  width: "100%",
  bottom: 0,
  left: 0,
  right: 0,
  background: "#fff",
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  padding: "20px",
  zIndex: 999,
  maxHeight: "90vh",
  overflowY: "auto",
};

const title = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "16px",
};

const label = {
  fontSize: "15px",
  color: "#282a2c",
  marginTop: "12px",
  marginBottom: "6px",
  display: "block",
};

const input = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
};

const textarea = {
  ...input,
  height: "90px",
};

const actions = {
  display: "flex",
  gap: "12px",
  marginTop: "18px",
};

const cancelBtn = {
  flex: 1,
  padding: "10px",
  borderRadius: "10px",
  border: "none",
  background: "#9ca3af",
  color: "#fff",
};

const submitBtn = {
  flex: 1,
  padding: "10px",
  borderRadius: "10px",
  border: "none",
  background: "#0d6efd",
  color: "#fff",
};

const profileCard = {
  borderRadius: "16px",
  textAlign: "center",
};

const imageWrapper = {
  display: "flex",
  justifyContent: "center",
};

const profileImage = {
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "3px solid #9ca3af",
};

export default TymntRequest;
