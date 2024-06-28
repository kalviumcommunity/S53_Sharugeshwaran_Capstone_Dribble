import React, { useEffect, useState } from 'react';
import Nav from '../Nav';
import CourseCard from './CourseCard';
import axios from 'axios';
import loader from '../../assets/loader.gif'; // Adjust the path as necessary

const CourseListing = () => {
    const [courses, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://s53-sharugeshwaran-capstone-dribble.onrender.com/courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredCourses = courses.filter(course =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {/* <Nav/> */}
            <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "3vh 0", alignItems: "center", paddingTop: "10vh", height: courses.length > 0 ? "auto" : "100vh"}}>
                <div style={{display: "flex", width: '100%', justifyContent: "space-around", alignItems: "center"}}>
                    <div>
                        <div style={{fontSize: "4rem", color: "rgb(202, 69, 65)", fontWeight: "700", lineHeight: "75px", fontFamily: "Inter"}}>
                            Training
                            <br /><span style={{color: "rgb(62, 62, 62)"}}>Courses</span>
                        </div>
                        <div style={{fontSize: "15px", marginTop: "2vh", fontFamily: "'Inter',sans-serif"}}>
                            ⚡{filteredCourses.length} courses
                        </div>
                        <div style={{fontSize: "15px", marginTop: "2vh", fontFamily:"'Inter',sans-serif", color: "gray"}}>
                            These courses are catered to the latest trends in football. <br /> Watch, learn, and perform to complete a specific skill.
                        </div>
                    </div>
                    <div>
                        <input 
                            type="text" 
                            style={{height: "8vh", width: "40vw", borderRadius: "20px", padding: "4%", outline: "none", boxShadow: "2px 2px 22px 0px gray"}} 
                            placeholder='Search courses here'
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", padding: "3vh 0", alignItems: "center", marginTop: "10vh", width: "85%", justifyItems: "center", rowGap: "8vh"}}>
                    {
                        filteredCourses.map((course, i) => (
                            <div key={i}>
                                <CourseCard data={course} />
                            </div>
                        ))
                    }
                </div>
                {loading && (
                    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img src={loader} alt="Loading..." style={{ width: "100px" }} />
                    </div>
                )}
            </div>
        </>
    );
}

export default CourseListing;
