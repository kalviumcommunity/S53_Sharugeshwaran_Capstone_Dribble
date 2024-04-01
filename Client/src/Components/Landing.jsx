import React from 'react'
import Video from "../assets/Videobg.mp4"
const Landing = () => {
  return (
    <div>
        <div style={{width: "100%",height: "100vh"}}>
        <div style={{backgroundColor: "rgba(0,0,0,.5)",height: "100%",width: "100%",position: "absolute",top:"0",left:"0"}}></div>
        <video className='video' style={{height: "100%",width: "100%", margin: 0,padding: "0", objectFit: "cover"}} autoPlay="autoplay" muted loop>
    <source src={Video} type="video/mp4" />
    Your browser does not support the video tag.
</video>
    <div style={{zIndex: "1",position: 'absolute',height: "100%",width: "100%",top: "0",display: "flex",alignItems: "center",left: 0}}>
        <h1 style={{fontSize: '200px', fontStyle: 'italic', fontWeight: '900', lineHeight: '50.4px',color: "white", marginLeft: "7%",marginTop: "20%"}} className='title'><span style={{letterSpacing: "-16px"}}>DRIB</span><span style={{color: "greenyellow"}}>BLE</span><br /><span style={{fontSize: "40px",color: "gray",fontWeight: "300"}}>Strive, Thrive, Football Alive</span>
        </h1>
    </div>
        </div>

    </div>
  )
}

export default Landing