import { useContext } from "react"
import { UserContext } from "../../context/userContext"

const Dashboard = () => {
    const {user} = useContext(UserContext)
  return (
    <div>
        <h3 className="dash">Dashboard</h3>
        {!!user && (<h1>Hi <span className="user">{user.name}</span> ! </h1>)}
    </div>
  )
}

export default Dashboard