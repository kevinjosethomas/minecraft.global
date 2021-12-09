import moment from "moment";

import Layout from "../components/Layout";

export default function World(props) {
  const p1 = "world_size_bytes";

  const total = {
    1: props.fetch(p1, 1),
    7: props.fetch(p1, 7),
    15: props.fetch(p1, 15),
    30: props.fetch(p1, 30),
  };

  const types = [
    {
      name: "World Size",
      data: total,
      negative: false,
    },
  ];

  const latest = props.analytics[props.analytics.length - 1];
  const sorted = props.analytics.filter((x) => x).sort((a, b) => a[p1] - b[p1]);

  const size = Math.round(latest[p1] / 1000000);

  const cards = [
    {
      title: "Current Size",
      subtitle: `at ${moment(latest.checked_at).format("DD MMM h:MMa")}`,
      value: `${Math.round(latest[p1] / 10000000) / 100}gb`,
    },
    {
      title: "Size 30d Ago",
      subtitle: `On ${moment(props.analytics[0].checked_at).format("DD MMM h:MMa")}`,
      value: `${Math.round(props.analytics[0][p1] / 10000000) / 100}gb`,
    },
    {
      title: "Lowest Peak",
      subtitle: `On ${moment(sorted[0].checked_at).format("DD MMM h:MMa")}`,
      value: `${Math.round(sorted[0][p1] / 10000000) / 100}gb`,
    },
    {
      title: "Highest Peak",
      subtitle: `On ${moment(sorted[sorted.length - 1].checked_at).format("DD MMM h:MMa")}`,
      value: `${Math.round(sorted[sorted.length - 1][p1] / 10000000) / 100}gb`,
    },
    {
      title: "Avg. Size",
      subtitle: "Every hour (last 15d)",
      value: `${
        Math.round(
          Math.round(
            total["15"].filter((x) => x).reduce((a, b) => a + b) /
              total["15"].filter((x) => x).length
          ) / 10
        ) / 100
      }mb`,
    },
    {
      title: "Avg. Size",
      subtitle: "Every hour (last 30d)",
      value: `${
        Math.round(
          Math.round(
            total["30"].filter((x) => x).reduce((a, b) => a + b) /
              total["30"].filter((x) => x).length
          ) / 10
        ) / 100
      }mb`,
    },
  ];

  return (
    <Layout
      title="World Size"
      cards={cards}
      types={types}
      labels={props.labels}
      index={props.index}
      Ycallback={(label) => `${label}mb`}
    />
  );
}
