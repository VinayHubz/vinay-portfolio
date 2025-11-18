import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import Lead from "./models/lead.js"; 
import path from "path";
import { fileURLToPath } from "url";

// Path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// ----------------- MongoDB Connection ------------------
mongoose.connect(
  "mongodb+srv://vinaysai141:9182202854Vi%40@cluster141.g9ewn3w.mongodb.net/?appName=Cluster141",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log("MongoDB Atlas Connected"))
.catch((err) => console.log(err));

// ----------------- Resume Sending API ------------------
app.post("/send-resume", async (req, res) => {
  const { name, email } = req.body;

  try {
    // Save visitor details in DB
    await Lead.create({ name, email });

    // Nodemailer transport (Gmail + App Password)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "vinaysai141@gmail.com",
        pass: "jkpcyfqjcklnwrhl"   // Your correct app password
      }
    });

    // Send email with resume attached
    await transporter.sendMail({
      from: "vinaysai141@gmail.com",
      to: email,
      subject: "Your Resume from Vinay",
      text: `Hello ${name},

Thank you for your interest!

Please find my resume attached.

Best Regards,
T. Vinay`,
      attachments: [
        {
          filename: "Vinay_Resume.pdf",
          path: path.join(__dirname, "resume", "resume.pdf")  // THIS is your correct path
        }
      ]
    });

    return res.json({ message: "Resume has been sent to your email successfully!" });

  } catch (error) {
    console.log("MAIL ERROR:", error);
    return res.status(500).json({ message: "Failed to send resume." });
  }
});

// ------------------- Start Server -----------------------
app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});

