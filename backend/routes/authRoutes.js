const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const upload = require('../middleware/uploadMiddleware'); 

const {
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authController");

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Get user info route
router.get("/getUser", protect, getUserInfo);

// Upload image route (fixed syntax)
router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    // Fixed template literal syntax
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
});

module.exports = router;