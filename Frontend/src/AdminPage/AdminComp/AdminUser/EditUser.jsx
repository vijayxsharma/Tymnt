import { useDispatch, useSelector } from "react-redux";
import { closeUserForm, handleEditChange, updateUser } from "../../../Utility/AdminSlice";

const EditUser = () => {
  const dispatch = useDispatch();
  const { isUserFormOpen, selectedUser, editForm } = useSelector(
    (state) => state.AdminSlice,
  );

  return (
    <>
      {/* Request Form */}
      {isUserFormOpen && (
        <div style={sheet}>
          <h3 style={title}>Edit User</h3>

          {/* Name */}
          <label style={label}>Name</label>
          <input
            style={input}
            name="name"
            value={editForm.name}
            onChange={(e) =>
              dispatch(
                handleEditChange({
                  name: e.target.name,
                  value: e.target.value,
                }),
              )
            }
            placeholder="Enter your name"
          />

          {/* Name */}
          <label style={label}>Email</label>
          <input
            style={input}
            name="email"
            value={editForm.email}
            onChange={(e) =>
              dispatch(
                handleEditChange({
                  name: e.target.name,
                  value: e.target.value,
                }),
              )
            }
            placeholder="Enter your name"
          />

          {/* Image */}
          <label style={label}>Image</label>
          <input
            style={input}
            name="image"
            value={editForm.image}
            onChange={(e) =>
              dispatch(
                handleEditChange({
                  name: e.target.name,
                  value: e.target.value,
                }),
              )
            }
            placeholder="Enter image link"
          />

          {/* Name */}
          <label style={label}>Mobile number</label>
          <input
            style={input}
            name="mobile"
            value={editForm.mobile}
            onChange={(e) =>
              dispatch(
                handleEditChange({
                  name: e.target.name,
                  value: e.target.value,
                }),
              )
            }
            placeholder="Enter your name"
          />

          {/* ACTIONS */}
          <div style={actions}>
            <button style={cancelBtn} onClick={() => dispatch(closeUserForm())}>
              Cancel
            </button>
            <button
              style={submitBtn}
              onClick={() =>
                dispatch(
                  updateUser({
                    id: selectedUser.id,
                    userData: editForm,
                  }),
                )
              }
            >
              Edit User
            </button>
          </div>
        </div>
      )}
    </>
  );
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
  boxShadow: "1px 1px 5px 5px rgba(4, 138, 255, 0.4)",
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

export default EditUser;
