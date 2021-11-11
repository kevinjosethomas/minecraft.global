import { Line } from "react-chartjs-2";

export default function Chart(props) {
  return (
    <Line
      data={props.data}
      options={{
        ...props.options,
        elements: {
          line: {
            tension: 0.4,
          },
          point: {
            radius: 0,
          },
        },
        scale: {
          ticks: { precision: props.precision, autoSkip: true, maxTicksLimit: props.duration },
        },
        plugins: { legend: { display: false } },
      }}
    />
  );
}
