import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.get('/all', isAuthenticated, (req, res) => {
    res.json({message: 'all student'})
})
export default router