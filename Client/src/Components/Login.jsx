import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import Vector from "../assets/Vector.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const data = {
      email,
      password
    };

    try {
      const response = await axios.post("https://s53-sharugeshwaran-capstone-dribble.onrender.com/users/Login", data);
      console.log(response.data);
      console.log("Found") // You can handle the response data as needed
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "rgb(217, 217, 217)", height: "100vh", width: "100vw", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ backgroundColor: "white", height: "80%", width: "60%", marginTop: "5%", borderRadius: "60px", display: "flex", textAlign: "left", fontFamily: "Inter,sansSerif" }}>
        <div style={{ backgroundColor: "rgb(202, 69, 65)", width: "50%", height: "100%", borderTopLeftRadius: "60px", borderBottomLeftRadius: "60px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={Vector} alt="" style={{ height: "50vh", marginTop: "9%" }} />
        </div>
        <div style={{
          marginLeft: "5%",
          marginTop: "5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          textAlign: "left",
          height: "100%"
        }}>
          <div>
            <h1 style={{ fontSize: "35px" }}>Welcome</h1>
            <p>Login to Dribble to continue</p>
          </div>
          <div className='Login'>
            <form onSubmit={handleSubmit}>
            <input type="email" placeholder='Enter E-Mail here' style={{ marginBottom: "2vh", height: "5vh", width: "20vw", borderRadius: "8px", outline: "none",border: "2px solid lightgray",paddingLeft: "1vw" }} value={email} onChange={handleEmailChange} /> <br />
              <input type="password" placeholder='Enter password here' style={{ marginBottom: "2vh", height: "5vh", width: "20vw", borderRadius: "8px", outline: "none",border: "2px solid lightgray",paddingLeft: "1vw" }} value={password} onChange={handlePasswordChange} />
              <p style={{ color: "blue" }}></p>
              <button type="submit" style={{ backgroundColor: "blue", color: "white", fontFamily: "Inter,sansserif", border: "none", height: "5vh", borderRadius: "10px",width: "20vw",marginTop: "5vh"}}>Login</button>
            </form>
          </div>
          <p>Don't have an account? <button style={{ backgroundColor: "white", border: "none", color: "blue", fontFamily: "Inter,sansserif" }}>Sign Up</button></p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <div style={{ width: "8vw", backgroundColor: "black", height: "1px" }}></div>
            <div>or</div>
            <div style={{ width: "8vw", backgroundColor: "black", height: "1px" }}></div>
          </div>
          <div style={{ height: "6vh", border: "2px solid gray", marginBottom: "7vh", display: "flex", justifyContent: "space-around", alignItems: "center", borderRadius: "15px" }}>
            <img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/google_logo_icon_169090.png" alt="" style={{ height: "30px" }} />
            <p>Continue with Google</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
