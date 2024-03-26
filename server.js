const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const QRCode = require('qrcode');
const cors = require("cors");
const Id = require("./models/id");

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
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
  const qrUrl = `https://cheerio24.vercel.app/lunch/${id}`;
  const qrCodeImage = await QRCode.toDataURL(qrUrl);

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
      qrCodeImage
    });
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
});
const sendRegistrationEmail = async ({ email, id, photo, name , qrCodeImage}) => {
  console.log(qrCodeImage)
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.email",
      service: "gmail",
      auth: {
        user: "codewithsiddhu@gmail.com",
        pass: "lkcr lxda ghqe ylhh",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Craft the email content
    const mailOptions = {
      from: "noreply@gmail.com",
      to: email,
      subject: "You are invited to cheerio",
      html: `
      <style>
		@import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");
	body{
		background-color: #21D4FD;
		background-image: linear-gradient(19deg, #21D4FD 0%, #B721FF 100%);
		width: 100%;
		overflow: hidden;
	
	}
	.wrapper {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		height: 100vh;
	}
	.form_container {
		-webkit-box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
			rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
			rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
		border-radius: 20px;
		background-color: #12192c;
	}
	.input_container {
		padding: 4em;
		position: relative;
		color: #fff;
	}
	.input_container h1{
		font-size: 30px;
	}
	#input {
		padding: 10px 30px;
		background: #fff;
		width: 100%;
		font-size: 16px;
		border-radius: 15px;
		border: 2px solid #B721FF;
	}
	
	.submit {
		background: #B721FF;
		padding: 10px 30px;
		color: #fff;
		border: 2px solid #B721FF;
		font-size: 16px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		border-radius: 20px;
		position: absolute;
		right: 2em;
		border-top-right-radius: 15px;
		border-bottom-right-radius: 15px;
	}
	.spooky_bg {
		background: url(https://cdn.pixabay.com/photo/2018/05/10/11/34/concert-3387324__340.jpg);
		background-size: cover;
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
		-webkit-clip-path: polygon(
			100% 0%,
			99% 50%,
			100% 100%,
			23% 100%,
			11% 51%,
			0 0
		);
		clip-path: polygon(100% 0%, 99% 50%, 100% 100%, 23% 100%, 11% 51%, 0 0);
	}
	.spooky_bg2 {
		display: none;
		background: url(https://cdn.pixabay.com/photo/2018/05/10/11/34/concert-3387324__340.jpg);
		background-size: cover;
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
	}
	#error {
		color: #35b7a4;
	}
	@media (max-width: 768px) {
		.spooky_bg {
			display: none;
		}
		.spooky_bg2 {
			display: block !important;
			height: 300px;
		}
	}
	
	.credit a{
		text-decoration: none;
		color: #B721FF;
		font-weight: 800;
		}
		
		.credit {
		  margin: 10px;
		}
	
	
	  </style>
<div class="wrapper">
	<div class="container">
		<div class="columns form_container">
			<div class="column is-half spooky_bg2">
			</div>
			<div class="column is-half input_container">
                <h1 style="font-size:40px;font-weight:700;color:purple">CHEERIO</h1>
				<h1>HI, ${name}  You Are Invited</h1>
				<h2>Let the Fest begin</h2>
				<p>I am delighted to extend an invitation to you for the upcoming fest named "Cheerio" organized by our Computer Science and Engineering (CSE) department. </p>
				<h1>${id} idnumabr </h1>
        <h1> ${email}  </h1>
				<div class="mt-2 ml-2">
					<span id="error"></span>
				</div>
				<div class="credit">Made with <span style="color:tomato;font-size:20px;">❤</span> For RGUKTNs</div>
			</div>
			<div class="column is-half spooky_bg">
			</div>
		</div>
	</div>
</div>
    
      `,
    };
{/* <h1>Name :${name}</h1>
      <h1>id :${id}</h1>
      <h1>email :${email}</h1>
      <img src=${photo} alt="Preview" >
      <img src=${qrCodeImage} ></img> */}
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendemail = async ({ email, idNumber, name, id }) => {
  console.log(email, idNumber, name, id)
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.email",
      service: "gmail",
      auth: {
        user: "codewithsiddhu@gmail.com",
        pass: "lnbe kvls fcvk cyti",
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
}
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
    }).then()

    await sendemail({
      email: email,
      idNumber: idNumber,
      name: name,
      id: user._id // Assuming user._id is the intended 'id'
    }).then(() => res.status(201).json({ user, message: "ID added successfully" }));
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

app.listen(4001, () => {
  console.log(`Server listening on port 4001`);
});
