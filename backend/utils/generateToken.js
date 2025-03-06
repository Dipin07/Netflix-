import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const genrateTokenAndSetCookie = (userId, res) => {

    const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: '15d' });


    res.cookie('jwt-netflix', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, // only accessible via HTTP (not HTTPS)
        secure: ENV_VARS.NODE_ENV !== "development", // only send the cookie if the request is made over HTTPS
        sameSite: 'strict', // only send the cookie if the request is made over HTTPS
    })
    return token;
}