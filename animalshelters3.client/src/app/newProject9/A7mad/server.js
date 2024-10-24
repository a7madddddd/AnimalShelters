app.post('/send-email', (req, res) => {
  const { to, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ahmadonizata@gmail.com',
      // You need to generate an App Password from Google Account settings
      pass: 'your-16-digit-app-password-here'
    }
  });

  const mailOptions = {
    from: 'ahmadonizata@gmail.com',
    to,
    subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});
