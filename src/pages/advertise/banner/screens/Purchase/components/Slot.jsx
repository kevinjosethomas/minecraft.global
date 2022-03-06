import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

import Purchase from "../modals/Purchase";

export default function Slot(props) {
  const start = moment(props.starts_at).local();
  const end = moment(props.starts_at).local().add(7, "days");

  const [modal, showModal] = useState(false);

  const onClick = (type) => {
    if (props.products.length === 0) {
      toast.error("You must create a product to advertise before you can buy!");
      return;
    }

    showModal(type);
  };

  return (
    <div className="flex flex-col items-center space-y-1 md:flex-row md:justify-between md:space-y-0">
      <AnimatePresence>
        {modal && (
          <Purchase
            type={modal}
            week_id={props.week_id}
            showModal={showModal}
            products={props.products}
            prices={props.prices}
            start={start}
            end={end}
          />
        )}
      </AnimatePresence>
      <p className="text-2xl text-white text-opacity-80">
        Week: {start.format("MMM Do")} → {end.format("MMM Do")}
      </p>
      <div className="flex w-full justify-between md:w-auto md:justify-start md:space-x-6">
        <div className="flex items-center justify-center md:w-[200px]">
          {props.slot_vote_page ? (
            <p className="text-xl font-bold text-olive-500">
              {props.products.filter(
                (x) => x.product_id == props.slot_vote_page
              ).length
                ? "Purchased by you"
                : "Sold"}
            </p>
          ) : (
            <Button
              price={props.prices.vote_page}
              onClick={() => onClick("vote")}
            />
          )}
        </div>
        <div className="flex items-center justify-center md:w-[200px]">
          {props.slot_home_page ? (
            <p className="text-xl font-bold text-olive-500">
              {props.products.filter(
                (x) => x.product_id == props.slot_home_page
              ).length
                ? "Purchased by you"
                : "Sold"}
            </p>
          ) : (
            <Button
              price={props.prices.home_page}
              onClick={() => onClick("home")}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function Button(props) {
  return (
    <div
      className="flex cursor-pointer items-center rounded bg-olive-900 px-4 py-2 transition duration-300 hover:bg-olive-800"
      onClick={props.onClick}
    >
      <p className="select-none text-lg text-white md:text-xl">
        Buy for ${props.price}
      </p>
    </div>
  );
}
