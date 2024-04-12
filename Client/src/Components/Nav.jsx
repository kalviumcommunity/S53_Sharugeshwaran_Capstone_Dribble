import React from 'react'
import { Link } from 'react-router-dom'
const Nav = () => {
  return (
    <div>
        <nav style={{display: "flex", justifyContent: "space-around", padding: "3vh 0", alignItems: "center"}}>
          <div style={{color: "rgb(202, 69, 65)", fontSize: "30px", fontFamily: "Inter, sans-serif", fontWeight: "600"}}>
            Drib<span style={{color: "rgb(62, 62, 62)"}}>ble</span>
          </div>
          <div style={{display: "flex", justifyContent: "space-evenly",width: "30vw",fontSize: "30px"}}>
            <button className='nav-buttons' style={{backgroundColor: "transparent", border: "none", fontFamily: "Inter, sans-serif",fontSize: "16px",fontWeight: "500"}}>Academies</button>
            <Link to={"/courses"}>
            <button className='nav-buttons' style={{backgroundColor: "transparent", border: "none", fontFamily: "Inter, sans-serif",fontSize: "16px",fontWeight: "500"}}>Courses</button>
            </Link>
            <button className='nav-buttons' style={{backgroundColor: "transparent", border: "none", fontFamily: "Inter, sans-serif",fontSize: "16px",fontWeight: "500"}}>About</button>
          </div>
          <div style={{width: "15vw", display: "flex", justifyContent: "space-around"}}>
            <button className='nav-buttons' style={{backgroundColor: "rgb(202, 69, 65)",height: "5vh",width: "6vw",borderRadius: "15px", border: "none", fontFamily: "Inter, sans-serif",fontSize: "16px",fontWeight: "500"}}>Sign Up</button>
            <button className='nav-buttons' style={{backgroundColor: "transparent", border: "none", fontFamily: "Inter, sans-serif",fontSize: "16px",fontWeight: "500"}}>Log In</button>
          </div>
        </nav>
    </div>
  )
}

export default Nav