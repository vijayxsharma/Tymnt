import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../Utility/AuthSlice";

const Navbar = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {isAuthenticated, user} = useSelector((state)=>state.AuthSlice);

  const handleLogout = async () =>{
    await dispatch(logoutUser());
    navigate("/Login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <strong>Tymnt<b style={{color:"yellow"}}>.</b></strong>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/Register">
                  Join Tymnt
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Hirirng Buddy
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Time Offering Buddy
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  TimeMap
                </Link>
              </li>
              
              {/* AdminLogin */}
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/adminLogin">
                  Admin Login
                </Link>
              </li>
               
                {/* SHOW USER NAME */}
              {isAuthenticated && (
              <li className="nav-item text-white ms-3">
                Hi, <strong>{user?.name}</strong>
              </li>
            )}
        
             {/* Login/Logout Toggle */}
            {!isAuthenticated ? (
              <li className="nav-item">
                <Link className="nav-link active" to="/Login">
                  Login
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-white"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
