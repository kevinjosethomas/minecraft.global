import moment from "moment";

import Layout from "../components/Layout";

export default function Pageviews(props) {
  const p1 = "views_total";
  const p2 = "views_since";

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
      name: "Pageview Count",
      data: total,
      negative: false,
    },
    {
      name: "Pageview Count Change",
      data: since,
      negative: true,
    },
  ];

  const latest = props.analytics[props.analytics.length - 1];
  const sorted = props.analytics.sort((a, b) => a[p2] - b[p2]);

  const cards = [
    {
      title: "Total Pageviews",
      subtitle: `at ${moment(latest.checked_at).format("DD MMM h:MMa")}`,
      value: latest[p1],
    },
    {
      title: "New Pageviews",
      subtitle: "Last 1 hour",
      value: latest[p2],
    },
    {
      title: "Lowest Peak",
      subtitle: `On ${moment(sorted[0].checked_at).format("DD MMM h:MMa")}`,
      value: sorted[0][p2],
    },
    {
      title: "Highest Peak",
      subtitle: `On ${moment(sorted[sorted.length - 1].checked_at).format("DD MMM h:MMa")}`,
      value: sorted[sorted.length - 1][p2],
    },
    {
      title: "Avg. Pageviews",
      subtitle: "Every hour (last 15d)",
      value: Math.round(since["15"].reduce((a, b) => a + b) / total["15"].length),
    },
    {
      title: "Avg. Pageviews",
      subtitle: "Every hour (last 30d)",
      value: Math.round(since["30"].reduce((a, b) => a + b) / total["30"].length),
    },
  ];

  return (
    <Layout
      title="Pageviews"
      cards={cards}
      types={types}
      labels={props.labels}
      index={props.index}
    />
  );
}
