import { Request, Response } from "express";

import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user.model";
import { AuthRequest } from "../middlewares/auth";
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username } = req.body;

        if (!username) {
            res.status(400).json({ error: "Username is required" });
            return;
        }

        let user = await User.findOne({ username });
        if (!user) user = await User.create({ username });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY!, { expiresIn: "7d" });

        res.cookie("token", token, { httpOnly: true, sameSite: "lax" });
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(501).json({
            success: false,
            message: "Internal server error",
            error: (error as Error).message
        })
    }

};



export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        console.log("Hello")
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({
                error: "Not authorized"
            })
        }
        const user: IUser | null = await User.findById(userId).select("-__v");
        if (!user) {
            res.status(404).json({
                error: "User not found"

            });
            return;
        }
        res.status(200).json({ user })
    }
    catch (error) {
        console.error("getMe error:", error);
        res.status(500).json({ error: "Server error" });
    }
}