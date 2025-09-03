const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const pool = require('./db');
const authRoutes = require('./auth');
const chatRoutes = require('./chat');
const paymentRoutes = require('./payment');
const { notifyNewOrder } = require('./telegram');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/messages', chatRoutes);
app.use('/payment', paymentRoutes);

// Заказ + уведомление
app.post('/orders', async (req, res) => {
  const { buyer, product } = req.body;
  await pool.query('INSERT INTO orders (buyer_id, product_id) VALUES ($1, $2)', [buyer, product]);
  notifyNewOrder({ buyer, product });
  res.sendStatus(201);
});

// WebSocket чат
io.on('connection', (socket) => {
  socket.on('send_message', async (data) => {
    await pool.query(
      'INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3)',
      [data.sender, data.receiver, data.content]
    );
    io.to(data.receiverSocketId).emit('receive_message', data);
  });
});

server.listen(4000, () => console.log('Backend + WebSocket запущены на http://localhost:4000'));
