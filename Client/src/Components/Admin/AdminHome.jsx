import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
    const [assignments, setAssignments] = useState([]);
    const navigate = useNavigate();
    const date = new Date();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://s53-sharugeshwaran-capstone-dribble.onrender.com/users/submitted-assignments');
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
            const response = await axios.post('https://s53-sharugeshwaran-capstone-dribble.onrender.com/users/assignment-result', {
                courseName: assignment.courseName,
                name: assignment.userName,
                result: result,
                date: date
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

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px' }}>Welcome Admin</h1>
            <p style={{ textAlign: 'center', marginBottom: '20px', fontSize: '18px' }}>
                Manage submitted assignments here. Review and approve/reject assignments for courses.
            </p>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '20px' }}>Submitted Assignments</h2>
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
