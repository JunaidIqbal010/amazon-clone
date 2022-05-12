import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { saveUserDetails } from '../../LocalStorage'
import { useStateValue } from '../../StateProvider'
import axios from "axios"
import './Login.css'

function Login() {
  const navigate = useNavigate();
  const [{}, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const signIn = e => {
    e.preventDefault();
    axios.post('/api/v1/login', {
      email: email,
      password: password
    })
    .then(function (response) {
      saveUserDetails(response.data);
      dispatch({
        type: "SET_USER",
        user: response.data
      })
      navigate("/")
    })
    .catch(function (error) {
      alert("Invalid username or password.")
    });
  }
  return (
    <div className="login">
      <Link to="/">
        <img className="login__logo" src="/assets/amazon__login.png" alt=""/>
      </Link>
      <div className="login__container">
        <h1>Sign In</h1>
        <form>
          <h5>E-mail</h5>
          <input type="text" required value={email} onChange={e => setEmail(e.target.value)}/>
          <h5>Password</h5>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
          <button type="submit" onClick={signIn} className="login__signInButton">Sign in</button>
        </form>
        <p>By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
        <Link to="/sign-up" >
          <button className="login__registerButton">Create your amazon account</button>
        </Link>
      </div>

    </div>
  )
}

export default Login