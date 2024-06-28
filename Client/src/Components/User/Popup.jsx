import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

const Popup = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const name = location.state;

    const [userData, setUserData] = useState(null);
    const [updatedUserData, setUpdatedUserData] = useState({
        profilePhoto: '',
        userName: '',
        city: '',
        bio: '',
        email: ''
    });
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("https://s53-sharugeshwaran-capstone-dribble.onrender.com/users/profile", { name });
                const userData = response.data.user;
                setUserData(userData);
                setUpdatedUserData({
                    profilePhoto: userData.profilePhoto,
                    userName: userData.name,
                    city: userData.city,
                    bio: userData.bio,
                    email: userData.email
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [name]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUserData({ ...updatedUserData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);

        const formData = new FormData();
        formData.append('profilePhoto', updatedUserData.profilePhoto);
        formData.append('userName', updatedUserData.userName);
        formData.append('city', updatedUserData.city);
        formData.append('bio', updatedUserData.bio);
        formData.append('email', updatedUserData.email);

        try {
            const response = await axios.put('http://localhost:3000/users/profile/update', formData);
            console.log("User updated successfully", response.data);
            navigate("/userdashboard", { state: updatedUserData.userName });
        } catch (error) {
            console.error('Error updating data:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        console.log(file);

        setUpdatedUserData({ ...updatedUserData, profilePhoto: file });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="popup" style={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="popup-content" style={{ height: "80%", width: "40%", boxShadow: "2px 2px 22px 0px gray", display: "flex", alignItems: "center", flexDirection: "column", borderRadius: "25px", background: "linear-gradient(135deg, #C17457, #EB25D2)" }}>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", height: "70%", marginTop: "10vh" }}>
                    <div>
                        <label>User Name:</label><br />
                        <input type="text" name="userName" value={updatedUserData.userName} onChange={handleInputChange} style={{ width: "25vw", height: "5vh", borderRadius: "10px", padding: "4%", marginTop: "1vh" }} />
                    </div>
                    <div>
                        <label>City:</label><br />
                        <input type="text" name="city" value={updatedUserData.city} onChange={handleInputChange} style={{ width: "25vw", height: "5vh", borderRadius: "10px", padding: "4%", marginTop: "1vh" }} />
                    </div>
                    <div>
                        <label>Bio:</label><br />
                        <textarea name="bio" value={updatedUserData.bio} onChange={handleInputChange} style={{ width: "25vw", borderRadius: "10px", padding: "4%", marginTop: "1vh" }}></textarea>
                    </div>
                    <button type="submit" style={{ background: "black", color: "white", width: "6vw", marginLeft: "9vw", marginTop: "4vh", height: "5vh", borderRadius: "7px" }}>Update</button>
                </form>
                <div {...getRootProps()} style={{ marginTop: "2vh", cursor: "pointer" }}>
                    <input {...getInputProps()} />
                    {
                        isDragActive ? <p>Drop the files here ...</p> : 
                        isUploading ? <p>Uploading...</p> :
                        <button>Upload Picture</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Popup;
