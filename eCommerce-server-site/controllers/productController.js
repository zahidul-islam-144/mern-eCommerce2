const Products = require("../models/productModel");
const ErrorResponse = require('../utilities/errorResponse');
const catchAsyncError = require('../middlewares/catchAsyncError');


// create product----Admin Access
exports.createProduct = catchAsyncError ( async (req, res, next) => {
  req.body.user = req.user.id
  const newProduct = await Products.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Product created successfully...',
    newProduct
  });
  console.log("Added Product: ", newProduct);
});

// get all products----
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const allProducts = await Products.find();
  res.status(200).json({
    success: true,
    allProducts,
  });
  console.log("Total products: ", allProducts.length);
});

// get single products
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const selectProduct = await Products.findById(req.params.id);
  if (!selectProduct) {
    return next(new ErrorResponse("Product not found !", 404));
    // return res.status(404).json({
    //   success: false,
    //   message: "Product not found !",
    // });
  }
  res.status(200).json({
    success: true,
    message: 'Product found.',
    selectProduct
  })
});

//update product----Admin Access
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let selectProduct = await Products.findById(req.params.id);

  if (!selectProduct) {
    return next(new ErrorResponse("Product not found !", 404));
  }
  selectProduct = await Products.updateOne(selectProduct, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Product updated successfully...",
    selectProduct,
  });
  console.log("Product updated successfully...", selectProduct);
});

// delete product----Admin Access
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let selectProduct = await Products.findById(req.params.id);
  if (!selectProduct) {
    return next(new ErrorResponse("Product not found !", 404));
  }
  const result = await Products.deleteOne({ _id: selectProduct });
  res.status(200).json({
    success: true,
    message: "Product deleted successfully...",
  });
});
