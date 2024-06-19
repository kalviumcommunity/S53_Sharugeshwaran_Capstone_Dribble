import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Certificate from "./Certificate";
// import { toPng } from 'html-to-image';

const AdminHome = () => {
    const [assignments, setAssignments] = useState([]);
    const [showCertificate, setShowCertificate] = useState(false);
    const certificateRef = useRef();
    const navigate = useNavigate();
    const date = new Date()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users/submitted-assignments');
                setAssignments(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const navi = (assignment) => {
        navigate("/courseCertificate", { state: {
            courseName: assignment.courseName,
            name: assignment.userName
        }});
    }

    const handleResult = async (assignment, result) => {
        try {
            const response = await axios.post('http://localhost:3000/users/assignment-result', {
                courseName: assignment.courseName,
                name: assignment.userName,
                result: result,
                date : date
            });

           

            console.log(response.data);

            // Remove the assignment from the state after updating
            setAssignments(prevAssignments =>
                prevAssignments.filter(a => a.courseName !== assignment.courseName || a.userName !== assignment.userName)
            );
        } catch (error) {
            console.error('Error updating assignment result:', error);
        }
    }

    // const generateAndUploadCertificate = async (course, name) => {
    //     try {
    //         // Ensure Certificate component is rendered before capturing it
    //         setShowCertificate(true);

    //         // Wait for Certificate component to render
    //         await new Promise(resolve => setTimeout(resolve, 100)); // Adjust delay if necessary

    //         // Generate image from HTML
    //         const dataUrl = await toPng(certificateRef.current);
    //         const blob = await (await fetch(dataUrl)).blob();

    //         // Create FormData and append the blob
    //         const formData = new FormData();
    //         formData.append('file', blob);
    //         formData.append('courseName', course);
    //         formData.append('name', name);

    //         // Make the API request to upload the file
    //         const response = await axios.post('http://localhost:3000/upload', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });

    //         console.log('File uploaded successfully:', response.data);
    //     } catch (error) {
    //         console.error('Error generating and uploading certificate:', error);
    //     } finally {
    //         // Reset showCertificate state after upload (optional)
    //         setShowCertificate(false);
    //     }
    // }

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Submitted Assignments</h1>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {assignments.map((assignment, index) => (
                    <div key={index} style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
                        <li>
                            <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>User Name: {assignment.userName}</p>
                            <p style={{ marginBottom: '5px' }}>Course Name: {assignment.courseName}</p>
                            <p style={{ marginBottom: '10px', color: "blue" }}><a href={assignment.assignmentLink} target="_blank" rel="noopener noreferrer">View Assignment</a></p>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <button
                                    style={{ marginRight: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}
                                    onClick={() => handleResult(assignment, 'approved')}
                                >
                                    Approve
                                </button>
                                <button
                                    style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}
                                    onClick={() => handleResult(assignment, 'rejected')}
                                >
                                    Reject
                                </button>
                            </div>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default AdminHome;
