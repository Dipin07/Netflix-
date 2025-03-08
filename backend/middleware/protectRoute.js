import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV_VARS } from "../config/envVars.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies['jwt-netflix'];
        if (!token) {
            return res.status(401).json({ message: "Not authorized, token is required", success: false });
        }
        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET)

        if (!decoded) {
            return res.status(401).json({ message: "Invalid token", success: false });
        }

        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(401).json({ message: "User not found", success: false });
        }
        req.user = user;

        next();
    } catch (error) {
        console.log("Error in Protect Route Middleware: ", error.message);

        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

