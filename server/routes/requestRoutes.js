
const express = require('express');
const router = express.Router();
const multer = require('multer');

const authMiddleware = require('../middleware/authMiddleware');

const {
  createRequest,
  getRequests,
  updateStatus,
  deleteRequest
} = require('../controllers/requestController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage });

router.post('/', authMiddleware, upload.single('image'), createRequest);
router.get('/', authMiddleware, getRequests);
router.put('/:id', authMiddleware, updateStatus);
router.delete('/:id', authMiddleware, deleteRequest);

module.exports = router;