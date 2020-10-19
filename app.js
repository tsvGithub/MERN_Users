const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
// console.log(process.env.ATLAS_URI);
const User = require("./models/user");

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json({ extended: false }));
app.use(cors());
//parse json as server sends&recieves json
app.use(express.json());
//------------------
//DB
const uri = process.env.ATLAS_URI || "mongodb://localhost:27017/users";

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("DB connected!");
  } catch (err) {
    console.log(err);
  }
};
//connect DB
connectDB();
//--------------
//Test:
// app.get("/", (req, res) => {
//   res.send("Inside backend");
// });
//-------------------
// //Explanation
// //receive some data on DB
// //on BE to URL 'api/register' from FE
// app.post("/api/register", (req, res) => {
//   //req is what is received from FE to BE
//   console.log(req.body); //client>Form>const dataFromForm
//   //res is what is send from BE to FE
//   res.json({
//     message: "Date received", //client>Form>const response
//   });
// });
//------------------------
//from FE to BE
app.post("/api/register", async (req, res) => {
  try {
    //User Schema for create on DB
    //key ('name', 'email') is from User Schema
    //value (req.body.userName,) comes from FE Form.js
    await User.create({
      name: req.body.userName,
      email: req.body.userEmail,
    });
    //after send response on FE
    //!!always need send response otherwise APP
    //will loading intil crashes!!
    res.json({
      message: "User Submited",
    });
  } catch (error) {
    //in model email is unique:
    res.json({
      message: "That Email is already registered",
    });
  }
});
//=========================
//to grab some users that are already on the DB
app.get("/api/users", async (req, res) => {
  try {
    //grab from DB BE all users
    const users = await User.find();
    //& send response to FE
    res.json({
      //json with the name of 'users'
      //& value is 'const users = await User.find();'
      //from DB
      users: users,
    });
  } catch (error) {
    console.log(error);
  }
});

//========================
//=======================
const Port = 5000;
app.listen(Port, () => {
  console.log(`Server runs on port ${Port}`);
});
