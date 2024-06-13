import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CourseVideo = () => {
    const location = useLocation();
    const data = location.state;
    const userdata = localStorage.getItem("userData");
    const user = JSON.parse(userdata)
    console.log(user)
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            setUploadStatus('Please select a video file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('video', selectedFile);
        formData.append('name',user.name)
        formData.append('courseName',data.name)
        console.log(formData)

        try {
            const response = await axios.post('http://localhost:3000/courses/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data)
            setUploadStatus(`Upload successful: ${response.data}`);
        } catch (error) {
            console.error('Error uploading video:', error);
            console.log(formData)
            setUploadStatus('Failed to upload video.');
        }
    };

    const handleClick = () => {
        navigate("/courselesson", { state: data });
    };

    const handleDragEnd = () => {
        // Handle drag end
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className='part2'>
                <div style={{ display: "flex", width: '100%', justifyContent: "space-around", marginTop: "10vh" }}>
                    <div>
                        <div style={{ fontSize: "2.05rem", color: "rgb(62, 62, 62)", fontWeight: "700", lineHeight: "55px", fontFamily: "Inter", width: "30vw" }}>
                            {data.name}
                        </div>
                        <div style={{ fontSize: "15px", marginTop: "2vh", fontFamily: "Inter,sans-serif" }}>
                            ⚡{data.modules.length} lessons
                        </div>
                        <div style={{ fontSize: "15px", marginTop: "2vh", fontFamily: "'Inter',sans-serif", color: "gray" }}>
                            This course is catered to the latest trends in football. <br /> Watch, learn, and perform to complete a specific skill.
                        </div>
                    </div>
                    <div>
                        <input type="text" name="" id="" style={{ height: "8vh", width: "40vw", borderRadius: "20px", padding: "4%", outline: "none", boxShadow: "2px 2px 22px 0px gray" }} placeholder='Search courses here' />
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <div className='modulesListing' style={{ padding: "20vh 0", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gridColumnGap: "12vw", justifyContent: "space-around", gridRowGap: "7vh" }}>
                        {data.modules.map((e, i) => {
                            return (
                                <motion.div key={i} style={{
                                    height: "35vh", backgroundColor: "white", width: "20vw", display: "flex", alignItems: "center", marginBottom: "5vh", justifyContent: "center", textAlign: "center", padding: "3%", color: "white", borderRadius: "20px",
                                    background: "linear-gradient(135deg, #C17457, #EB25D2)", boxShadow: "2px 2px 22px 0px gray"
                                }} onClick={() => {
                                    navigate("/courselesson", { state: data.modules[i] });
                                }} drag dragSnapToOrigin={0.5} onDragEnd={handleDragEnd}>
                                    <p style={{ fontSize: "1.2rem", fontWeight: "600", fontFamily: "'Inter',sans-serif" }}>{e.name}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                    <div className='Assignment' style={{ height: "70vh", backgroundColor: "white", width: "50vw", border: "3px solid", borderRadius: "15px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <input type="file" name="video" accept="video/*" onChange={handleFileChange} style={{ marginBottom: "20px" }} />
                            <button type="submit" style={{ padding: "10px 20px", borderRadius: "5px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}>
                                Upload Video
                            </button>
                            {uploadStatus && <p style={{ marginTop: "20px" }}>{uploadStatus}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseVideo;
