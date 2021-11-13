import moment from "moment";

import Layout from "../components/Layout";

export default function Players(props) {
  const players_total = {
    1: props.fetch("players_total", 1),
    7: props.fetch("players_total", 7),
    15: props.fetch("players_total", 15),
    30: props.fetch("players_total", 30),
  };

  const players_since = {
    1: props.fetch("players_since", 1),
    7: props.fetch("players_since", 7),
    15: props.fetch("players_since", 15),
    30: props.fetch("players_since", 30),
  };

  const types = [
    {
      name: "Player Count",
      data: players_total,
      negative: false,
    },
    {
      name: "Player Count Growth",
      data: players_since,
      negative: true,
    },
  ];

  const latest = props.analytics[props.analytics.length - 1];
  const sorted = props.analytics.sort((a, b) => a.players_total - b.players_total);

  const cards = [
    {
      title: "Online Players",
      subtitle: `at ${moment(latest.checked_at).format("DD MMM h:MMa")}`,
      value: latest.players_total,
    },
    {
      title: "Player Growth",
      subtitle: "Last 1 hour",
      value: latest.players_since,
    },
    {
      title: "Lowest Peak",
      subtitle: `On ${moment(sorted[0].checked_at).format("DD MMM h:MMa")}`,
      value: sorted[0].players_total,
    },
    {
      title: "Highest Peak",
      subtitle: `On ${moment(sorted[sorted.length - 1].checked_at).format("DD MMM h:MMa")}`,
      value: sorted[sorted.length - 1].players_total,
    },
    {
      title: "Avg. Players",
      subtitle: "Last 7 days",
      value: Math.round(players_total["7"].reduce((a, b) => a + b) / players_total["7"].length),
    },
    {
      title: "Avg. Players",
      subtitle: "Last 15 days",
      value: Math.round(players_total["15"].reduce((a, b) => a + b) / players_total["15"].length),
    },
  ];

  return (
    <Layout
      title="Upvote Analytics"
      cards={cards}
      types={types}
      labels={props.labels}
      index={props.index}
    />
  );
}
