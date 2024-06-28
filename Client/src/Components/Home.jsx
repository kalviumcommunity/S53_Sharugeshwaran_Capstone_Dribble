import React from 'react';
import player from "../assets/player.png";
import {motion,useViewportScroll,useTransform} from "framer-motion"
import { useState,useEffect } from 'react';
import { json, useLocation, useNavigate } from 'react-router-dom';
import academies from "../assets/academies.png"
import courses from "../assets/courses.png"
import Nav from './Nav';

const Home = () => {
  const [fadeInComplete, setFadeInComplete] = useState(false)
  const userdata = localStorage.getItem("userData");
  const data = JSON.parse(userdata)
  const name = data.name 
  const navigate = useNavigate()

  const handleFadeInComplete = () => {
    setFadeInComplete(true);
  };

  const adminNavi = () => {
    navigate("/admin")
  }
  
  if(data.email == "dribblecapstone@gmail.com"){
    adminNavi()
  }
  
  const { scrollYProgress } = useViewportScroll();

  const y = useTransform(scrollYProgress, [0, 1], [0, 750]);


  const variants = {
    shake: {
      x: [-5, 5], // Adjust for shaking amplitude
      rotate: [-2, 2], // Adjust for rotation angle
      transition: { duration: 0.2, repeatType: 'reverse' },
    },
  };
  return (
    <div style={{backgroundColor: "rgb(217, 217, 217)", height: "100%", width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
      <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", position: "relative" }}>
      <motion.img 
          src={player} 
          alt="" 
          className='player' 
          style={{ y }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onAnimationComplete={handleFadeInComplete}
        />
        {/* <AnimatedText text='Dribble' className='title'/> */}
        {fadeInComplete && <AnimatedText text='Dribble' className='title' />}
      </div>

      <div style={{height: "100%", width: "85%", backgroundColor: "white",zIndex: "1",filter: "blur(12)",borderRadius: "20px"}}>
        <Nav profile={data.profilePhoto} name = {name}/>
        <motion.section style={{
          display: "flex",
          marginTop: "29vh",
          justifyContent: "space-around",
          alignItems: "center"
        }}
        initial = {{
          opacity: 0,
        }}
        whileInView = {{
          opacity: 1,
        }}
        viewport={{
          margin: "-200px"
        }}
        >
              <img src={academies} alt="" style={{height: "46vh",width: "36vw",borderRadius: "20px",border: "3px solid gray"}}/>
          <div>
            <p style={{fontSize: "77px",fontWeight: "700",color: "rgb(62, 62, 62)", lineHeight :"9.5vh"}}>Best <br />Courses</p>
            <br />
            <p>This courses are catered to the latest trends <br />in the football. Watch, learn and perform to <br />complete a specific skill. </p>
            <button style={{backgroundColor: "rgb(202, 69, 65)",height: "8vh",width: "16vw",borderRadius: "15px", border: "none", fontFamily: "Inter, sans-serif",fontSize: "16px",fontWeight: "500",marginTop :"6vh",color: "white"}}>ENROLL IN A COURSE</button>
          </div>
        </motion.section>
        <motion.section style={{
          display: "flex",
          marginTop: "29vh",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: "20vh"
        }}
        initial = {{
          opacity: 0,
        }}
        whileInView = {{
          opacity: 1,
        }}
        viewport={{
          margin: "-200px"
        }}>
          <div>
            <p style={{fontSize: "70px",fontWeight: "700",color: "rgb(62, 62, 62)", lineHeight :"9.5vh"}}>Certified<br />Academies</p>
            <br />
            <p>This courses are catered to the latest trends <br />in the football. Watch, learn and perform to <br />complete a specific skill. </p>
            <button style={{backgroundColor: "rgb(202, 69, 65)",height: "8vh",width: "16vw",borderRadius: "15px", border: "none", fontFamily: "Inter, sans-serif",fontSize: "16px",fontWeight: "500",marginTop :"6vh",color: "white"}}>GET INTO AN ACADEMY</button>
          </div>
          <img src={courses} alt="" style={{height: "46vh",width: "36vw",borderRadius: "20px",border: "3px solid gray"}}/>
        </motion.section>
      </div>
      <footer>
        <div style={{display: "flex", justifyContent: "space-between",width: "85vw",padding: "7vh 0 5vh",borderBottom: "2px solid rgb(62, 62, 62)"}}>
          <div className='footer-1' style={{display: "flex",flexDirection: "column",justifyContent: "space-around",height: "25vh"}}>
          <div style={{color: "rgb(202, 69, 65)", fontSize: "30px", fontFamily: "Inter, sans-serif", fontWeight: "800"}}>
            Drib<span style={{color: "rgb(62, 62, 62)"}}>ble</span>
          </div>
          <p>Made by <b style={{color: "black"}}>Sharugeshwaran</b>. <br /> An aspiring web developer <br /> who also loves football.</p>
          <div style={{display: "flex"}}>
          <a href='git'>
            <svg width="26" height="26" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: "2vw"}}>
              <path d="M18 0C8.055 0 0 8.055 0 18C0 25.965 5.1525 32.6925 12.3075 35.0775C13.2075 35.235 13.545 34.695 13.545 34.2225C13.545 33.795 13.5225 32.3775 13.5225 30.87C9 31.7025 7.83 29.7675 7.47 28.755C7.2675 28.2375 6.39 26.64 5.625 26.2125C4.995 25.875 4.095 25.0425 5.6025 25.02C7.02 24.9975 8.0325 26.325 8.37 26.865C9.99 29.5875 12.5775 28.8225 13.6125 28.35C13.77 27.18 14.2425 26.3925 14.76 25.9425C10.755 25.4925 6.57 23.94 6.57 17.055C6.57 15.0975 7.2675 13.4775 8.415 12.2175C8.235 11.7675 7.605 9.9225 8.595 7.4475C8.595 7.4475 10.1025 6.975 13.545 9.2925C14.985 8.8875 16.515 8.685 18.045 8.685C19.575 8.685 21.105 8.8875 22.545 9.2925C25.9875 6.9525 27.495 7.4475 27.495 7.4475C28.485 9.9225 27.855 11.7675 27.675 12.2175C28.8225 13.4775 29.52 15.075 29.52 17.055C29.52 23.9625 25.3125 25.4925 21.3075 25.9425C21.96 26.505 22.5225 27.585 22.5225 29.2725C22.5225 31.68 22.5 33.615 22.5 34.2225C22.5 34.695 22.8375 35.2575 23.7375 35.0775C27.3114 33.8721 30.417 31.5758 32.6169 28.5121C34.8168 25.4484 36 21.7717 36 18C36 8.055 27.945 0 18 0Z" fill="black"/>
            </svg>
            </a>
            <a href='in'>
              <svg width="26" height="26" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: "2vw"}}>
                <path d="M0 2.51475C0 1.12571 1.15424 0 2.57839 0H32.5316C33.9558 0 35.11 1.12571 35.11 2.51475V32.5952C35.11 33.9843 33.9558 35.11 32.5316 35.11H2.57839C1.15424 35.11 0 33.9843 0 32.5952V2.51475ZM10.8468 29.3915V13.5371H5.5781V29.3915H10.8468ZM8.21355 11.3713C10.0502 11.3713 11.1935 10.1556 11.1935 8.63267C11.1606 7.07686 10.0524 5.89409 8.24866 5.89409C6.44488 5.89409 5.2665 7.07905 5.2665 8.63267C5.2665 10.1556 6.40977 11.3713 8.17844 11.3713H8.21355ZM18.9835 29.3915V20.5372C18.9835 20.0632 19.0186 19.5892 19.1591 19.2513C19.5387 18.3055 20.4055 17.3246 21.8626 17.3246C23.7695 17.3246 24.5309 18.7773 24.5309 20.9102V29.3915H29.7996V20.298C29.7996 15.4265 27.2015 13.1619 23.7344 13.1619C20.9387 13.1619 19.6857 14.6979 18.9835 15.7798V15.8346H18.9484L18.9835 15.7798V13.5371H13.717C13.7829 15.0249 13.717 29.3915 13.717 29.3915H18.9835Z" fill="black"/>
              </svg>
            </a>
            <a href='ig'>
              <svg width="26" height="26" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.555 0C12.791 0 12.1919 0.0219438 10.3201 0.10533C8.44834 0.193105 7.17341 0.487151 6.05648 0.921637C4.88434 1.36123 3.82291 2.05261 2.94705 2.94705C2.05261 3.82291 1.36123 4.88434 0.921637 6.05648C0.487151 7.17122 0.190911 8.44834 0.10533 10.3136C0.0219438 12.1898 0 12.7866 0 17.5572C0 22.3234 0.0219438 22.9202 0.10533 24.792C0.193105 26.6617 0.487151 27.9366 0.921637 29.0535C1.37148 30.2078 1.97055 31.1865 2.94705 32.163C3.92135 33.1395 4.90004 33.7407 6.05428 34.1884C7.17341 34.6228 8.44615 34.9191 10.3158 35.0047C12.1898 35.0881 12.7866 35.11 17.555 35.11C22.3234 35.11 22.9181 35.0881 24.792 35.0047C26.6595 34.9169 27.9388 34.6228 29.0557 34.1884C30.2271 33.7485 31.2877 33.0571 32.163 32.163C33.1395 31.1865 33.7385 30.2078 34.1884 29.0535C34.6207 27.9366 34.9169 26.6617 35.0047 24.792C35.0881 22.9202 35.11 22.3234 35.11 17.555C35.11 12.7866 35.0881 12.1898 35.0047 10.3158C34.9169 8.44834 34.6207 7.17122 34.1884 6.05648C33.7488 4.88434 33.0574 3.82291 32.163 2.94705C31.2871 2.05261 30.2257 1.36123 29.0535 0.921637C27.9344 0.487151 26.6573 0.190911 24.7899 0.10533C22.9159 0.0219438 22.3212 0 17.5506 0H17.555ZM15.9816 3.16429H17.5572C22.2444 3.16429 22.7996 3.17965 24.6494 3.26523C26.361 3.34203 27.2914 3.6295 27.9103 3.86868C28.7288 4.18687 29.3147 4.56869 29.9291 5.18311C30.5435 5.79754 30.9231 6.38124 31.2413 7.20194C31.4827 7.81856 31.768 8.74897 31.8448 10.4606C31.9304 12.3104 31.9479 12.8656 31.9479 17.5506C31.9479 22.2356 31.9304 22.793 31.8448 24.6428C31.768 26.3544 31.4805 27.2827 31.2413 27.9015C30.9579 28.6627 30.5089 29.3515 29.9269 29.9181C29.3125 30.5325 28.7288 30.9122 27.9081 31.2303C27.2936 31.4717 26.3632 31.757 24.6494 31.836C22.7996 31.9194 22.2444 31.9391 17.5572 31.9391C12.87 31.9391 12.3126 31.9194 10.4628 31.836C8.75117 31.757 7.82295 31.4717 7.20413 31.2303C6.44232 30.9478 5.75277 30.4996 5.18531 29.9181C4.6022 29.3511 4.15248 28.6615 3.86868 27.8993C3.6295 27.2827 3.34203 26.3522 3.26523 24.6406C3.18184 22.7908 3.16429 22.2356 3.16429 17.5462C3.16429 12.8568 3.18184 12.3061 3.26523 10.4562C3.34423 8.74458 3.6295 7.81417 3.87088 7.19536C4.18906 6.37685 4.57088 5.79096 5.18531 5.17653C5.79973 4.56211 6.38344 4.18248 7.20413 3.86429C7.82295 3.62291 8.75117 3.33764 10.4628 3.25865C12.0822 3.18404 12.7098 3.16209 15.9816 3.1599V3.16429ZM26.9272 6.07842C26.6505 6.07842 26.3766 6.13291 26.121 6.23877C25.8654 6.34464 25.6332 6.49981 25.4376 6.69543C25.242 6.89104 25.0868 7.12327 24.9809 7.37886C24.8751 7.63444 24.8206 7.90838 24.8206 8.18502C24.8206 8.46166 24.8751 8.73559 24.9809 8.99118C25.0868 9.24676 25.242 9.47899 25.4376 9.67461C25.6332 9.87023 25.8654 10.0254 26.121 10.1313C26.3766 10.2371 26.6505 10.2916 26.9272 10.2916C27.4859 10.2916 28.0217 10.0697 28.4168 9.67461C28.8118 9.27955 29.0338 8.74372 29.0338 8.18502C29.0338 7.62631 28.8118 7.09049 28.4168 6.69543C28.0217 6.30036 27.4859 6.07842 26.9272 6.07842ZM17.5572 8.54051C16.3614 8.52185 15.1739 8.74126 14.0637 9.18596C12.9535 9.63067 11.9429 10.2918 11.0907 11.1308C10.2385 11.9698 9.56169 12.97 9.09972 14.0731C8.63776 15.1762 8.39985 16.3602 8.39985 17.5561C8.39985 18.752 8.63776 19.936 9.09972 21.0391C9.56169 22.1422 10.2385 23.1424 11.0907 23.9814C11.9429 24.8204 12.9535 25.4815 14.0637 25.9262C15.1739 26.3709 16.3614 26.5903 17.5572 26.5717C19.9239 26.5348 22.1812 25.5687 23.8418 23.8819C25.5025 22.1952 26.4332 19.9231 26.4332 17.5561C26.4332 15.1891 25.5025 12.917 23.8418 11.2303C22.1812 9.54353 19.9239 8.57743 17.5572 8.54051ZM17.5572 11.7026C18.3257 11.7026 19.0868 11.854 19.7968 12.1481C20.5069 12.4422 21.152 12.8733 21.6955 13.4167C22.2389 13.9602 22.67 14.6053 22.9641 15.3154C23.2582 16.0254 23.4096 16.7865 23.4096 17.555C23.4096 18.3235 23.2582 19.0846 22.9641 19.7946C22.67 20.5047 22.2389 21.1498 21.6955 21.6933C21.152 22.2367 20.5069 22.6678 19.7968 22.9619C19.0868 23.256 18.3257 23.4074 17.5572 23.4074C16.005 23.4074 14.5165 22.7908 13.4189 21.6933C12.3214 20.5957 11.7048 19.1072 11.7048 17.555C11.7048 16.0028 12.3214 14.5143 13.4189 13.4167C14.5165 12.3192 16.005 11.7026 17.5572 11.7026Z" fill="black"/>
                </svg></a>
            </div>
          </div>
          <div style={{display: "flex",flexDirection: "column",justifyContent: "space-around",height: "25vh"}}>
            <p>Customer Support</p>
            <p>Terms of Service</p>
            <p>Privacy Policy</p>
            <p>Refund Policy</p>
          </div>
          <button className='nav-buttons' style={{backgroundColor: "rgb(202, 69, 65)",height: "5vh",width: "6vw",borderRadius: "15px", border: "none", fontFamily: "Inter, sans-serif",fontSize: "16px",fontWeight: "500",marginTop : "2vh"}}>Sign Up</button>
        </div>
        <div style={{width: "",textAlign: "center",padding: "5vh"}}>
          <p>@ 2024 Dribble. All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}

const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 2,
    y: 0,
    transition: {
      duration: 1,
      delayChildren: 0.1, // Delay each letter animation
      staggerChildren: 0.1, // Stagger the animation of each letter
      type: "spring", // Spring animation type
      stiffness: 500, // Stiffness of the spring animation
      damping: 10, // Damping of the spring animation
    }
  }
}

const AnimatedText = ({
  text,
  className,
}) => {
  return (
    <motion.span className={className} initial="hidden" animate="visible" variants={defaultAnimations} aria-hidden style={{fontSize: "15rem",width:"58rem"}}>
      {text.split('').map((char, index) => (
        <motion.span className='inline-block' key={index} variants={defaultAnimations}>{char}</motion.span>
      ))}
    </motion.span>
  );
}

export default Home;
