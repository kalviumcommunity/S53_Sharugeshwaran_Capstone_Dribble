import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const UserDashboard = () => {
    const location = useLocation();
    const name = location.state;
    const [userData, setUserData] = useState(null);

    const certificates = [
        "https://marketplace.canva.com/EAFlVDzb7sA/1/0/1600w/canva-white-gold-elegant-modern-certificate-of-participation-bK_WEelNCjo.jpg","https://m.media-amazon.com/images/I/71rf-yB92VL._AC_UF1000,1000_QL80_.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNFDbsVvKWitCA2AsLsFmprZcNeWuB9HeY_uP16E-1dQ&s"
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:3000/users/profile", { name });
                 console.log("hey")
                setUserData(response.data.user);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Dependency on 'name' to refetch data when 'name' changes

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{height: "100%",width: "100%",display: "flex",justifyContent: "center",alignItems: "center",flexDirection: "column",fontFamily: "Inter"}}>
            <div style={{margin: "15vh 0",backgroundColor: "white",width: "60vw",display: "flex",alignItems: "center",flexDirection: "column",paddingTop: "10vh",borderRadius: "30px",boxShadow: "2px 2px 22px 0px gray"}}>
            <div style={{display: "flex",justifyContent: "space-between",alignItems: "center",width: "30vw"}}>
                <img src={userData.profilePhoto} alt="" style={{ borderRadius: "50%",height : "30vh"}} />
                <div>

                <p style={{fontSize:"1.5rem"}}>{name}</p>
                <p style={{color: "gray"}}>{userData.email}</p>
                <p style={{color: "gray"}}>{userData.city}</p>
                </div>
            </div>
            <div>
                <div style={{marginTop: "7vh",padding: "6%",marginBottom: "7vh",borderRadius: "15px",width: "30vw"}} className='bio'>
                <h1 style={{marginBottom: "3vh",fontWeight: "600",fontSize: "1.2rem"}}>Bio</h1>
                <p>{userData.bio}</p>
                </div>
            <div style={{backgroundColor: "rgb(235, 233, 233)",padding: "6%",marginBottom: "7vh",borderRadius: "15px",width: "30vw"}}>
                <h1 style={{marginBottom: "3vh",fontWeight: "600",fontSize: "1.2rem"}}>Certificates</h1>
                <div className='certificate-showcase' style={{display: "flex",overflow: "auto"}}>
                    {certificates.map((e,i) => {
                        return(
                            <img src={e} alt="" key={i} style={{height: "30vh"}}/>
                        )
                    })}
                </div>
            </div>
            </div>
 
            </div>
     </div>
    );
};

export default UserDashboard;
 