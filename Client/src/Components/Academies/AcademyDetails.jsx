import React from "react";
import { useLocation } from "react-router-dom";

const AcademyDetails = () => {
    const location = useLocation();
    const data = location.state;
    console.log(data)
    // Add a check to ensure 'data' exists
    if (!data) {
        return <div>No data available</div>;
    }
console.log(data.State);
    return (
        <div style={{color: "black",display: "flex",justifyContent: "center",alignItems: "center",height: "100vh",fontFamily: "'Inter',sans-serif",padding: ""}}>
            <div style={{background: "linear-gradient(135deg, #C17457, #EB25D2)",display: "flex",alignItems: "center",flexDirection: "column",padding: "3%",borderRadius: "30px",width: "60vw"}}>
                <div style={{marginBottom: "",textAlign: "center",display: "flex",height: "60%",alignItems: "center",flexDirection: "column"}}>
                <img src={data.imageURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo1BAt0C_lwqCOpENx_78Gk2nicY0Nq1KVPQ&s"} alt="Academy" style={{borderRadius:"20%",height: "20vh",border: "2px solid  black",marginBottom: "3vh"}}/>
                <p style={{fontSize: "1.5rem",color: "white"}}>{data.name}</p><a href={data.social} style={{color: "blue"}}>visit</a>
                </div>
                <div style={{padding: "4% 4%",width:"50vw",height:"",backgroundColor: "rgb(235, 233, 233)",marginTop: '5vh',borderRadius: "10px"}}>
                <p style={{fontSize: "1.1rem",marginBottom: "2vh"}}>{data.description}</p>
                <p style={{fontSize: "1.1rem",marginBottom: "2vh"}}>Contact - {data.contact}</p>
                <p style={{fontSize: "1.1rem"}}>{data.location}, {data.State}.</p> {/* Fixed typo here */}
                </div>
            </div>
        </div>
    );
};

export default AcademyDetails;
