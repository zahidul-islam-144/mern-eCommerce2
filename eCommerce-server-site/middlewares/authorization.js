const User = require("../models/userModel");
const ErrorResponse = require("../utilities/errorResponse");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");

exports.isAuthorized = catchAsyncError(async (req, res, next) => {
// console.log('💛req.headers["authorization"] ',req.headers["authorization"] )
  const accessToken = req.headers["authorization"]?.split("Bearer ")[1]?.trim();
  if (!accessToken) {
    console.log('💛undef:accessToken')
    return (
      next( new ErrorResponse("Please Login again to access this resource !", 401))
    )
  } else {
    try {
      const decodedJWT = jwt.verify(accessToken, process.env.JWT_SECRET);
      const currenltyLoginUser = await User.findById(decodedJWT.userId).select(
        "-password -salt"
      );
      if (!currenltyLoginUser) {
        return next(new ErrorResponse("User not found with this id.", 404));
      } else {
        req.user = currenltyLoginUser;
        next();
      }
    } catch (error) {
      console.log("💛isAuthorized:", error.name)
      return next(new ErrorResponse(error.message, 401));
    
    }
  }
});

// Admin access
exports.adminRole = (...roles) => {
  console.log(roles);
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `Role: ${req.user.role} is not allowed to access this site ! `,
          403
        )
      );
    }
    next();
  };
};
