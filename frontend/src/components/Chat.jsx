import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

export default function Chat({ userId, receiverId }) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/messages/${userId}`)
      .then(res => res.json())
      .then(data => setChat(data));

    socket.on('receive_message', (data) => {
      setChat(prev => [...prev, data]);
    });

    return () => socket.off('receive_message');
  }, [userId]);

  const sendMessage = () => {
    const data = {
      sender: userId,
      receiver: receiverId,
      content: message,
      receiverSocketId: receiverId // временно, позже можно заменить на socketId
    };
    socket.emit('send_message', data);
    setChat(prev => [...prev, data]);
    setMessage('');
  };

  return (
    <div className="border p-4 rounded">
      <h2 className="text-lg font-bold mb-2">Чат</h2>
      <ul className="mb-2">
        {chat.map((msg, i) => (
          <li key={i} className="text-sm">{msg.sender_id === userId ? 'Вы' : 'Собеседник'}: {msg.content}</li>
        ))}
      </ul>
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        className="border p-2 w-full mb-2"
        placeholder="Введите сообщение"
      />
      <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded">Отправить</button>
    </div>
  );
}
