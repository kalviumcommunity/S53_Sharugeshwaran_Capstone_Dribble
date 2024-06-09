import React from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AcademyCard = ({ data }) => {
    const controls = useAnimation();
    const navigate = useNavigate()
    const handleDragEnd = (event, info) => {
        console.log("Drag end"); // Add a console log to check if handleDragEnd is triggered
        controls.start({ x: 0, y: 0 });
    };
    const navigateFunc = () => {
        navigate("/details",{state: data})
    }
    return (
        <motion.div
            className="course-card"
            drag
            dragSnapToOrigin={0.5}
            onDragEnd={handleDragEnd}
            style={{ borderRadius: "20px",boxShadow: "12px 2px 12px gray",width: "25vw" }}
            initial={{ opacity: 0 }} // Adjust initial opacity to 0 for fade-in effect
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            // style={{width: "25vw"}}
            // onClick={navigateFunc}
            onClick={navigateFunc}
        >
            <AnimatePresence>
                <motion.div
                    className="img-container"
                    whileHover={{ scale: 1.1 }}
                    initial={{ opacity: 0 }} // Adjust initial opacity to 0 for fade-in effect
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    // onClick={navigateFunc}
                    style={{padding: "3vh",borderRadius: "20%"}}
                >
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo1BAt0C_lwqCOpENx_78Gk2nicY0Nq1KVPQ&s"alt={data.name} style={{ height: "40vh", width: "25vw" }} />
                    <div className="overlay" style={{ display: "flex", alignItems: "center", textAlign: "center", justifyContent: "center" }}>
                        <h2>{data.name}</h2>
                    </div>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}

export default AcademyCard;
