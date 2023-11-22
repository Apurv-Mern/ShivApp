const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const pool = require('../database/connection.js').pool;

const User = require('../controllers/user.js');


module.exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.find(email);
        if (user) {
            const token = crypto.randomBytes(32).toString('hex');
            const hash = crypto.createHash('sha256').update(token).digest('hex');
            const currentDate = new Date();

            // Convert the JavaScript Date object to a string in 'YYYY-MM-DD' format
            const formattedDate = currentDate.toISOString().split('T')[0];
            await User.updateResetPasswordToken(email, hash, formattedDate);

            // Create a transporter object with Outlook SMTP settings
            const transporter = nodemailer.createTransport({
              host: "us2.24livehost.com",
              port: 587,
              secure: false,
              auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: "ds20@24livehost.com",
                pass: "Dsmtp@909#",
              },
            });

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Reset Password',
                text: "To reset your password, click the following link or paste it into your browser:"+ `https://shivappdev.24livehost.com/shiv_app/user/resetPassword/${token}`
            };

            await transporter.sendMail(mailOptions);
            res.send('Recovery email sent');
        } else {
            res.send('Email not found');
        }
    } catch (err) {
        console.error(err);
        res.send('An error occurred');
    }
};


module.exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    try {
      const hash = crypto.createHash('sha256').update(token).digest('hex');
      const user = await User.findUserByResetPasswordToken(hash);
  
      if (!user) {
        return res.status(400).send('Invalid token');
      }
  
      if (Date.now() > user.resetPasswordExpires) {
        return res.status(400).send('Token expired');
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.updatePassword(user.email, hashedPassword);
  
      res.send('Password updated successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    }
  };