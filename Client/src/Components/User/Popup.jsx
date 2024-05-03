import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import {useDropzone} from 'react-dropzone'
import { addToCloudinary } from './Cloudinary'


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
    });
    const location = useLocation();
    const onDrop = useCallback(async (acceptedFiles) => {
        try {
            // console.log(acceptedFiles);
            // Filter out any non-file items from acceptedFiles array
            const files = acceptedFiles.filter((file) => file instanceof File);
            // Do something with the files
            // console.log(files);
            // Upload files to Cloudinary and get the link
            const link = await addToCloudinary(files);
            // Update the user data with the email and profile photo link
            setUpdatedUserData({ ...updatedUserData, userEmail: email, profilePhoto: link });
        } catch (error) {
            console.error('Error uploading files to Cloudinary:', error);
        }
    }, []);
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    const email = location.state;
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:3000/users/profile", { email });
                const userData = response.data.user;
                setUserData(userData);
                setUpdatedUserData({
                    profilePhoto: userData.profilePhoto,
                    userName: userData.name,
                    city: userData.city,
                    bio: userData.bio,
                    userEmail: userData.email
                });
                // navi()
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, []);
    
    // console.log(userData)
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUserData({ ...updatedUserData, [name]: value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // setUpdatedUserData({...updatedUserData,[profilePhoto] : link})
            // setUpdatedUserData({ ...updatedUserData, profilePhoto: link });
            await axios.put("http://localhost:3000/users/profile/update", updatedUserData);
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
                    <button type="submit" style={{background: "black",color: "white",width: "6vw",marginLeft: "9vw",marginTop: "4vh",height: "5vh",borderRadius: "7px"}}>Update</button>
                </form>
                    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <button>Upload Picture</button>
      }
    </div>
                
            </div>
        </div>
    );
};

export default Popup;
