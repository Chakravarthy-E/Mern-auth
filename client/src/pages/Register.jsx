import React from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles/register.css"

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const { data } = await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Registration successful");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <h3>Register</h3>
      <form onSubmit={registerUser} className="form-container">
        <label>Name</label>
        <input
          type="text"
          placeholder="enter your name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="enter your email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="enter your password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button type="submit">submit</button>

        <p className="para">Already have an account please <Link to="/login" style={{color:"blue"}}>Login</Link></p>

      </form>
    </div>
  );
};

export default Register;
