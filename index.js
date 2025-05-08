// const express = require("express");
// const cors = require("cors");
// const nodemailer = require("nodemailer");
// const templates = require("./emailTemplates");

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post("/send-email", async (req, res) => {
//   const { role, hrEmail } = req.body;
//   const template = templates[role];

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "officialshashi2023@gmail.com",
//       pass: "wyta udit gaql cvcl" // Enable 2FA in Gmail and use app password
//     }
//   });

//   const mailOptions = {
//     from: "officialshashi2023@gmail.com",
//     to: hrEmail,
//     subject: template.subject,
//     text: template.body,
//     attachments: [
//       {
//         filename: `${role}-resume.pdf`,
//         path: template.resume
//       }
//     ]
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.json({ success: true, message: "Email sent successfully" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// app.listen(5000, () => {
//   console.log("Backend running on port 5000");
// });
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const templates = require("./emailTemplates");
require("dotenv").config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { role, hrEmails } = req.body;
  const template = templates[role];

  if (!template) {
    return res.status(400).json({ success: false, message: "Invalid role selected" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    const validEmails = Array.isArray(hrEmails)
      ? hrEmails.filter((email) => email.includes("@"))
      : [];

    if (validEmails.length === 0) {
      return res.status(400).json({ success: false, message: "No valid emails provided" });
    }

    for (const email of validEmails) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: template.subject,
        text: template.body,
      };

      await transporter.sendMail(mailOptions);
    }

    res.json({ success: true, message: `Emails sent to ${validEmails.length} HR(s)` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
