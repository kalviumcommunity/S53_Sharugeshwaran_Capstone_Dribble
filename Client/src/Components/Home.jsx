import React from 'react'

const Home = () => {
  return (
    <div>
        <nav style={{display: "flex", flexDirection: "row", justifyContent:"space-around",height: "10vh",alignItems: "center",fontSize: "30px"}}>
            <p><span style={{color: "greenyellow"}}>Drib</span><span color='black'>ble</span></p>
            <div style={{display: "flex",flexDirection: "row",justifyContent:"space-between",width: "35%"}}>
                <button style={{border: "none",fontSize:"16px",backgroundColor: "white"}} className='nav-buttons'>Academies</button>
                <button style={{border: "none",fontSize:"16px",backgroundColor: "white"}} className='nav-buttons'>Courses</button>
                <button style={{border: "none",fontSize:"16px",backgroundColor: "white"}} className='nav-buttons'>Contact</button>
                <button style={{border: "none",fontSize:"16px",backgroundColor: "white"}} className='nav-buttons'>About</button>
            </div>
        </nav>
    </div>
  )
}

export default Home