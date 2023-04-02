const express = require("express");
const productRouter = express.Router();
const { createProduct, getAllProducts, getSingleProduct ,updateProduct, deleteProduct } = require("../controllers/productController");
const { isAuthorized, adminRole } = require("../middlewares/authorization");


// importing product routes

// productRouter.route("/create-product").post(createProduct);
productRouter.post("/create-product", createProduct);
productRouter.get("/all-products",  getAllProducts);
productRouter.get("/single-product/:id",  getSingleProduct);
productRouter.put("/update-product/:id",  updateProduct);
productRouter.delete("/delete-product/:id",  deleteProduct);



/* 
--------------- product routes connection checking ---------------
*/
productRouter.get("/product-router", (req, res) => {
  res.send("Connected to eCommerce's product routes successfully....");
});

module.exports = productRouter;
