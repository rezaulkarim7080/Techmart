import express from "express";

import { isAdmin, isAuthenticatedUser, } from "../middleware/auth.js";

import { brainTreePaymentController, braintreeTokenController, createProduct, deleteProductController, getAllProduct, getSingleProductController, productCategoryController, productCountController, productFiltersController, productListController, realtedProductController, searchProductController, updateProduct } from "../controllers/ProductController.js";




const router = express.Router();


router.post("/create-product", isAuthenticatedUser, isAdmin, createProduct);

router.put("/update-product/:pid", isAuthenticatedUser, isAdmin, updateProduct);

//get products
router.get("/get-product", getAllProduct);

// //single product
router.get("/get-product/:slug", getSingleProductController);

// //delete rproduct
router.delete("/delete-product/:pid", isAuthenticatedUser, isAdmin, deleteProductController);

// //update product
router.put("/products/:pid", isAuthenticatedUser, isAdmin, updateProduct);


// //filter product
router.post("/product-filters", productFiltersController);

// //product count
router.get("/product-count", productCountController);

// //product per page
router.get("/product-list/:page", productListController);

// //search product
router.get("/search/:keyword", searchProductController);

// //similar product
router.get("/related-product/:pid/:cid", realtedProductController);

// //category wise product
router.get("/product-category/:slug", productCategoryController);

// //payments routes
// //token
router.get("/braintree/token", braintreeTokenController);

// //payments
router.post("/braintree/payment", isAuthenticatedUser, brainTreePaymentController);

export default router;

