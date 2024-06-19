import React from 'react'
import { useNavigate } from 'react-router-dom'

const Nav = ({profile,name}) => {
  const navigate = useNavigate();
  console.log(profile)

  const gotoDashboard = () => {
    navigate("/userdashboard", { state: name });
  }
  const gotoAcademies = () => {
    navigate("/academies")
  }

  return (
    <div>
      <nav style={{display: "flex", justifyContent: "space-around", padding: "3vh 0", alignItems: "center"}}>
        <button style={{color: "rgb(202, 69, 65)", fontSize: "30px", fontFamily: "Inter, sans-serif", fontWeight: "600"}} onClick={() => navigate("/home")}>
          Drib<span style={{color: "rgb(62, 62, 62)"}}>ble</span>
        </button>
        <div style={{display: "flex", justifyContent: "space-evenly",width: "30vw",fontSize: "30px"}}>
          <button className='nav-buttons' style={{backgroundColor: "transparent", border: "none", fontFamily: "Inter, sans-serif",fontSize: "16px",fontWeight: "500"}} onClick={gotoAcademies}>Academies</button>
        
          <button className='nav-buttons' style={{backgroundColor: "transparent", border: "none", fontFamily: "Inter, sans-serif",fontSize: "16px",fontWeight: "500"}} onClick={() => navigate("/courses")}>Courses</button>
          <button className='nav-buttons' style={{backgroundColor: "transparent", border: "none", fontFamily: "Inter, sans-serif",fontSize: "16px",fontWeight: "500"}}>About</button>
        </div>
        <div style={{width: "13vw", display: "flex",alignItems: "center"}} onClick={gotoDashboard}>
          <img src={profile ? profile : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"} alt="" style={{borderRadius:"50%",height: "7vh",fontFamily: "'Inter',sans-serif"}}/>
          <p style={{marginLeft: "1vw",fontWeight: "500"}}>{name}</p>
        </div>
      </nav>
    </div>
  )
}

export default Nav
