import { useContext } from "react"
import { UserContext } from "../../context/userContext"
import { useNavigate } from "react-router-dom"
import "./styles/dashbord.css"

const Home = () => {
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    function logoutfn(){
      localStorage.clear()
      navigate("/login")
    }
  return (
    <div>
        <div className="dash">Welcome to Home...{!!user && (<span className="user">{user.name}!</span> )}</div>
        <div>
          <button onClick={logoutfn}>Log out</button>
        </div>
    </div>
  )
}

export default Home