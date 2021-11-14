import moment from "moment";

import Layout from "../components/Layout";

export default function Players(props) {
  const p1 = "players_total";
  const p2 = "players_since";

  const total = {
    1: props.fetch(p1, 1),
    7: props.fetch(p1, 7),
    15: props.fetch(p1, 15),
    30: props.fetch(p1, 30),
  };

  const since = {
    1: props.fetch(p2, 1),
    7: props.fetch(p2, 7),
    15: props.fetch(p2, 15),
    30: props.fetch(p2, 30),
  };

  const types = [
    {
      name: "Player Count",
      data: total,
      negative: false,
    },
    {
      name: "Player Count Growth",
      data: since,
      negative: true,
    },
  ];

  const latest = props.analytics[props.analytics.length - 1];
  const sorted = props.analytics.sort((a, b) => a[p1] - b[p1]);

  const hours = {};
  for (const hour of props.analytics) {
    const t = new Date(hour.checked_at).getHours() + 1;
    if (hour[p1] == 0) {
      continue;
    }

    const plyr = parseInt(hour[p1]);

    if (hours[t]) {
      hours[t].push(plyr);
    } else {
      hours[t] = [plyr];
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
      title: "Online Players",
      subtitle: `at ${moment(latest.checked_at).format("DD MMM h:MMa")}`,
      value: latest[p1],
    },
    {
      title: "Most Active",
      subtitle: `Avg. ${highest[1]} players daily`,
      value: `${highest[0] > 12 ? `${highest[0] - 12}pm` : `${highest[0]}am`} UTC`,
    },
    {
      title: "Lowest Peak",
      subtitle: `On ${moment(sorted[0].checked_at).format("DD MMM h:MMa")}`,
      value: sorted[0][p1],
    },
    {
      title: "Highest Peak",
      subtitle: `On ${moment(sorted[sorted.length - 1].checked_at).format("DD MMM h:MMa")}`,
      value: sorted[sorted.length - 1][p1],
    },
    {
      title: "Avg. Players",
      subtitle: "Last 7 days",
      value: Math.round(total["7"].reduce((a, b) => a + b) / total["7"].length),
    },
    {
      title: "Avg. Players",
      subtitle: "Last 15 days",
      value: Math.round(total["15"].reduce((a, b) => a + b) / total["15"].length),
    },
  ];

  return (
    <Layout
      title="Player Analytics"
      cards={cards}
      types={types}
      labels={props.labels}
      index={props.index}
    />
  );
}
