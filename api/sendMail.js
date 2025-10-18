import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ahrar.0932@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'ahrar.0932@gmail.com',
      subject: `New Contact Message from ${name}`,
      text: `
You received a new message from your website:

Name: ${name}
Email: ${email}
Message:
${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ error: 'Failed to send message.' });
  }
}
