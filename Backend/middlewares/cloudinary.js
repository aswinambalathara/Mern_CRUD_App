const cloudinary = require('cloudinary').v2
require("dotenv").config();


cloudinary.config({
  cloud_name: 'did1lmng0',
  api_key: '176378866391977',
  api_secret: process.env.CLOUD_SECRET,
  secure: true,
});