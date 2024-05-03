import axios from 'axios';

const addToCloudinary = async (image) => {
  try {
      console.log("Fnc",image[0])
      const formData = new FormData();
      formData.append('file', image[0]);
      formData.append('upload_preset', 'Profile-images');
      console.log(import.meta.env.VITE_CLOUDINARY_URI_);

      const response = await axios.post("https://api.cloudinary.com/v1_1/df5gqodoq/image/upload",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data' // Ensure proper content type
          }
        }
      );

      // Check if the response contains the secure_url property
      if (response.data && response.data.secure_url) {
        console.log('Images uploaded to Cloudinary:', response.data.secure_url);
        return response.data.secure_url;
      } else {
        throw new Error('Failed to upload image to Cloudinary');
      }

  } catch (error) {
    console.error('Error uploading images to Cloudinary:', error);
    throw new Error('Failed to upload images to Cloudinary');
  }
};

export { addToCloudinary };