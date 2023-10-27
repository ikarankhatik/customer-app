import express from "express";
import { SignUp, SignIn } from "../controllers/user.js";

const router = express.Router();

// User routes
router.post("/sign-up", SignUp);
router.post('/sign-in', SignIn)

export default router;
