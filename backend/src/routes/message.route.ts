import express , {Router} from "express";
import { getMessage, sendMessage } from "../controllers/message.controller";
import { protect } from "../middlewares/auth";


const router : Router = express.Router();


router.post("/:username" ,protect, sendMessage)
router.get("/lol/:id"  , protect , getMessage)

export default router ; 