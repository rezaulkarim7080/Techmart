import express from "express";
import { isAdmin, isAuthenticatedUser } from "../middleware/auth.js";
import { UserControlller, deleteUserCOntroller, forgotPassword, getAllOrdersController, getOrdersController, loginUser, orderStatusController, registerUser, singleUserController, updateProfileController, updateUserController, } from "../controllers/userController.js";



const router = express.Router();


router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/forgot-password", forgotPassword);


// //protected user route auth
router.get("/user-auth", isAuthenticatedUser, (req, res) => {
    res.status(200).send({ ok: true });
});

// //protected Admin route auth
router.get("/admin-auth", isAuthenticatedUser, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

// //update profile
router.put("/profile", isAuthenticatedUser, updateProfileController);

// // user orders
router.get("/orders", isAuthenticatedUser, getOrdersController);

// //isAdmin all orders
router.get("/all-orders", isAuthenticatedUser, isAdmin, getAllOrdersController);

// //isAdmin  order status update
router.put(
    "/order-status/:orderId",
    isAuthenticatedUser,
    isAdmin,
    orderStatusController
);




// /////////////// ADMIN get all user 

//update user
router.put("/user/:id", updateUserController);

//getALl users
router.get("/users", UserControlller);

//single user
router.get("/user/:slug", singleUserController);

//delete user
router.delete("/user/:id", deleteUserCOntroller);

export default router;
