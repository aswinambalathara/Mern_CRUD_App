const multer = require('multer');

const storage = multer.memoryStorage(); // Store files in memory

module.exports.upload = multer({ storage: storage });