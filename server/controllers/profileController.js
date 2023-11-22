const express = require("express");
const multer = require("multer");
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const pool = require("../database/connection").pool;

const router = express.Router();

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIAV6RD45SCZLBFFXKV",
    secretAccessKey: "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",
  },
});

// Multer Configuration for File Upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Profile Photo Upload Route
router.post(
  "/upload/:userId",
  upload.single("profilePhoto"),
  async (req, res) => {
    try {
      const { userId } = req.params;

      // Check if a profile photo already exists
      const result = await pool.query(
        "SELECT profile_photo FROM users WHERE id = $1",
        [userId]
      );

      // If a profile photo exists, delete it from S3
      if (result.rows[0]?.profile_photo) {
        await s3Client.send(
          new DeleteObjectCommand({
            Bucket: "shivapp",
            Key: "user_profile/"+result.rows[0].profile_photo,
          })
        );
      }

      // Upload the new profile photo to S3
      const photoKey = `${userId}-${req.file.originalname}`;
      const uploadParams = {
        Bucket: "shivapp",
        Key: "user_profile/" + photoKey,
        Body: req.file.buffer,
      };

      await s3Client.send(new PutObjectCommand(uploadParams));

      // Update the database with the S3 link
      await pool.query(
        "UPDATE users SET profile_photo = $1 WHERE id = $2",
        [photoKey, userId]
      );

      // Respond with the S3 link for the uploaded photo
      const photoURL = `https://shivapp.s3.amazonaws.com/user_profile/${photoKey}`;
      res.status(200).json({ photoURL });
    } catch (error) {
      console.error("Error uploading profile photo:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.get("/profile-link/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Retrieve the profile photo link from the database
    const result = await pool.query(
      "SELECT profile_photo FROM users WHERE id = $1",
      [userId]
    );

    // If a profile photo link exists, respond with it
    if (result.rows[0]?.profile_photo) {
      const photoURL = `https://shivapp.s3.amazonaws.com/user_profile/${result.rows[0].profile_photo}`;
      res.status(200).json({ photoURL });
    } else {
      res.status(404).json({ error: "Profile photo not found" });
    }
  } catch (error) {
    console.error("Error retrieving profile photo link:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
