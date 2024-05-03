import axios from 'axios';
import cloudinary from "cloudinary"

cloudinary.config({
  cloud_name: 'df5gqodoq',
  api_key: 794122859766147,
  api_secret: "3ob5mPmNWm2lUgIsa6nFDU4IkhI"
})

const addToCloudinary = async (video) => {
  try {
    const uploadedVideos = [];

    const response = await cloudinary.v2.uploader.upload(video, {resource_type: "video"})

    // Check if the response contains the secure_url property
    if (response.secure_url) {
      uploadedVideos.push(response.secure_url);
    } else {
      throw new Error('Failed to upload video to Cloudinary');
    }

    console.log('Video uploaded to Cloudinary:', uploadedVideos);
    return uploadedVideos;

  } catch (error) {
    console.error('Error uploading video to Cloudinary:', error);
    throw new Error('Failed to upload video to Cloudinary');
  }
};

export { addToCloudinary };
