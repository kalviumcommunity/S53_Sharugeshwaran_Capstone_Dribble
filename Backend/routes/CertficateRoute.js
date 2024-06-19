const { createCanvas } = require('canvas');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });
// Configure Cloudinary (move this outside the function)
cloudinary.config({
    cloud_name: process.env.TWOCLOUD_NAME,
    api_key: process.env.TWOAPI_KEY,
    api_secret: process.env.TWOSECRET_API,
});

async function generateCertificate({ courseName, name, date }) {
    try {
      // Sanitize inputs
      const sanitizedCourseName = courseName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const sanitizedName = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const fileName = `${sanitizedName}-${sanitizedCourseName}-certificate.png`;
  
      // Create the canvas and context
      const canvas = createCanvas(800, 600);
      const ctx = canvas.getContext('2d');
      
      // Draw the certificate background
      ctx.fillStyle = '#F9F9F9';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw a decorative border
      ctx.strokeStyle = '#0074D9';
      ctx.lineWidth = 10;
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
      
      // Add a more elegant border inside
      ctx.strokeStyle = '#B0B0B0';
      ctx.lineWidth = 5;
      ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);
      
      // Add text to the certificate
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'center';
      
      // Certificate Title
      ctx.font = '40px Georgia';
      ctx.fillText('Certificate of Achievement', canvas.width / 2, 100);
      
      // Subheading
      ctx.font = '25px Georgia';
      ctx.fillText('This certificate is awarded to', canvas.width / 2, 180);
      
      // Recipient's Name
      ctx.fillStyle = '#0074D9';
      ctx.font = '45px Brush Script MT, cursive';
      ctx.fillText(name, canvas.width / 2, 250);
      
      // Course completion text
      ctx.fillStyle = '#000000';
      ctx.font = '25px Georgia';
      ctx.fillText('For successfully completing the course', canvas.width / 2, 320);
      
      // Course Name
      ctx.font = '30px Georgia';
      ctx.fillText(courseName, canvas.width / 2, 380);
      
      // Date
      ctx.font = '20px Georgia';
      ctx.fillText(`Date: ${date}`, canvas.width / 2, 450);
      
      // Convert canvas to buffer
      const buffer = canvas.toBuffer('image/png');
  
      // Upload to Cloudinary
      const cloudinaryUploadResult = await cloudinary.uploader.upload_stream({
        folder: 'Certificates',
        public_id: fileName,
        overwrite: true,
        resource_type: 'image'
      });
  
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'Certificates', public_id: fileName, overwrite: true, resource_type: 'image' },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          }
        );
        streamifier.createReadStream(buffer).pipe(uploadStream);
      });
  
    } catch (error) {
      console.error('Error generating certificate:', error);
      throw error;
    }
  }
  
module.exports = generateCertificate;
