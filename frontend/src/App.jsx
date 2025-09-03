import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Line } from 'react-chartjs-2';

const socket = io('http://localhost:4000');

function App() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [form, setForm] = useState({ title: '', price: '', game: '' });

  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then(res => res.json())
      .then(data => setProducts(data));

    fetch('http://localhost:4000/messages/1')
      .then(res => res.json())
      .then(data => setChat(data));

    socket.on('receive_message', (data) => {
      setChat(prev => [...prev, data]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit('send_message', {
      sender: 1,
      receiver: 2,
      content: message,
      receiverSocketId: 'target-id'
    });
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:4000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    window.location.reload();
  };

  const chartData = {
    labels: ['Пн', 'Вт', 'Ср'],
    datasets: [{ label: 'Заказы', data: [5, 10, 7], borderColor: 'blue' }]
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Маркетплейс FunFun</h1>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input className="border p-2 w-full" placeholder="Название" onChange={e => setForm({ ...form, title: e.target.value })} />
        <input className="border p-2 w-full" placeholder="Цена" onChange={e => setForm({ ...form, price: e.target.value })} />
        <input className="border p-2 w-full" placeholder="Игра" onChange={e => setForm({ ...form, game: e.target.value })} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Добавить товар</button>
      </form>

      <ul className="space-y-4">
        {products.map(p => (
          <li key={p.id} className="border p-4 rounded">
            <h2 className="text-lg font-semibold">{p.title}</h2>
            <p>Игра: {p.game}</p>
            <p>Цена: {p.price}₴</p>
          </li>
        ))}
      </ul>

      <div>
        <h2 className="text-xl font-bold">Чат</h2>
        <ul>{chat.map((msg, i) => <li key={i}>{msg.content}</li>)}</ul>
        <input value={message} onChange={e => setMessage(e.target.value)} className="border p-2 w-full" />
