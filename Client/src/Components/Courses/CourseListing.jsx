import React, { useEffect,useState } from 'react'
import Nav from '../Nav'
import CourseCard from './CourseCard';
const CourseListing = () => {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://s53-sharugeshwaran-capstone-dribble.onrender.com/courses');
                const data = await response.json();
                setCourses(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
      }, [])

  return (
    <>
        <Nav/>
        <div style={{display: "flex",flexDirection: "column", justifyContent: "space-around", padding: "3vh 0", alignItems: "center",marginTop: "10vh"}}>
            <div style={{display: "flex",width: '100%',justifyContent: "space-around"}}>
                <div>

                <div style={{fontSize: "4rem",color: "rgb(202, 69, 65)",fontWeight: "700",lineHeight: "75px",fontFamily: "Inter"}}>
                    Training
                    <br /><span style={{color: "rgb(62, 62, 62)"}}>Courses</span>
                </div>
                <div style={{fontSize: "15px",marginTop: "2vh"}} jni>
                    ⚡(Number of courses)
                </div>
            <div style={{fontSize: "15px",marginTop: "2vh",fontFamily:"'Inter',sansserif",color: "gray"}}>
            This courses are catered to the latest trends in the football. <br /> Watch, learn and perform to complete a specific skill. 
            </div>
            </div>
            <div>
                <input type="text" name="" id="" style={{height: "8vh",width: "40vw",borderRadius: "20px",padding: "4%",outline: "none",boxShadow: "2px 2px 22px 0px gray"}} placeholder='Search courses here'/>
            </div>
            </div>
        <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", padding: "3vh 0", alignItems: "center",marginTop: "10vh", width: "85%",justifyItems: "center",rowGap: "8vh",}}>
            {
                courses.map((e,i) => {
                    return(
                        <div key = {i}>
                            <CourseCard data = {e}/>
                        </div>
                    )
                })
            }
        </div>
        </div>
    </>
  )
}

export default CourseListing