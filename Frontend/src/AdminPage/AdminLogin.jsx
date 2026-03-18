import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate} from "react-router-dom";
import { adminLogin, handleAdminChange } from "../Utility/AdminSlice";

const AdminLogin = () => {
const dispatch = useDispatch();
const navigate = useNavigate();

const {adminData} = useSelector((state)=>state.AdminSlice);

const handleLogin = async ()=>{
    
    const result = await dispatch(adminLogin(adminData));
    if(result.meta.requestStatus === "fulfilled"){
        navigate("/adminProfile");
    }
}
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(#0b1c2d, #091726)",
      }}
    >
      {/* Card */}
      <div
        style={{
          width: "90%",
          background: "#fff",
          borderRadius: "6px",
          border: "1px solid black",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#0095FF",
            padding: "15px",
            borderRadius: "6px 6px 0 0",
          }}
        >
          <strong style={{ color: "white", fontSize: "32px" }}>
            Tymnt<span style={{ color: "yellow" }}>.</span>
          </strong>
          <p
            style={{
              fontFamily: "serif",
              fontSize: "12px",
              margin: "-10px 0 0 38px",
              color: "black",
            }}
          >
            <strong>Where Time Works for Everyone</strong>
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: "25px", fontFamily: "serif" }}>
          <h2 style={{ marginBottom: "20px", textAlign:"center"  }}>Admin Login</h2>

          <label>Email</label>
          <input
            type="text"
            name="email"
            value={adminData.email}
            placeholder="Enter your Email or Phone Number"

            onChange={(e)=>dispatch(handleAdminChange({name:e.target.name, value:e.target.value}))}
            style={inputStyle}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <label>Password</label>
            <span
              style={{
                color: "purple",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Forgot Password
            </span>
          </div>

          <input
            type="password"
            name="password"
            value={adminData.password}
            placeholder="Enter your Password"
            onChange={(e)=>dispatch(handleAdminChange({name:e.target.name, value:e.target.value}))}
            style={inputStyle}
          />

          <button style={primaryBtn} 
          onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "6px 0 14px 0",
  border: "1px solid #777",
  borderRadius: "5px",
  fontSize: "14px",
};

const primaryBtn = {
  width: "100%",
  padding: "10px",
  background: "#0095FF",
  color: "white",
  //   border: "2px solid black",
  borderRadius: "4px",
  fontSize: "18px",
  cursor: "pointer",
};

export default AdminLogin;
