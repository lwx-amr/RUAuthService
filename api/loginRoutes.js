import express from "express";
import { login } from "../service/loginController";

const router = express.Router();

router.get("/login", (req, res) => {
    res.json("Hello, we are very happy that you're here");
});
router.post("/login", login);

module.exports = router;
