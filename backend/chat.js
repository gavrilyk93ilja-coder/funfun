const express = require('express');
const pool = require('./db');
const router = express.Router();

router.post('/', async (req, res) => {
  const { sender_id, receiver_id, content } = req.body;
  await pool.query('INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3)', [sender_id, receiver_id, content]);
  res.sendStatus(201);
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const result = await pool.query(
    'SELECT * FROM messages WHERE sender_id = $1 OR receiver_id = $1 ORDER BY timestamp',
    [userId]
  );
  res.json(result.rows);
});

module.exports = router;
