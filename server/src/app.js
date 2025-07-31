const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");
// const User = require("./models/user");
const User = require("./models/user.js");
const { validateSignupData } = require("./utils/validation.jsx");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth.js");
const authRouter =require("./utils/auth.js");
const cors = require("cors");
const profileRouter = require("./utils/profile.js");
const marketRouter = require("./utils/market.js");
const app = express();
app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))


app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",marketRouter)





connectDB()
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
