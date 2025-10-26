import express , {Router} from "express";
import { protect } from "../middlewares/auth";
import { getNotification, markAsRead } from "../controllers/notification.controller";

const route: Router = express.Router();


route.get("/" , protect , getNotification);
route.put("/read" , protect , markAsRead);


export default route;