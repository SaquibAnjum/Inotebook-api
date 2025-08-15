const express = require('express'); // login, register
const User = require('../models/User'); // schema call 
const router = express.Router(); // api bnane ke liye
const bcrypt = require('bcryptjs'); // hash password
var jwt = require('jsonwebtoken'); // auth token return after login 

const JWT_SECRET = 'Harryisagoodb$oy'; // help to create token

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

router.get('/user', authenticateToken, async (req, res) => {
    const userEmail = req.user;
    try {
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ success: true, user });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// register
router.post('/createuser', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // check user with req.body.email 
        let user = await User.findOne({ email: email });

        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt); // hash form password

        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });
        
        // register completed
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET); //auth token created
        success = true;
        res.json({ success, authtoken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/login', async (req, res) => {
    let success = false;
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const authtoken = jwt.sign(email, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router