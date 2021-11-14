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

  const hours = {};
  for (const hour of props.analytics) {
    const t = new Date(hour.checked_at).getHours() + 1;
    if (hour[p1] == 0) {
      continue;
    }

    const mem = Math.ceil(parseInt(hour[p1]) / 1000000);

    if (hours[t]) {
      hours[t].push(mem);
    } else {
      hours[t] = [mem];
    }
  }

  let highest = [1, 0];

  for (const hour of Object.keys(hours)) {
    const val = hours[hour];
    const avg = val.reduce((a, b) => a + b) / val.length;

    hours[hour] = avg;

    if (avg > highest[1]) {
      highest = [hour, avg];
    }
  }

  const cards = [
    {
      title: "Current Size",
      subtitle: `at ${moment(latest.checked_at).format("DD MMM h:MMa")}`,
      value: `${Math.round(latest[p1] / 1000000)}mb`,
    },
    {
      title: "Size 30d Ago",
      subtitle: `On ${moment(props.analytics[0].checked_at).format("DD MMM h:MMa")}`,
      value: `${props.analytics[0][p1]}mb`,
    },
    {
      title: "Lowest Peak",
      subtitle: `On ${moment(sorted[0].checked_at).format("DD MMM h:MMa")}`,
      value: sorted[0][p1],
    },
    {
      title: "Highest Peak",
      subtitle: `On ${moment(sorted[sorted.length - 1].checked_at).format("DD MMM h:MMa")}`,
      value: `${Math.ceil(sorted[sorted.length - 1][p1] / 1000000)}mb`,
    },
    {
      title: "Avg. Size",
      subtitle: "Every hour (last 15d)",
      value: `${Math.round(
        total["15"].filter((x) => x).reduce((a, b) => a + b) / total["15"].filter((x) => x).length
      )}mb`,
    },
    {
      title: "Avg. Size",
      subtitle: "Every hour (last 30d)",
      value: `${Math.round(
        total["30"].filter((x) => x).reduce((a, b) => a + b) / total["30"].filter((x) => x).length
      )}mb`,
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
