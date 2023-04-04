const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const crypto = require("crypto");

const userId = {
  type: String,
  default: new mongoose.Types.ObjectId(),
  unique: true,
}

const userSchema = new mongoose.Schema({
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  //   unique: true,
  // },
  
  userId:userId,
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },

  userName:{
    type: String,
    unique: true,
    required: [true, "Please Enter userName"],
    maxLength: [15, "Name cannot exceed 15 characters"],
    minLength: [5, "Name should have more than 8 characters"],
  },

  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },

  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },

  salt: {
    type: String,
    select: false,
  },

  role: {
    type: String,
    default: "User",
  },

  userStatus: {
    isRegistered:{
      type: Boolean,
      default: false
    },
    isLogin: {
      type: Boolean,
      default: false
    },
    isAdmin:{
      type: Boolean,
      default: function(){return this.role === 'User' ? false : true}
    },
    loginTime: {
      type: Date,
      default: null
    },
    logoutTime: {
      type: Date,
      default: null
    },
    userCreatedAt: {
      type: Date,
      default: Date.now,
    },
    userDeletedAt: {
      type: Date,
      default: null
    },
    userUpdatedAt: {
      type: Date,
      default: null
    },
  },

  passwordResetToken:{
    type: String,
    unique: true,
    select: true,
    default: null,
    userId: userId,
    tokenCreatedAt:{
      type: Date,
      default: null
    },
    tokenDeletedAt:{
      type: Date,
      default: null
    }
  },

  refreshToken:{
    type: [String],
    default: null
  }

  // resetPasswordToken: String,
  // resetPasswordExpire: Date,
});

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//  this.password = await bcrypt.hash(this.password, 10);
// });

// JWT Token
// userSchema.methods.getJWTToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };

// compare password
// userSchema.methods.comparePassword = async function (password){
//   return await bcrypt.compare(password, this.password);
// }


// Generating Password Reset Token
// userSchema.methods.getResetPasswordToken = function () {
//   // Generating Token
//   const resetToken = crypto.randomBytes(20).toString("hex");

//   // Hashing and adding resetPasswordToken to userSchema
//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

//   return resetToken;
// };

module.exports = mongoose.model("User", userSchema);
