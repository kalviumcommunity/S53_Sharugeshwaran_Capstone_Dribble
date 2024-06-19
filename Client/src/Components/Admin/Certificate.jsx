import React, { useRef, useState, useEffect } from 'react';
import {toPng} from 'html-to-image';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


const Certificate = () => {
  const certificateRef = useRef(null)
    const date = new Date()
    const location = useLocation()
    const data = location.state
  useEffect(() => {
    const generateAndUploadImage = async () => {
      try {
        // Generate image from HTML
        const dataUrl = await toPng(certificateRef.current);
        const blob = await (await fetch(dataUrl)).blob();

        // Create FormData and append the blob
        const formData = new FormData();
        formData.append('file', blob);
        formData.append('courseName',course)

        // Send the blob to the backend
        const response = await axios.post('http://localhost:3000/upload-certificate', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log("file uploaded sucessfully",response.data)

      } catch (error) {
        console.error('Error generating image:', error);
      }
    };

    generateAndUploadImage();
  }, []);

  return (
    <div>
      <div style={{ display: 'none' }} ref={certificateRef}>
        <div className="certificate">
          <h1>Certificate of Completion</h1>
          <p>This is to certify that</p>
          <h2>{data.name}</h2>
          <p>has successfully completed the course</p>
          <h3>{data.courseName}</h3>
          <p>on</p>
          <h4>{date}</h4>
        </div>
      </div>
      
    </div>
  );
};

export default Certificate;
