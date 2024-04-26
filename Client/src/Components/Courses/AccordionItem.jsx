import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AccordionItem = ({ index, lesson }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div style={{backgroundColor: "white",width: "50vw", display:"flex",flexDirection: "column",padding: "3%", color: "white", borderRadius: "20px", justifyContent: "center",alignItems: "center",
        background: "linear-gradient(135deg, #C17457, #EB25D2)", boxShadow: "2px 2px 22px 0px gray",marginBottom: "5vh"}}onClick={handleToggleAccordion}>
            <div onClick={handleToggleAccordion} style={{height: "100%"}}>
                <p style={{fontFamily: "'Inter',sans-serif",fontWeight: "600",fontSize:"1.05rem"}}>{lesson.name}</p>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <iframe
                            src={lesson.url}
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen
                            style={{ height: "45vh", width: "40vw", margin: "5vh 0",borderRadius: "15px" }}
                        ></iframe>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AccordionItem;
