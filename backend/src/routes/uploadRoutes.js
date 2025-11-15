const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');
const { authMiddleware } = require('../utils/jwt');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: { folder: 'boardvista', allowed_formats: ['jpg','png','jpeg'], transformation: [{ width: 1200, crop: 'limit' }] }
});
const parser = multer({ storage });

router.post('/', authMiddleware, parser.array('photos', 6), (req,res) => {
  // multer-storage-cloudinary attaches files with .path
  const urls = req.files.map(f => f.path);
  res.json({ urls });
});

module.exports = router;
