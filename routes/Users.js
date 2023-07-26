import express from "express";

import { login, signup,PasswordReset } from "../controllers/auth.js";
import { getAllUsers, updateProfile } from "../controllers/Users.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post('/sendpasswordlink',PasswordReset)


router.get("/getAllUsers", getAllUsers);
router.patch("/update/:id", auth, updateProfile);


export default router;