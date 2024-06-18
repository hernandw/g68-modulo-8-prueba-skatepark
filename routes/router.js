import express from "express";
import { controller as com } from "../controllers/controller.js";
const router = express.Router();

router.get("/", com.home);

router.get("/about", com.about);

router.get("/contact", com.contactForm);

router.get("/login", com.loginForm);

router.get("/register", com.registerForm);

router.get("/update", com.updateForm);

router.get("/admin", com.admin);

router.post("/register", com.register);







router.get("*", com.notFound);
export default router;
