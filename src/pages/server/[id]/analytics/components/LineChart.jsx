import { Line } from "react-chartjs-2";

export default function Chart(props) {
  return (
    <Line
      data={props.data}
      options={{
        ...props.options,
        elements: {
          line: {
            tension: 0,
          },
          point: {
            radius: 0,
          },
        },
        scale: {
          ticks: { precision: props.precision },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#82B398",
              maxTicksLimit: props.duration === 1 ? 24 : props.duration,
            },
          },
          y: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#82B398",
            },
            beginAtZero: !props.negative,
          },
        },
        hover: {
          intersect: false,
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            displayColors: false,
            backgroundColor: "#2E5841",
            borderColor: "#1D3729",
            borderWidth: 2,
          },
        },
      }}
    />
  );
}
