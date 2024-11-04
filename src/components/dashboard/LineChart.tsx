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
import { TasksPerDayArray } from "../../interfaces/interfaces";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const labels = tasksPerDayArray.map((task) => task.date);
  const dataCounts = tasksPerDayArray.map((task) => task.count);
  const taskTitles = tasksPerDayArray.map((task) =>
    task.tasks.map((t) => t.title).join(", ")
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: t("label-line-chart"),
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
      <h4 className="text-xl">{t("title-line-chart")}</h4>
      <Line data={data} options={options} />
    </div>
  );
}
