const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const pool = require('../connection');

dotenv.config();
process.env.TOKEN_SECRET;

const generateAccessToken = (username, email) => {
    return jwt.sign({username, email}, process.env.TOKEN_SECRET, {expiresIn: "30s"});
}

const getStudents = (req, res) => {
    pool.query("SELECT * FROM users", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}

const addUser = async (req, res) => {
    try {
        console.log("response!");
        console.log(res);
        let userBool = await userExists(req.body.username, req.body.email);
        if (userBool === true) {
            res.send("user exists");
        } else {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
            [req.body.username, req.body.email, hashedPassword]);
            res.json(newUser.rows);
        }
        
    } catch (error) {
        throw error;
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const users = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        
        if (users.rows.length === 0) return res.status(401).json({error: "Email is incorrect"});
        
        const validPassword = await bcrypt.compare(password, users.rows[0].password);

        if (!validPassword) return res.status(401).json({error: "Incorrect password"});
        
        return res.status(200).json("Success");
    } catch (error) {
        throw error;
    }

}

const userExists = async (username, email) => {
    const len = await pool.query("SELECT * FROM users WHERE (username = $1) OR (email = $2)", [username, email]);
    console.log("LENGTH:");
    console.log(len.rows.length);
    console.log(len.rows.length > 0);
    return len.rows.length > 0;
}

module.exports = {
    getStudents,
    addUser,
    login,
};