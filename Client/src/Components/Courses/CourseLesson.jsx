import React from 'react'
import { useLocation } from 'react-router-dom'
import Nav from '../Nav'
const CourseLesson = () => {

    const location = useLocation()
    const data = location.state
    console.log(data);
    const lessons = data.videos
  return (
    <div>
        <Nav/>
        <div>
            <p style={{textAlign: "center",marginTop: "13vh",fontSize: "3rem"}}>{data.name}</p>
            <div className='videos' style={{marginLeft: "8vw"}}>
                {lessons.map((e,i) => {
                    return(
                        <div key={i}>
                            <p style={{marginTop: "10vh"}}>{lessons[i].name}</p>
                            {/* <video src= {lessons[i].url}></video> */}
                            <iframe src={lessons[i].url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style={{height: "35vh",width: "30vw", margin: "5vh 0"}}></iframe>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default CourseLesson