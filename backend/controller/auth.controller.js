import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { genrateTokenAndSetCookie } from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        // 1️⃣ Check if required fields are present
        if (!email || !password || !username) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        // 2️⃣ Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format", success: false });
        }

        // 3️⃣ Check password length
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long", success: false });
        }

        // 4️⃣ Check if email already exists
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ message: "Email already exists", success: false });
        }

        // 5️⃣ Check if username already exists
        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            return res.status(400).json({ message: "Username already exists", success: false });
        }

        // 6️⃣ Assign a random profile picture
        const ProfilePic = ["yo", "no", "ha"];
        const image = ProfilePic[Math.floor(Math.random() * ProfilePic.length)];

        // 7️��� Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 7️⃣ Create new user
        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            image
        });

        if (newUser) {
            genrateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            // 8️⃣ Return success response (without password)
            return res.status(201).json({
                message: "User created successfully",
                success: true,
                user: {
                    ...newUser._doc,
                    password: undefined,  // Hides the password
                }
            });
        }
    } catch (error) {
        console.error("Error in SignUp Controller:", error.message);
        return res.status(500).json({ message: "Server Error", success: false, error: error.message });
    }
};

// Dummy Login & Logout Endpoints
export async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "Invalid credentials", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials", success: false });
    }
    genrateTokenAndSetCookie(user._id, res);

    return res.status(200).json({ message: "Logged In Successfully", success: true, user });
}

export async function logout(req, res) {
    try {
        res.clearCookie("jwt-netflix");
        res.status(200).json({ message: "Logged Out Successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: "Server Error", success: false, error: error.message });
    }
}

export async function authCheck(req, res) {
    try {
        res.status(200).json({success: true , user: req.user});
    } catch (error) {
        console.log("Error in Auth Check Controller ",error.message);
        res.status(500).json({success: false , message: "Internal Server Error"});
    }
}