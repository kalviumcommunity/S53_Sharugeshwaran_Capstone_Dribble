import React from 'react'
// import Landing from './Components/Landing'
// import Drop from './Components/Courses/Drop'
import UserDashboard from './Components/User/UserDashboard'
import Home from './Components/Home'
import Signup from './Components/Authentication/Signup'
import Login from './Components/Authentication/Login'
import "./App.css"
import "./index.css"
import Allroutes from './Components/Allroutes'
const App = () => {
  return (
    <div style={{backgroundColor: "whitesmoke"}}>
        {/* <Landing/> */}
         {/* <Home/> */}
         {/* <Login/> */}
         {/* <Signup/> */}
         <Allroutes/>
         {/* <UserDashboard/> */}
         {/* <Drop/> */}
    </div>
  )
}

export default App