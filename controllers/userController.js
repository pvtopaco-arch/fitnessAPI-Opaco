const bcrypt = require("bcrypt");
const User = require("../models/User");
const { createAccessToken } = require("../auth/auth");

// POST /users/register
module.exports.registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ message: "Email and password are required." });
        }

        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailFormat.test(email)) {
            return res.status(400).send({ message: "Invalid email format." });
        }

        if (password.length < 8) {
            return res.status(400).send({ message: "Password must be at least 8 characters long." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ message: "Email already registered." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            email,
            password: hashedPassword
        });

        return res.status(201).send({ message: "Registered Successfully" });

    } catch (error) {
        return res.status(500).send({ message: "Error registering user.", error: error.message });
    }
};

// POST /users/login
module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ message: "Email and password are required." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "No user found with that email." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).send({ message: "Incorrect email or password." });
        }

        const token = createAccessToken(user);
        return res.status(200).send({ access: token, token });

    } catch (error) {
        return res.status(500).send({ message: "Error logging in.", error: error.message });
    }
};

// GET /users/details
module.exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        return res.status(200).send({ user });

    } catch (error) {
        return res.status(500).send({ message: "Error retrieving user details.", error: error.message });
    }
};
