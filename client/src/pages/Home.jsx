import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import "./styles/home.css";

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  function logoutfn() {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <div>
      <div className="dash">
        Welcome to Home...{!!user && <span className="user">{user.name}!</span>}
      </div>
      <button className="btn" onClick={logoutfn}>
        Log out
      </button>
    </div>
  );
};

export default Home;
