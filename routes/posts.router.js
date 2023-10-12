const express = require("express")
const router = express.Router()
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const uploadDirectory = '/uploads';

// Check if the upload directory exists; if not, create it
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Define the storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Use the `upload` middleware with your routes


const postsController = require("../controller/posts.controller")(uploadDirectory)

router.get("/", postsController.getAll)
router.get("/:id", postsController.getById)
router.get("/user_PTC/:id", postsController.getByUid)
router.post("/create",upload.array('images'), postsController.create)
router.put("/:id", postsController.update)
router.delete("/:id", postsController.delete)

module.exports = router