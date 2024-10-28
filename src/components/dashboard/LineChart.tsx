import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { TasksPerDayArray } from "../../interfaces";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
);

interface Props {
  tasksPerDayArray: TasksPerDayArray[];
}

export function LineChart({ tasksPerDayArray }: Props) {
  const labels = tasksPerDayArray.map((task) => task.date);
  const dataCounts = tasksPerDayArray.map((task) => task.count);
  const taskTitles = tasksPerDayArray.map((task) =>
    task.tasks.map((t) => t.title).join(", ")
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Tasks per Day",
        data: dataCounts,
        fill: true,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems: any) => {
            const index = tooltipItems[0].dataIndex;
            return labels[index];
          },
          label: (tooltipItem: any) => {
            const index = tooltipItem.dataIndex;
            const taskInfo = `${taskTitles[index]}`;
            return taskInfo;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-xl">Completed Tasks this Month</h4>
      <Line data={data} options={options} />
    </div>
  );
}
