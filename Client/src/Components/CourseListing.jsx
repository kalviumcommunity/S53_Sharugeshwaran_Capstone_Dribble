import React from 'react'
import Nav from './Nav'
const CourseListing = () => {
  return (
    <>
        <Nav/>
        <div style={{display: "flex", justifyContent: "space-around", padding: "3vh 0", alignItems: "center",marginTop: "10vh"}}>
            <div >
                <div style={{fontSize: "50px",color: "rgb(202, 69, 65)",fontWeight: "700",lineHeight: "55px",fontFamily: "Inter"}}>
                    Training
                    <br /><span style={{color: "rgb(62, 62, 62)"}}>Courses</span>
                </div>
                <div style={{fontSize: "15px",marginTop: "2vh"}} jni>
                    ⚡(Number of courses)
                </div>
            <div style={{fontSize: "15px",marginTop: "2vh"}}>
            This courses are catered to the latest trends in the football. <br /> Watch, learn and perform to complete a specific skill. 
            </div>
            </div>
            <div>
                <input type="text" name="" id="" style={{backgroundColor: "rgb(217, 217, 217)",height: "8vh",width: "40vw",borderRadius: "20px",padding: "4%",outline: "none",border: "4px solid rgb(202, 69, 65) "}} placeholder='Search courses here'/>
            </div>
        </div>
        <div>
            
        </div>
    </>
  )
}

export default CourseListing