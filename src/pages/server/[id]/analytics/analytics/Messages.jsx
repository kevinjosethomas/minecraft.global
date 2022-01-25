import moment from "moment";

import Layout from "../components/Layout";

export default function Messages(props) {
  const p1 = "chat_msgs_since";

  const total = {
    1: props.fetch(p1, 1),
    7: props.fetch(p1, 7),
    15: props.fetch(p1, 15),
    30: props.fetch(p1, 30),
  };

  const types = [
    {
      name: "Chat Messages",
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

    const tps = Math.round(parseInt(hour[p1]));

    if (hours[t]) {
      hours[t].push(tps);
    } else {
      hours[t] = [tps];
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
      title: "# Last Hour",
      subtitle: `at ${moment(latest.checked_at).format("DD MMM h:MMa")}`,
      value: Math.round(latest[p1]),
    },
    {
      title: "Most Active",
      subtitle: `Avg. ${highest[1]} msgs at`,
      value: `${
        highest[0] > 12 ? `${highest[0] - 12}pm` : `${highest[0]}am`
      } UTC`,
    },
    {
      title: "Lowest Peak",
      subtitle: `On ${moment(sorted[0].checked_at).format("DD MMM h:MMa")}`,
      value: Math.round(sorted[0][p1]),
    },
    {
      title: "Highest Peak",
      subtitle: `On ${moment(sorted[sorted.length - 1].checked_at).format(
        "DD MMM h:MMa"
      )}`,
      value: Math.round(sorted[sorted.length - 1][p1]),
    },
    {
      title: "Avg. Messages",
      subtitle: "Every hour (last 15d)",
      value: Math.round(
        total["15"].filter((x) => x).reduce((a, b) => a + b) /
          total["15"].filter((x) => x).length
      ),
    },
    {
      title: "Avg. Messages",
      subtitle: "Every hour (last 30d)",
      value: Math.round(
        total["30"].filter((x) => x).reduce((a, b) => a + b) /
          total["30"].filter((x) => x).length
      ),
    },
  ];

  return (
    <Layout
      title="Chat Messages"
      cards={cards}
      types={types}
      labels={props.labels}
      index={props.index}
    />
  );
}
