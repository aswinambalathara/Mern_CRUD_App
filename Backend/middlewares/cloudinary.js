const cloudinary = require('cloudinary').v2
require("dotenv").config();


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
  secure: true,
});

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
    stream.end(fileBuffer);
  });
};

module.exports = {uploadToCloudinary,cloudinary}