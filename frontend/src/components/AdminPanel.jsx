import { useEffect, useState } from 'react';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [disputes, setDisputes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/admin/users')
      .then(res => res.json())
      .then(setUsers);

    fetch('http://localhost:4000/admin/disputes')
      .then(res => res.json())
      .then(setDisputes);
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Админ-панель</h2>

      <div>
        <h3 className="font-semibold">Пользователи</h3>
        <ul>
          {users.map(u => (
            <li key={u.id}>{u.username} — {u.role}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold">Арбитраж</h3>
        <ul>
          {disputes.map(d => (
            <li key={d.id}>Заказ #{d.order_id} — {d.reason} — {d.status}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
