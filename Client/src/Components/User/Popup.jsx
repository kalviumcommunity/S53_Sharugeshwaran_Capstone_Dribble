import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';


const Popup = ({}) => {
    const navigate = useNavigate()
    const navi = () => {
        navigate("/userdashboard",{state:updatedUserData.userName})
    }
    const [userData, setUserData] = useState(null);
    const [updatedUserData, setUpdatedUserData] = useState({
        profilePhoto: '',
        userName: '',
        city: '',
        bio: '',
        email: ''
    });
    const location = useLocation();
    const name = location.state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("https://backend-cyan-two.vercel.app/users/profile", { name });
                const userData = response.data.user;
                setUserData(userData);
                setUpdatedUserData({
                    profilePhoto: userData.profilePhoto,
                    userName: userData.name,
                    city: userData.city,
                    bio: userData.bio,
                    email: userData.email
                });
                // navi()
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    console.log(userData)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUserData({ ...updatedUserData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put("https://backend-cyan-two.vercel.app/users/profile/update", updatedUserData);
            // onClose(); // Close the popup
            console.log("User updated successfully");
            navi()
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="popup" style={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div className="popup-content" style={{height: "80%",width: "40%",boxShadow: "2px 2px 22px 0px gray",display: "flex", alignItems: "center",flexDirection: "column",borderRadius: "25px",background: "linear-gradient(135deg, #C17457, #EB25D2)"} }>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column",justifyContent: "space-around",height: "70%",marginTop: "10vh" }}>
                    <div>
                    <label>
                        User Name:
                    </label><br />
                        <input type="text" name="userName" value={updatedUserData.userName} onChange={handleInputChange} style={{width: "25vw",height: "5vh",borderRadius: "10px",padding: "4%",marginTop: "1vh"}}/>
                    </div>
                    <div>

                    <label>
                        City:
                    </label><br />
                        <input type="text" name="city" value={updatedUserData.city} onChange={handleInputChange} style={{width: "25vw",height: "5vh",borderRadius: "10px",padding: "4%",marginTop: "1vh"}}/>
                    </div>
                    <div>
                    <label>
                        Bio:
                    </label><br />
                        <textarea name="bio" value={updatedUserData.bio} onChange={handleInputChange} style={{width: "25vw",borderRadius: "10px",padding: "4%",marginTop: "1vh"}}></textarea>
                    </div>
                    <div>
                    <label>
                        Profile Photo:
                    </label><br />
                        <input type="text" name="profilePhoto" value={updatedUserData.profilePhoto} onChange={handleInputChange} style={{width: "25vw",height: "5vh",borderRadius: "10px",padding: "2%",marginTop: "1vh"}}/>
                    </div>
                    <button type="submit" style={{background: "black",color: "white",width: "6vw",marginLeft: "9vw",marginTop: "4vh",height: "5vh",borderRadius: "7px"}}>Update</button>
                </form>
            </div>
        </div>
    );
};

export default Popup;
