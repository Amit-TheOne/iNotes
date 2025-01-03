const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");



// ROUTE 1: Create a user using: POST "/api/auth/createuser". No login required
router.post("/createuser", [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be atleast 5 character long.").isLength({ min: 5 }),
], async (req, res) => {

    let success = false;
    //If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    //Check whether the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt)
        //Create a new User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, process.env.JWT_SECRET);
        // console.log(jwtData);
        // res.json(user);
        success = true;
        res.json({ success, authtoken });

        // .then(user => res.json(user))
        // .catch(err => {console.log(err)
        // res.json({error: "Please enter a unique value for email", message: err.message})})

    }
    //Catching errors and loging them
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})

//ROUTE 2: Autheticate a user using: POST "/api/auth/login". No login required
router.post("/login", [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
], async (req, res) => {

    let success = false;
    //If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Please try to login with correct credientials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        res.json({ success, authtoken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});

// ROUTE 3: Get loggedin user details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;