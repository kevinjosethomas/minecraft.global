import moment from "moment";
import cookie from "js-cookie";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

import Modal from "ui/layouts/Modal";
import { FetchAdvertisementAnalytics } from "api/advertisements";

export default function Analytics(props) {
  const [passedDays, setPassedDays] = useState();
  const [analytics, setAnalytics] = useState();
  const labels = [];

  for (let i = 0; i < 7; i++) {
    labels.push(
      moment(props.starts_at).local().add(i, "days").format("ddd - D/M")
    );
  }

  useEffect(() => {
    (async () => {
      const token = cookie.get("token");
      const [response, error] = await FetchAdvertisementAnalytics(
        props.week_id,
        props.location,
        token
      );

      if (error) {
        switch (error?.response?.status) {
          case 401:
            toast.error("You do not have permission to do this!");
            break;
          default:
            toast.error("An unknown error occured!");
            break;
        }
        return;
      }

      setAnalytics(response.payload);
      setPassedDays(response.payload.views.filter((x) => x).length);
    })();
  }, []);

  return (
    <Modal showModal={props.showModal}>
      <motion.div
        className="flex max-h-[80%] w-11/12 flex-col overflow-y-auto rounded-lg border-2 border-olive-920 bg-olive-940 p-4 md:w-[1000px] md:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {analytics ? (
          <div className="flex w-full flex-col space-y-4">
            <div className="flex w-full items-center justify-between">
              <h1 className="text-4xl font-medium text-white">
                Advertisement Analytics
              </h1>
              <div
                className="flex cursor-pointer rounded-lg bg-olive-700 px-4 py-1.5 transition duration-300 hover:bg-olive-800"
                onClick={() => props.showModal(false)}
              >
                <p className="select-none text-xl text-white">Close</p>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-xl text-white text-opacity-80 md:text-2xl">
                <span className="font-medium text-white">Product:</span>{" "}
                {props.name}
              </p>
              <p className="text-xl text-white text-opacity-80 md:text-2xl">
                <span className="font-medium text-white">Start:</span>{" "}
                {moment(props.starts_at).local().format("h:ma, MMMM Do YYYY")}
              </p>
              <p className="text-xl text-white text-opacity-80 md:text-2xl">
                <span className="font-medium text-white">Ends:</span>{" "}
                {moment(props.starts_at)
                  .local()
                  .add(7, "days")
                  .format("h:ma, MMMM Do YYYY")}
              </p>
            </div>
            <div className="grid grid-rows-3 gap-y-2 md:grid-cols-3 md:grid-rows-1 md:gap-y-0 md:gap-x-5">
              <Highlight
                label="Impression Count"
                value={analytics.total_views}
                icon="fas fa-eye -right-8"
              />
              <Highlight
                label="Click Count"
                value={analytics.total_clicks}
                icon="fas fa-mouse-pointer right-2"
              />
              <Highlight
                label="Click-Through-Rate"
                value={`${analytics.click_through_rate}%`}
                icon="fas fa-percentage -right-4"
              />
            </div>
            <div className="flex flex-col justify-center space-y-2 overflow-hidden rounded-lg border-2 border-olive-920 bg-olive-930 p-4">
              <h1 className="text-xl font-medium text-white text-opacity-90 md:text-4xl md:text-4xl">
                Advertisement Analytics
              </h1>{" "}
              <Line
                data={{
                  labels: labels,
                  datasets: [
                    {
                      label: "Impressions",
                      data: analytics.views,
                      backgroundColor: "#448361",
                      borderColor: "#2E5841",
                    },
                    {
                      label: "Clicks",
                      data: analytics.clicks,
                      backgroundColor: "#70A889",
                      borderColor: "#448361",
                    },
                  ],
                }}
                options={{
                  scales: {
                    xAxes: {
                      ticks: {
                        color: "rgba(255, 255, 255, 0.8)",
                      },
                    },
                    yAxes: {
                      min: 0,
                      beginAtZero: true,
                      ticks: {
                        precision: 0,

                        color: "rgba(255, 255, 255, 0.8)",
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      labels: {
                        color: "rgba(255, 255, 255, 0.8)",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex w-full items-center justify-center py-40">
            <img src="/images/icons/loading.svg" className="w-32" />
          </div>
        )}
      </motion.div>
    </Modal>
  );
}

function Highlight(props) {
  return (
    <div className="relative flex select-none flex-col justify-center overflow-hidden rounded-lg border-2 border-olive-900 bg-olive-910 p-4">
      <p className="text-2xl text-white text-opacity-80">{props.label}</p>
      <p className="text-5xl font-medium tracking-wider text-white">
        {props.value}
      </p>
      <i
        className={`${props.icon} absolute text-8xl text-white text-opacity-40`}
      />
    </div>
  );
}
