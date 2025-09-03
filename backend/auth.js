const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db');
const router = express.Router();
const SECRET = 'your_jwt_secret';

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await pool.query('INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4)', [username, email, hash, 'user']);
  res.sendStatus(201);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];
  if (!user || !(await bcrypt.compare(password, user.password_hash))) return res.sendStatus(401);
  const token = jwt.sign({ id: user.id, role: user.role }, SECRET);
  res.json({ token });
});

module.exports = router;
