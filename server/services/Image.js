const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageToCloudinary = async (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'hotels' },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url); 
        }
      }
    );
    uploadStream.end(buffer);
  });
};

module.exports = { uploadImageToCloudinary };
