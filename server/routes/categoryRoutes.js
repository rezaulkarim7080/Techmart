import express from "express";

import { isAdmin, isAuthenticatedUser } from "../middleware/auth.js";
import { categoryControlller, createCategoryController, deleteCategoryCOntroller, singleCategoryController, updateCategoryController } from "../controllers/categoryController.js";

const router = express.Router();


// create category
router.post("/create-category", isAuthenticatedUser, isAdmin, createCategoryController);

//update category
router.put("/update-category/:id", isAuthenticatedUser, isAdmin, updateCategoryController);

//getALl category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete("/delete-category/:id", isAuthenticatedUser, isAdmin, deleteCategoryCOntroller);

export default router;
