const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const Id = require("./models/id");

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
mongoose
  .connect(
    "mongodb+srv://flkarthikjidagam:TzHHFtRNTBFJQsnF@cluster0.v5cchvu.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Registration route
app.post("/register/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const { photo } = req.body;
  console.log(photo)
  console.log(req.body)

  try {
    const user = await Id.findByIdAndUpdate(id, { isReg: true, photo });
    console.log(user.photo)
    console.log(user)
    await sendRegistrationEmail({
      email: user.email,
      id: user.idNumber,
      photo: user.photo,
      name: user.name,
    });
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
});

const sendRegistrationEmail = async ({ email, id, photo, name }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.email",
      service: "gmail",
      auth: {
        user: "flkarthikjidagam@gmail.com",
        pass: "htyd uyay dhxt eqmu",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Craft the email content
    const mailOptions = {
      
      from: "noreply@gmail.com",
      to: email,
      subject: "Welcome to RGUKT Registration System",
      html: `
      <h1>Name :${name}</h1>
      <h1>id :${id}</h1>
      <h1>email :${email}</h1>
      <img src=${photo} alt="Preview" style={{width: '100px', height: '100px'}}>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

app.post("/add-id", async (req, res) => {
  const { idNumber, name, email } = req.body;
  const existingId = await Id.findOne({ idNumber });
  if (existingId) {
    return res.status(400).json({ message: "ID already exists" });
  }

  try {
    const user =await Id.create({
      idNumber,
      name,
      email,
    });
    res.status(201).json({ user, message: "ID added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add ID" });
  }
});

app.get("/getId/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Id.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(404).json({ message: "Check your Internet Connection" });
  }
});

app.listen(4001, () => {
  console.log(`Server listening on port 3000`);
});
