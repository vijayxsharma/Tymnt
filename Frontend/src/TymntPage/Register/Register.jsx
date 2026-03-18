import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { useDispatch, useSelector } from "react-redux";
import { handleUserChange, registerUser } from "../../Utility/NewUserSlice";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { inputFields, validateInput } = useSelector(
    (state) => state.NewUserSlice,
  );

  const handleSubmit = async () => {
    const isValid = Object.values(validateInput).every(Boolean);
    if (!isValid) {
      alert("Please satisfy all password rules");
      return;
    }

    const res = await dispatch(registerUser(inputFields));
    if (res.meta.requestStatus === "fulfilled") {
      alert("Registration Successful");
      navigate("/");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(#0b1c2d, #091726)",
      }}
    >
      {/* Main Card */}
      <div
        style={{
          width: "90%",
          background: "#fff",
          borderRadius: "6px",
          overflow: "hidden",
          margin: "10px auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#0095FF",
            padding: "15px",
          }}
        >
          <strong style={{ color: "white", fontSize: "28px" }}>
            Tymnt<span style={{ color: "yellow" }}>.</span>
          </strong>
          <p
            style={{
              fontFamily: "serif",
              fontSize: "12px",
              margin: "-10px 0 0 30px",
              color: "black",
            }}
          >
            <strong>Where Time Works for Everyone</strong>
          </p>
        </div>

        {/* Form */}
        <div className="App">
          <div className="form">
            <h2>Register</h2>
            <span>Name</span>
            <label>
              <input
                type="text"
                name="name"
                value={inputFields.name}
                onChange={(e) =>
                  dispatch(
                    handleUserChange({
                      name: e.target.name,
                      value: e.target.value,
                    }),
                  )
                }
                autoComplete="off"
                placeholder="Enter your name"
              />
            </label>
            <span>Email</span>
            <label>
              <input
                type="email"
                name="email"
                value={inputFields.email}
                onChange={(e) =>
                  dispatch(
                    handleUserChange({
                      name: e.target.name,
                      value: e.target.value,
                    }),
                  )
                }
                autoComplete="off"
                placeholder="Enter your Email"
              />
            </label>
            <span>Image</span>
            <label>
              <input
                type="text"
                name="image"
                value={inputFields.image}
                onChange={(e) =>
                  dispatch(
                    handleUserChange({
                      name: e.target.name,
                      value: e.target.value,
                    }),
                  )
                }
                placeholder="Enter Image URL"
                autoComplete="off"
              />
            </label>
            <span>Mobile number</span>
            <label>
              <input
                type="number"
                name="mobile"
                value={inputFields.mobile}
                onChange={(e) =>
                  dispatch(
                    handleUserChange({
                      name: e.target.name,
                      value: e.target.value,
                    }),
                  )
                }
                autoComplete="off"
                placeholder="Enter your mobile number"
              />
            </label>
            <span>Password</span>
            <label>
              <input
                type="password"
                name="password"
                value={inputFields.password}
                onChange={(e) =>
                  dispatch(
                    handleUserChange({
                      name: e.target.name,
                      value: e.target.value,
                    }),
                  )
                }
                autoComplete="off"
                placeholder="Enter your password"
              />
            </label>
            <span>Confirm Password</span>
            <label>
              <input
                type="password"
                name="confirmPassword"
                value={inputFields.confirmPassword}
                onChange={(e) =>
                  dispatch(
                    handleUserChange({
                      name: e.target.name,
                      value: e.target.value,
                    }),
                  )
                }
                autoComplete="off"
                placeholder="Confirm your password"
              />
            </label>
          </div>
          <ul className="validationlist">
            <li className={validateInput.uppercase ? "green" : "red"}>
              Atleast one uppercase letter
            </li>
            <li className={validateInput.lowercase ? "green" : "red"}>
              Atleast one lowercase
            </li>
            <li className={validateInput.digit ? "green" : "red"}>
              Atleast one digit
            </li>
            <li className={validateInput.specialchar ? "green" : "red"}>
              Atleast one special charactor (e.g- !@#$&*?)
            </li>
            <li className={validateInput.minlength ? "green" : "red"}>
              Minimum length 8 charactor
            </li>
            <li className={validateInput.passwormatch ? "green" : "red"}>
              Password matched
            </li>
          </ul>
        </div>
        <button type="button" style={primaryBtn} onClick={handleSubmit}>
          Create Account
        </button>

        <div style={{ textAlign: "center", margin: "5px 0" }}>
          ------- Already have an Account -------
        </div>

        <button className="btn btn" type="sumbit" style={primaryBtn}>
          <Link to="/Login" style={{ textDecoration: "none", color: "white" }}>
            Sign in
          </Link>
        </button>
      </div>
    </div>
  );
};

const primaryBtn = {
  margin: "5px 5px 5px 5px",
  width: "97%",
  padding: "10px",
  background: "#0095FF",
  color: "white",
  border: "1px solid black",
  borderRadius: "4px",
  fontSize: "18px",
  cursor: "pointer",
  marginTop: "5px",
};

export default Register;
