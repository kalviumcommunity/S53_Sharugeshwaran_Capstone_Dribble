import React, { useState, useEffect } from "react";
import AcademyCard from "./AcademyCard";
import axios from "axios";

const Citylisting = () => {
    const [academies, setAcademies] = useState([]);
    const [location, setLocation] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const selectCategory = (e) => {
        setLocation(e.target.textContent);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('https://backend-cyan-two.vercel.app/academy', { location });
                setAcademies(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [location]);

    const filteredAcademies = academies.filter(academy => 
        academy.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div style={{
                display: "flex", 
                width: '100%', 
                justifyContent: "space-around", 
                alignItems: "center", 
                paddingTop: "10vh"
            }}>
                <div style={{ textAlign: "left" }}>
                    <div style={{
                        fontSize: "4rem", 
                        color: "rgb(202, 69, 65)", 
                        fontWeight: "700", 
                        lineHeight: "75px", 
                        fontFamily: "'Inter', sans-serif"
                    }}>
                        Academies
                    </div>
                    <div style={{
                        fontSize: "15px", 
                        marginTop: "2vh", 
                        fontFamily: "'Inter', sans-serif"
                    }}>
                        ⚡{filteredAcademies.length} {filteredAcademies.length === 1 ? " Academy" : " Academies"}
                    </div>
                    <div style={{
                        fontSize: "15px", 
                        marginTop: "2vh", 
                        fontFamily: "'Inter', sans-serif", 
                        color: "gray"
                    }}>
                        These academies listed below are accredited by All India Football Federation. <br />
                    </div>
                </div>
                <div>
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{
                            height: "8vh", 
                            width: "40vw", 
                            borderRadius: "20px", 
                            padding: "4%", 
                            outline: "none", 
                            boxShadow: "2px 2px 22px 0px gray"
                        }} 
                        placeholder='Search academies here' 
                    />
                </div>
            </div>
            <div style={{
                display: "grid", 
                gridTemplateColumns: "repeat(5,1fr)",
                paddingTop: "5vw",
                flexDirection: "row", 
                flexWrap: "wrap"
            }}>
                {["Mumbai", "New Delhi", "Kolkata", "Chennai", "Bengaluru", "Hyderabad", "Kochi", "Goa", "Jamshedpur", "Calicut", "Mohali", "Rurka kalan", "Pathankot", "Golaghat Dist", "Sanquelim"].map(city => (
                    <button 
                        key={city} 
                        onClick={selectCategory} 
                        style={{
                            width: "14vw",  
                            padding: "10px", 
                            fontSize: "1rem", 
                            cursor: "pointer", 
                            border: "0.5px solid black", 
                            borderRadius: "10px", 
                            backgroundColor: "#f0f0f0", 
                            transition: "background-color 0.3s",
                            margin: "1.5vh 1.5vw"
                        }} 
                        onMouseOver={(e) => e.target.style.backgroundColor = "#ccc"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "#f0f0f0"}
                    >
                        {city}
                    </button>
                ))}
            </div>
            <div style={{
                display: "grid", 
                gridTemplateColumns: "repeat(3, 1fr)", 
                rowGap: "5vh",    
                width: "100%",
                padding:"5vw",
                justifyItems: "center"
            }}>
                {filteredAcademies.map((academy, index) => (
                    <AcademyCard key={index} data={academy} />
                ))}
            </div>
        </div>
    );
};

export default Citylisting;
