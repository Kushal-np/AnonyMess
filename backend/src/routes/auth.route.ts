import express , {Router} from "express";
import { getMe, login } from "../controllers/auth.controller";
import { protect } from "../middlewares/auth";
 

const router : Router = express.Router();


router.post("/login"  ,  (login))
router.get("/me" , protect , getMe)

export default router ; 