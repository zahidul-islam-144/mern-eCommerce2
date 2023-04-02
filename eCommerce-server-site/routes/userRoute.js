const express = require("express");
const userRouter = express.Router();
const { register, login, logout, forgotPassword, getUserDetails, callRfreshTokenToGetAccessToken } = require("../controllers/userController");
const { isAuthorized } = require("../middlewares/authorization");


// userRouter.route("/register").get(register);
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/forgot-password", forgotPassword);
userRouter.get("/logout", logout);
userRouter.get('/refresh-token', callRfreshTokenToGetAccessToken);
userRouter.get("/single-user/:userId", isAuthorized, getUserDetails);


/* 
  user routes connection checking
*/
userRouter.get("/user-router", (req, res) => {
  res.send("Connected to eCommerce's user authentication routes successfully....");
});

module.exports = userRouter;
