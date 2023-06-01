const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const pool = require("../connection");
const { json } = require("express");

dotenv.config();
process.env.TOKEN_SECRET;

const generateAccessToken = (email) => {
  return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: "120s" });
};

// const getStudents = (req, res) => {
//     pool.query("SELECT * FROM users", (error, results) => {
//         if (error) throw error;
//         res.status(200).json(results.rows);
//     });
// }

const validateEmail = (email) => {
  const regex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return email.match(regex) ? true : false;
};

const addUser = async (req, res) => {
  try {
    let usernameTaken = await userExists(req.body.username);
    let emailTaken = await emailExists(req.body.email);

    if (usernameTaken === true) {
      res.status(400).json({ error: "user already exists" });
    } else if (emailTaken === true) {
      res.status(400).json({ error: "user with this email already exists" });
    } else if (!validateEmail(req.body.email)) {
      res.status(400).json({ error: "not a valid email address" });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = await pool.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
        [req.body.username, req.body.email, hashedPassword]
      );
      res.json({
        username: newUser.rows[0].username,
        email: newUser.rows[0].email,
      });
    }
  } catch (error) {
    throw error;
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (users.rows.length === 0)
      return res.status(401).json({ error: "Email is incorrect" });

    const validPassword = await bcrypt.compare(
      password,
      users.rows[0].password
    );

    if (!validPassword)
      return res.status(401).json({ error: "Incorrect password" });

    // return res.status(200).json("Success");
    const token = generateAccessToken({ email });
    return res.json(token);
  } catch (error) {
    throw error;
  }
};

const userExists = async (username) => {
  const len = await pool.query("SELECT * FROM users WHERE (username = $1)", [
    username,
  ]);
  return len.rows.length > 0;
};

const emailExists = async (email) => {
  const len = await pool.query("SELECT * FROM users WHERE (email = $1)", [
    email,
  ]);
  return len.rows.length > 0;
};

module.exports = {
  addUser,
  login,
};
