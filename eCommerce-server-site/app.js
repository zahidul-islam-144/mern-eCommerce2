const express = require("express");
const app = express();
const cors = require("cors");
const errorMiddleWare = require("./middlewares/errorMiddleWare");
const cookieParser = require("cookie-parser");
const cookieSession = require('cookie-session');
const bodyParser = require("body-parser");
const helmet = require("helmet");

// middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

/*
--------------  routes --------------
*/

// import route from routes
const productRouter = require("./routes/productRoute");
const userRouter = require('./routes/userRoute');

// register route in the app
app.use('/auth', userRouter);
app.use('/products', productRouter);





// error middleware
app.use(errorMiddleWare);



// app exported
module.exports =  app ;