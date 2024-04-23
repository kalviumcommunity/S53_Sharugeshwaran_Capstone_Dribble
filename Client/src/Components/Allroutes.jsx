import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'; 
import Home from './Home';
import Login from './Authentication/Login';
import Signup from './Authentication/Signup';
import CourseListing from './Courses/CourseListing';
import CourseVideo from './Courses/CourseVideo';
import CourseLesson from './Courses/CourseLesson';

const Allroutes = () => {
  return (

      <div>
<Routes>
          <Route path="/home" element={<Home/>} /> 
          <Route path="/login" element={<Login/>} /> 
          <Route path="/" element={<Signup/>} /> 
          <Route path="/courses" element={<CourseListing/>} /> 
          <Route path='/courseVideo' element={<CourseVideo/>}/>
          <Route path='/courselesson' element={<CourseLesson/>}/>
          </Routes>   
      </div>

  );
}

export default Allroutes;
