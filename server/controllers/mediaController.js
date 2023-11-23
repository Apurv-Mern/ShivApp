// Import necessary modules and AWS SDK

const aws = require('aws-sdk');
const pool = require("../database/connection").pool;
require("dotenv").config();

// Initialize AWS S3 SDK with your credentials
// aws.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_KEY,
//   region: process.env.AWS_S3_REGION,
// });
aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_S3_REGION,
  });

  //import { S3Client } from '@aws-sdk/client-s3';


// // Define a route to upload an image to S3 and store its URL in the database
// const uploadMedia = async (req, res) => {
//   const { user_id, event_id } = req.params;
//   const file = req.file; // Assuming you're using a middleware like multer to handle file uploads

//   // Upload the image to S3
//   const params = {
//     Bucket: 'shivappww',
//     Key: `user_${user_id}/event_${event_id}/${file.originalname}`,
//     Body: file.buffer,
//   };

//   try {
//     const response = await s3.putObject(params).promise();

//     // Store the image URL in the database
//     const imageUrl = `https://p.s3.us-south-1.amazonaws.com/${params.Key}`;
//     // Save imageUrl to your event_images table
//     const imageExists = await pool.query('SELECT image_url FROM event_images WHERE user_id=$1 AND event_id=$2;',[user_id,event_id]);
//     if (imageExists.rows[0].image_url === imageUrl) {
//       res.status(400).json({ Msg: 'Image Already exist.' });
//       return;
//     } else {
//       await pool.query('INSERT INTO event_images (user_id,event_id,image_url) VALUES($1,$2,$3)',[user_id,event_id,imageUrl]);
//     }

//     res.status(200).json({ imageUrl });
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     res.status(500).json({ error: 'Image upload failed' });
//   }
// };


  //v2

const s3 = new aws.S3();

// Define a route to upload an image to S3 and store its URL in the database
const uploadMedia= async (req, res) => {
  const { user_id, event_id } = req.params;
  const file = req.file; // Assuming you're using a middleware like multer to handle file uploads

  // Upload the image to S3
  const params = {
    Bucket: 'shivappww',
    Key: `user_${user_id}/event_${event_id}/${file.originalname}`,
    Body: file.buffer,
  };

  try {
    await s3.upload(params).promise();

    // Store the image URL in the database
    const imageUrl = `https://shivappww.s3.eu-west-2.amazonaws.com/${params.Key}`;
    console.log(imageUrl);
    // Save imageUrl to your event_images table
    const imageExists=await  pool.query('SELECT image_url FROM event_images WHERE user_id=$1 AND event_id=$2;',[user_id,event_id]);
    if(imageExists.rows.length>0 && imageExists.rows[0].image_url === imageUrl)
    {
        res.status(400).json({Msg:"Image Already exist."});
        return;
    }
    else{
        await pool.query('INSERT INTO event_images (user_id,event_id,image_url) VALUES($1,$2,$3)',[user_id,event_id,imageUrl]);
    }


    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }
};

// Define a route to retrieve images associated with an event
const retriveMedia= async (req, res) => {
  const { user_id,event_id } = req.params;

  try {
    // Retrieve image URLs from the database based on event_id
    const imageUrls=await  pool.query('SELECT user_id,event_id,image_url FROM event_images WHERE user_id=$1 AND event_id=$2;',[user_id,event_id]);
    // Replace this with your actual database query
   // const imageUrls = await queryImageUrls(event_id

    res.status(200).json(imageUrls.rows);
  } catch (error) {
    console.error('Error retrieving images:', error);
    res.status(500).json({ error: 'Image retrieval failed' });
  }
};


const uploadMutipleTemplates= async (req, res) => {
  const { user_id, event_id } = req.params;
    try {
    
      console.log(req.files);

      const bucketName = 'shivappww';
  
      const uploadedImageUrls = [];
  
      for (const file of req.files) {
        const params = {
          Bucket: bucketName,
          Key: `images/Templates/${file.originalname}`, // Specify the key (filename) under which to store the image
          Body: file.buffer,
        };
  
        await s3.upload(params).promise();
        const imageUrl = s3.getSignedUrl('getObject', { Bucket: bucketName, Key: params.Key }); // Get a signed URL for the uploaded image
        const imageExists=await  pool.query('SELECT image_url FROM event_images WHERE user_id=$1 AND event_id=$2;',[user_id,event_id]);
        if(imageExists.rows.length>0 && imageExists.rows[0].image_url === imageUrl)
        {
          
          break;
        }
        else{
          uploadedImageUrls.push(imageUrl);
            await pool.query('INSERT INTO event_images (user_id,event_id,image_url) VALUES($1,$2,$3)',[user_id,event_id,imageUrl]);
        }
    
      }
  
      res.json({ success: true, message: 'Images uploaded successfully', urls: uploadedImageUrls });
    } catch (error) {
      console.error('Error uploading images:', error);
      res.status(500).json({ success: false, message: 'Error uploading images' });
    }
  };


const getCeremonyIcons = async (req, res) => {

  //get all icons stored in s3 in ceremony_icons folder
  
  const bucketName = 'shivappww';

  const params = {  
    Bucket: bucketName,
    Prefix: 'images/CeremonyIcons/',
    Delimiter: '/'
    
  };

}


module.exports = {uploadMedia,retriveMedia,uploadMutipleTemplates};
