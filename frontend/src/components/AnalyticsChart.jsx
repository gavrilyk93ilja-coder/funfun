import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

export default function AnalyticsChart() {
  const data = {
    labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт'],
    datasets: [
      {
        label: 'Количество заказов',
        data: [5, 10, 7, 12, 9],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: true } },
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-2">Аналитика</h2>
      <Line data={data} options={options} />
    </div>
  );
}
