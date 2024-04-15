import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'; 
import Home from './Home';
import Login from './Authentication/Login';
import Signup from './Authentication/Signup';
import CourseListing from './CourseListing';

const Allroutes = () => {
  return (

      <div>
<Routes>
          <Route path="/home" element={<Home/>} /> 
          <Route path="/login" element={<Login/>} /> 
          <Route path="/" element={<Signup/>} /> 
          <Route path="/courses" element={<CourseListing/>} /> 
          </Routes>   
      </div>

  );
}

export default Allroutes;
