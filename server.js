const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Ensure this path is correct

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle contact form submission
app.post('/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kalpeshsingbayas@gmail.com', // Your email
            pass: 'ukkmdiwpeswzkyvt' // Your app password
        }
    });

    let mailOptions = {
        from: 'kalpeshsingbayas@gmail.com', // This should be your email
        to: 'kalpeshsingbayas@gmail.com', // The email where you want to receive messages
        subject: `New Contact Form Submission: ${subject}`,
        text: `You have received a new message from ${name} (${email}).\n\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send email' });
        }
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Email sent successfully!' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});