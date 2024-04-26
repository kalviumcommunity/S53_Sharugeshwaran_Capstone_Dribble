import React from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../Nav';
import AccordionItem from './AccordionItem'; // Import the AccordionItem component

const CourseLesson = () => {
    const location = useLocation();
    const data = location.state;
    const lessons = data.videos;

    return (
        <div>
            <Nav />
            <div style={{ display: "flex", width: '100%', justifyContent: "space-around", marginTop: "10vh" }}>
                <div>
                    <div style={{ fontSize: "2.05rem", color: "rgb(62, 62, 62)", fontWeight: "700", lineHeight: "55px", fontFamily: "Inter", width: "30vw" }}>
                        {data.name}
                    </div>
                    <div style={{ fontSize: "15px", marginTop: "2vh" }} jni>
                        ⚡(Number of courses)
                    </div>
                    <div style={{ fontSize: "15px", marginTop: "2vh", fontFamily: "'Inter',sansserif", color: "gray" }}>
                        This courses are catered to the latest trends in the football. <br /> Watch, learn and perform to complete a specific skill.
                    </div>
                </div>
                <div>
                    <input type="text" name="" id="" style={{ height: "8vh", width: "40vw", borderRadius: "20px", padding: "4%", outline: "none", boxShadow: "2px 2px 22px 0px gray" }} placeholder='Search courses here' />
                </div>
            </div>
            <div style={{padding: "15vh 0"}}>
                <div className='videos' style={{ marginLeft: "8vw" }}>
                    {/* Map each lesson to an AccordionItem */}
                    {lessons.map((lesson, index) => (
                        <AccordionItem
                            key={index}
                            index={index}
                            lesson={lesson}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourseLesson;
