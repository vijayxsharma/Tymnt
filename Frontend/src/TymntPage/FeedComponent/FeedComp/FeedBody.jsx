import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle, FaEllipsisV, FaRupeeSign } from "react-icons/fa";
import {
  closeDeletePopup,
  deleteRequestFromBackend,
  fetchRequests,
  openDeletePopup,
  updateRequestStatus,
} from "../../../Utility/FeedSlice";
import TymntRequest from "../NewRequest/TymntRequest";
import { MdBookmark } from "react-icons/md";
import { FiClock, FiMessageCircle } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import SearchReqFeed from "./SearchFeedComp/SearchReqFeed";
import ImageSlide from "./ImageSlide";
import LoadingSkeleton from "./LoadingSkeletonComp/LoadingSkeleton";
const FeedBody = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthSlice);

  let { loading, filteredFeed, deletePopId, requestNotFound } = useSelector(
    (state) => state.FeedSlice,
  );

  // Posting time update
  const getTimeAgo = (timestamp) => {
    const seconds = Math.floor((new Date().getTime()- timestamp) / 1000);
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;

    return `${Math.floor(seconds / 86400)}d`;
  };

  // Request laoding...
  if (loading) return <LoadingSkeleton />;

  // Request Rejection Error
  if (requestNotFound)
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Backend Connection Error</h2>
          <p style={styles.message}>
            Error: Not able to connect with your backend, Vijay.
            <br />
            Please ensure the server is running and try again.
          </p>
          <button
            style={styles.button}
            onClick={() => dispatch(fetchRequests())}
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <>
      <ImageSlide />
      <SearchReqFeed />
      {filteredFeed.map((elm) => (
        <div key={elm.id} style={card}>
          {/* ===== HEADER ===== */}
          <div style={header}>
            <div style={userRow}>
              {/* {let temp=user.image} */}
              <img src={elm.image} alt="user" style={avatar} />
              <div>
                <div style={nameRow}>
                  <strong>{elm.name}</strong>
                  <FaCheckCircle size={14} color="#7c3aed" />
                </div>
                <div style={subtitleStyle}>{elm.category}</div>
              </div>
            </div>
            <div style={rightSection}>
              <div style={postingTime}>
                <FiClock
                  style={{
                    background: "#6b7280",
                    color: "white",
                    borderRadius: "50%",
                  }}
                />
                {getTimeAgo(elm.createdAt)}
              </div>
              <FaEllipsisV
                style={{ cursor: "pointer" }}
                onClick={() => dispatch(openDeletePopup(elm.id))}
              />
              <div style={statusBadge(elm.status)}></div>
            </div>
          </div>

          {/* ===== BODY ===== */}
          <p style={message}>{elm.description}</p>

          <span style={aboveFooter}>
            <span
              style={{
                background: "#d9e3eb",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              <IoLocationOutline /> Faridabad
            </span>{" "}
            |{" "}
            <span
              style={{
                background: "#d9e3eb",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              COST : <FaRupeeSign /> {elm.helpingCost}/hr
            </span>{" "}
            |{" "}
            <span
              style={{
                background: "#d9e3eb",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              EST. TIME <FiClock /> 4 hrs
            </span>{" "}
          </span>
          {/* ===== FOOTER ===== */}
          <hr />
          <div style={footer}>
            <div style={stats}>
              <div style={{ ...statItem, color: "#198754" }}>
                <MdBookmark size={16} />
                <span>Save</span>
              </div>

              <div style={statItem}>
                <FiMessageCircle size={16} />
                <span>Message</span>
              </div>
            </div>
            {elm.status === "active" && (
              <button
                style={acceptBtn}
                onClick={() =>
                  dispatch(
                    updateRequestStatus({
                      id: elm.id,
                      status: "pending",
                      acceptedBy: user?.email,
                    }),
                  )
                }
              >
                <FaCheckCircle size={16} />
                <span>Accept</span>
              </button>
            )}

            {elm.status === "pending" && (
              <button
                style={acceptBtn}
                onClick={() =>
                  dispatch(
                    updateRequestStatus({ id: elm.id, status: "executing" }),
                  )
                }
              >
                <FaCheckCircle size={16} />
                <span>Start</span>
              </button>
            )}
            {elm.status === "executing" && (
              <button
                style={acceptBtn}
                onClick={() =>
                  dispatch(
                    updateRequestStatus({ id: elm.id, status: "completed" }),
                  )
                }
              >
                <FaCheckCircle size={16} />
                <span>Finish</span>
              </button>
            )}
          </div>
          {/* Delete PopUp */}
          {deletePopId === elm.id && (
            <div style={overlay}>
              <div style={popup}>
                <p>Delete this request?</p>
                <div style={popupActions}>
                  <button
                    style={cancelBtn}
                    onClick={() => dispatch(closeDeletePopup())}
                  >
                    Cancel
                  </button>
                  <button
                    style={deleteBtn}
                    onClick={() => dispatch(deleteRequestFromBackend(elm.id))}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      <TymntRequest />
    </>
  );
};

const statusBadge = (status) => {
  let color = "#6c757d";

  if (status === "active") color = "#28a745";
  if (status === "pending") color = "#ffc107";
  if (status === "executing") color = "#0d6efd";
  if (status === "expired") color = "#dc3545";

  return {
    position: "absolute",
    top: "12px",
    right: "10px",
    width: "5px",
    height: "5px",
    backgroundColor: color,
    borderRadius: "50%",
  };
};

const card = {
  position: "relative",
  width: "340px",
  margin: "12px auto",
  background: "#ffffff",
  borderRadius: "18px",
  padding: "16px",
  marginBottom: "18px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const userRow = {
  display: "flex",
  gap: "12px",
};

const avatar = {
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "1px solid grey",
};

const nameRow = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
};

const subtitleStyle = {
  fontSize: "13px",
  color: "#6b7280",
  margin: "-3px 0px",
};

const postingTime = {
  color: "#6b7280",
  fontSize: "13px",
  display: "flex",
  alignItems: "center",
  gap: "6px",
};

const rightSection = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const message = {
  marginTop: "12px",
  fontSize: "15px",
  color: "#374151",
  lineHeight: "1.6",
};

const aboveFooter = {
  fontSize: "11px",
};
const footer = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "-5px 0px",
  // marginTop: "2px",
  // gap: "12px",
};

const stats = {
  display: "flex",
  gap: "50px",
};

const statItem = {
  // border:"1px solid black",
  borderRadius: "5px",
  background: "#d9e3eb",
  padding: "5px",
  color: "#31405d",
  border: "none",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  fontSize: "13px",
  // color: "#31405d",
  gap: "4px",
};

const acceptBtn = {
  flexDirection: "row",
  color: "white",
  border: "none",
  borderRadius: "5px",
  padding: "5px",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "13px",
  cursor: "pointer",
  background: "#0091ff",
  whiteSpace: "nowrap",
};

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const popup = {
  background: "#fff",
  padding: 20,
  borderRadius: 12,
  width: 260,
};

const styles = {
  container: {
    height: "50vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(228, 242, 253)",
  },
  card: {
    backgroundColor: "#fafffe",
    padding: "32px",
    borderRadius: "15px",
    width: "95%",
    maxWidth: "420px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  title: {
    color: "#c0392b",
    marginBottom: "12px",
  },
  message: {
    color: "#555",
    marginBottom: "20px",
    fontSize: "15px",
    lineHeight: "1.5",
  },
  button: {
    backgroundColor: "#0a3d62",
    color: "#fff",
    border: "none",
    padding: "10px 22px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
};
const popupActions = { display: "flex", gap: 10 };
const cancelBtn = { flex: 1, borderRadius: "5px", background: "transparent" };
const deleteBtn = {
  flex: 1,
  background: "#dc3556",
  color: "#fff",
  borderRadius: "5px",
};

export default FeedBody;
