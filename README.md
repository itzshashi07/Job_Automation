# Job Automation - Email Sender Backend

This is the backend service for the **Job Automation** tool. It allows users to send job application emails to multiple HRs at once based on selected roles, using pre-defined templates.

## 🌐 Tech Stack

- **Node.js**
- **Express.js**
- **Nodemailer**
- **dotenv**
- **CORS**

## 📁 Project Structure

backend/
├── emailTemplates.js # Pre-defined email bodies for various roles
├── index.js # Main Express server
├── .env # Environment variables (not committed)
├── .gitignore
└── package.json


**Installation**
npm install

 Running the Server

node index.js

By default, the server runs at http://localhost:5000.


Send Email API
POST /send-email

Request Body:

{
  "role": "software_developer",
  "hrEmails": ["hr@example.com", "recruiter@company.com"]
}
Response:


{
  "success": true,
  "message": "Emails sent to 2 HR(s)"
}
🛡️ Notes

Make sure your .env is in .gitignore to protect credentials.

Backend is deployed via Render.

Frontend is hosted separately on Vercel.

💡 License
MIT






Made with ❤ by Shashi



## 🔐 Environment Variables

Create a `.env` file in the root directory and add the following:

```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password


Make sure to enable 2-Step Verification on your Gmail and generate an App Password to use here.


