const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getProfile } = require("../controllers/user");
const { verify } = require("../auth/auth");

// POST /users/register
router.post("/register", registerUser);

// POST /users/login
router.post("/login", loginUser);

// GET /users/details
router.get("/details", verify, getProfile);

module.exports = router;
