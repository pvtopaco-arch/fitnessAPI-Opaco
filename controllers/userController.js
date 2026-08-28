const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "fitnessSecret123";

// REGISTER
const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({
                message: "Email and password are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).send({
                message: "Email already exists"
            });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(201).send({
            message: "Registered Successfully"
        });

    } catch (error) {
        console.error("REGISTER ERROR:", error);

        return res.status(500).send({
            message: "Internal Server Error"
        });
    }
};


// LOGIN 
const login = async (req, res) => { 
    try { 
        const { email, password } = req.body; 
 
        if (!email || !password) { 
            return res.status(400).send({ 
                message: "Email and password are required" 
            }); 
        } 
 
        const user = await User.findOne({ email }); 
 
        if (!user) { 
            return res.status(404).send({ 
                message: "User not found" 
            }); 
        } 
 
        const isPasswordCorrect = bcrypt.compareSync( 
            password, 
            user.password 
        ); 
 
        if (!isPasswordCorrect) { 
            return res.status(401).send({ 
                message: "Incorrect email or password" 
            }); 
        } 
 
        const accessToken = jwt.sign( 
            { 
                id: user._id 
            }, 
            JWT_SECRET, 
            { 
                expiresIn: "1d" 
            } 
        ); 
 
        return res.status(200).send({ 
            access: accessToken, 
            token: accessToken 
        }); 
 
    } catch (error) { 
        console.error("LOGIN ERROR:", error); 
 
        return res.status(500).send({ 
            message: "Internal Server Error" 
        }); 
    } 
};


// GET USER DETAILS
const getDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select("-password");

        if (!user) {
            return res.status(404).send({
                message: "User not found"
            });
        }

        return res.status(200).send({
            user
        });

    } catch (error) {
        console.error("DETAILS ERROR:", error);

        return res.status(500).send({
            message: "Internal Server Error"
        });
    }
};


module.exports = {
    register,
    login,
    getDetails
};