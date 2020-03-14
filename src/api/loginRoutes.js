import express from "express";
import { login, checkAuthen} from "../service/loginController";

const router = express.Router();

router.get("/login", checkAuthen, (req, res) => {
    res.json("Hello, we are very happy that you're here");
});
router.post("/login", login);

module.exports = router;
