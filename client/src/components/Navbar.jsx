import {Link} from "react-router-dom"
import "./navbar.css"


const Navbar = () => {
  return (
    <nav className="navbar">
        <Link className="link" to='/'>Home</Link>
        <Link className="link" to='/login'>Login</Link>
        <Link className="link" to='/register'>Register</Link>
    </nav>
  )
}

export default Navbar