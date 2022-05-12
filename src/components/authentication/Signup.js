import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { saveUserDetails } from '../../LocalStorage'

import { useStateValue } from '../../StateProvider'
import axios from "axios"
import './Signup.css'

function Signup() {
  const navigate = useNavigate();
  const [{}, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const[username, setUsername] = useState("")
  const signUp = e => {
    e.preventDefault();
    axios.post('/api/v1/sign-up', {
      email: email,
      password: password,
      username: username
    })
    .then(function (response) {
      dispatch({
        type: "SET_USER",
        user: response.data
      })
    saveUserDetails(response.data);
      navigate("/")
    })
    .catch(function (error) {
      alert(error.message)
    });
  }
  return (
    <div className="signup">
      <Link to="/">
        <img className="signup__logo" src="/assets/amazon__login.png" alt=""/>
      </Link>
      <div className="login__container">
        <h1>Create account</h1>
        <form>
          <h5>Username</h5>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
          <h5>E-mail</h5>
          <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
          <h5>Password</h5>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
          <p>By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
          <button type="submit" onClick={signUp} className="login__signInButton">Sign up</button>
        </form>
      </div>
      
    </div>
  )
}

export default Signup