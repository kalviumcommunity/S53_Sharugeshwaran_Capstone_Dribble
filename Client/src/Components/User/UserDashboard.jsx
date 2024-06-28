import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import profilePic from "../../assets/profile.png"
import deleteIcon from '../../assets/deleteIcon.png';



const UserDashboard = () => {
    const location = useLocation();
    const name = location.state;
    const [userData, setUserData] = useState(null);
    const [email,setEmail] = useState("")
    // const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate() // State for managing popup visibility

   

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("https://s53-sharugeshwaran-capstone-dribble.onrender.com/users/profile", { name });

                setUserData(response.data.user);
                console.log(response.data.user);
                setEmail(response.data.user.email)
                // console.log("hey")
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, []); // Dependency on 'name' to refetch data when 'name' changes

    const deleteProfile = async () => {
        console.log(email)
        try {
            const response = await axios.delete("https://s53-sharugeshwaran-capstone-dribble.onrender.com/users/profileDelete",  email );
            console.log("Profile deleted successfully:", response.data);
            navigate("/")
        } catch (error) {
            console.log("Error deleting profile:", error);
        }
    }
    

    // const email = userData.email
    const navigateFunc = () => {
        navigate("/profileupdate",{state: name})
    }
 

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{height: "100%",width: "100%",display: "flex",justifyContent: "center",alignItems: "center",flexDirection: "column",fontFamily: "Inter"}} className='dash'>
            

            {/* Existing user dashboard content */}
            <div style={{margin: "15vh 0",background: "linear-gradient(135deg, #C17457, #EB25D2)",width: "70vw",display: "flex",alignItems: "center",flexDirection: "column",paddingTop: "7vh",borderRadius: "30px",boxShadow: "2px 2px 22px 0px gray"}}>
                <div style={{display: "flex",marginLeft: "60vw"}}>

            <img src="https://static-00.iconduck.com/assets.00/edit-pencil-icon-2045x2048-iylo4la2.png" alt="" style={{height:"4vh"}} className='edit' onClick={navigateFunc}/>
            <img src={deleteIcon} alt="" style={{height:"4vh",marginLeft: "2vw"}} onClick={deleteProfile}/>
                </div>
                <div style={{display: "flex",justifyContent: "space-between",alignItems: "center",width: "50vw",flexDirection: "column"}}>
                    <div style={{height: "10vh",backgroundColor: "white",width: "100%",borderTopLeftRadius: "15px",borderTopRightRadius:"15px"}}></div>
                    <div style={{height: "24vh",backgroundColor: "rgb(62, 62, 62)",width: "100%",marginTop: "1vh",borderBottomRightRadius: "15px",borderBottomLeftRadius: "15px"}}></div>
                    <div style={{position: "absolute",display: "flex",flexDirection: "column",alignItems: "center",textAlign: "center",color: "white",zIndex: "1",top: "30vh"}}>
                    <img src={!userData.profilePhoto ? profilePic:userData.profilePhoto} alt="" style={{ borderRadius: "50%", height: "15vh" }} />

                        <div>
                            <p style={{fontSize:"1.25rem",marginTop: "2vh"}}>{name}</p>
                            <p style={{color: "gray"}}>{userData.email}</p>
                            <p style={{color: "gray"}}>{userData.city}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{marginTop: "7vh",padding: "6%",marginBottom: "7vh",borderRadius: "15px",width: "50vw"}} className='bio'>
                        <h1 style={{marginBottom: "3vh",fontWeight: "600",fontSize: "1.2rem"}}>Bio</h1>
                        <p>{userData.bio}</p>
                    </div>
                    <div style={{backgroundColor: "rgb(235, 233, 233)",padding: "6%",marginBottom: "7vh",borderRadius: "15px",width: "50vw"}}>
                        <h1 style={{marginBottom: "3vh",fontWeight: "600",fontSize: "1.2rem"}}>Certificates</h1>
                        <div className='certificate-showcase' style={{display: "flex",overflow: "auto"}}>
                            {userData.certificates.map((e,i) => {
                                return(
                                    <a href={e} download key={i}>
                                    <img src={e} alt={`Certificate ${i}`} style={{height: "30vh"}} />
                                </a>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
