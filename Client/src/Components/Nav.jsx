import React from 'react'
import { useNavigate } from 'react-router-dom'

const Nav = ({profile,name}) => {
  const navigate = useNavigate();

  const gotoDashboard = () => {
    navigate("/userdashboard", { state: name });
  }

  return (
    <div>
      <nav style={{display: "flex", justifyContent: "space-around", padding: "3vh 0", alignItems: "center"}}>
        <button style={{color: "rgb(202, 69, 65)", fontSize: "30px", fontFamily: "Inter, sans-serif", fontWeight: "600"}} onClick={() => navigate("/home")}>
          Drib<span style={{color: "rgb(62, 62, 62)"}}>ble</span>
        </button>
        <div style={{display: "flex", justifyContent: "space-evenly",width: "30vw",fontSize: "30px"}}>
          <button className='nav-buttons' style={{backgroundColor: "transparent", border: "none", fontFamily: "Inter, sans-serif",fontSize: "16px",fontWeight: "500"}}>Academies</button>
        
          <button className='nav-buttons' style={{backgroundColor: "transparent", border: "none", fontFamily: "Inter, sans-serif",fontSize: "16px",fontWeight: "500"}} onClick={() => navigate("/courses")}>Courses</button>
          <button className='nav-buttons' style={{backgroundColor: "transparent", border: "none", fontFamily: "Inter, sans-serif",fontSize: "16px",fontWeight: "500"}}>About</button>
        </div>
        <div style={{width: "13vw", display: "flex", justifyContent: "space-around",alignItems: "center"}} onClick={gotoDashboard}>
          <img src={profile} alt="" style={{borderRadius:"50%",height: "7vh",fontFamily: "'Inter',sans-serif"}}/>
          <p>{name}</p>
        </div>
      </nav>
    </div>
  )
}

export default Nav
