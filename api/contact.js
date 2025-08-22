// Vercel Serverless Function: /api/contact.js
// Sends contact form submissions to your Gmail using Nodemailer

const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    res.status(400).send('Missing required fields');
    return;
  }

  // Configure transporter with Gmail and App Password
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bhadetejas111199@gmail.com', // your Gmail
      pass: process.env.GMAIL_APP_PASSWORD // set this in Vercel environment variables
    }
  });

  const mailOptions = {
    from: 'bhadetejas111199@gmail.com',
    to: 'bhadetejas111199@gmail.com',
    subject: `Contact Form: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    replyTo: email
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Message sent successfully!');
  } catch (error) {
    res.status(500).send('Error sending message.');
  }
};
