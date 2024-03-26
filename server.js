const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const QRCode = require("qrcode");
const cors = require("cors");
const Id = require("./models/id");

const app = express();
app.use(bodyParser.json({ extended: true, limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
mongoose
  .connect(
    "mongodb+srv://n210368:ZxUFbySgVbbQrKEw@cluster0.6ip13vg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Registration route
app.post("/register/:id", async (req, res) => {
  const { id } = req.params;
  const { photo, name, idNumber, email } = req.body;

  const qrUrl = `https://cheerio24.vercel.app/lunch/${id}`;
  const qrCodeImage = await QRCode.toDataURL(qrUrl);

  try {
    const user = await Id.Create(id, {
      isReg: true,
      photo,
      name,
      email,
      idNumber,
    });
    await sendRegistrationEmail({
      email: user.email,
      id: user.idNumber,
      photo: photo,
      name: user.name,
      qrCodeImage,
    });
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
});

const sendRegistrationEmail = async ({
  email,
  id,
  photo,
  name,
  qrCodeImage,
}) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.email",
      service: "gmail",
      auth: {
        user: "abhiram777777@gmail.com",
        pass: "yrnn bpel euyc puwc",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    // const imageContent = fs.readFileSync(photo, { encoding: 'base64' });
    // Craft the email content
    const mailOptions = {
      from: "noreply@gmail.com",
      to: email,
      subject: "You are invited to cheerio",
      html: `
      <div style="background-color: #21d4fd; background-image: linear-gradient(19deg, #21d4fd 0%, #b721ff 100%); width: 100%; overflow: hidden;">
  <div style="display: flex; align-items: center; height: 100vh;">
    <div style="box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px; border-radius: 20px; background-color: #12192c;">
      <div style="padding: 4em; position: relative; color: #fff;">
        <h1 style="font-size: 40px; font-weight: 700; color: purple;">CHEERIO</h1>
        <h2 style="color:white">HI, ${name}(${id}) You Are Invited</h2>
        <img src="cid:qrimage" alt="PreviewofQR" style=" width: 100px; height: 100px;">
        <img src="cid:photo" alt="PreviewofPhoto" style=" width: 100px; height: 100px;">
        <h3 style="color:white;font-size:22px">Let the Fest begin</h3>
        <p style="color:white;font-size:20px">We are delighted to extend an invitation to you for the upcoming fest "Cheerio" organized by our Computer Science and Engineering (CSE) department.</p>
        <div class="mt-2 ml-2"><span id="error"></span></div>
        <div style="margin-bottom: 20px 0;color:white">Made with <span style="color: tomato; font-size: 20px;">❤</span> For RGUKTNs</div>
        
      </div>
    </div>
  </div>
</div>
      `,
      //   <div style="display: none; background: url('https://cdn.pixabay.com/photo/2018/05/10/11/34/concert-3387324__340.jpg'); background-size: cover; border-top-right-radius: 20px; border-bottom-right-radius: 20px; height: 300px;"></div>
      // <div style="background: url('https://cdn.pixabay.com/photo/2018/05/10/11/34/concert-3387324__340.jpg'); background-size: cover; border-top-right-radius: 20px; border-bottom-right-radius: 20px; -webkit-clip-path: polygon(100% 0%, 99% 50%, 100% 100%, 23% 100%, 11% 51%, 0 0); clip-path: polygon(100% 0%, 99% 50%, 100% 100%, 23% 100%, 11% 51%, 0 0);"></div>
      attachments: [
        {
          filename: "QR.PNG",
          path: `${qrCodeImage}`,
          cid: "qrimage", //same cid value as in the html img src
        },
        {
          filename: "image.png",
          path: `${photo}`,
          cid: "photo", //same cid value as in the html img src
        },
        {
          filename: "invitation.jpg",
          path: "https://cheerio24.vercel.app/INVITATIONADNO.png",
          cid: "bg",
        },
      ],
    };
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendemail = async ({ email, idNumber, name, id }) => {
  console.log(email, idNumber, name, id);
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.email",
      service: "gmail",
      auth: {
        user: "abhiram777777@gmail.com",
        pass: "yrnn bpel euyc puwc",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Craft the email content
    const mailOptions = {
      from: "noreply@gmail.com",
      to: email,
      subject: "Cheerio Invitation",
      html: `
       <h1>Cheerio Invitation</h1>
       <h3>Please press the below button 👇</h3>
       <a href='https://cheerio24.vercel.app/${id}'><button >Click to register</button>
    
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
    const user = await Id.create({
      idNumber,
      name,
      email,
    }).then();

    await sendemail({
      email: email,
      idNumber: idNumber,
      name: name,
      id: user._id, // Assuming user._id is the intended 'id'
    }).then(() =>
      res.status(201).json({ user, message: "ID added successfully" })
    );
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

app.post("/lunch/:id", async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(404).json({ message: "Authorization Error" });
  }

  try {
    const user = await Id.findByIdAndUpdate(id, {
      isCompleted: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Lunch Status Modified" });
  } catch (err) {
    return res.status(404).json({ message: "Check your Internet Connection" });
  }
});

app.post("/reset/bools", async (req, res) => {
  try {
    const users = await Id.find();

    await Promise.all(
      users.map(async (user) => {
        await Id.findByIdAndUpdate(user._id, { isCompleted: false });
      })
    );

    return res.status(200).json({ message: "Reset Successful" });
  } catch (err) {
    return res.status(500).json({ message: "Check your Internet Connection" });
  }
});

app.get("/lunch/count", async (req, res) => {
  try {
    const users = await Id.find({ isCompleted: true });
    let count = users.length;
    return res.status(200).json({ count });
  } catch (err) {
    return res.status(500).json({ message: "Check your Internet Connection" });
  }
});

app.get("/count/:year", async (req, res) => {
  const { year } = req.params;
  try {
    const regex = new RegExp(`^[nN]${year}\\d{4}@rguktn\\.ac\\.in$`);
    const users = await Id.find({ email: regex });

    const count = users.length;
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while fetching users" });
  }
});

app.listen(4002, () => {
  console.log(`Server listening on port 4002`);
});
