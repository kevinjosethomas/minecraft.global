import { useEffect, useState } from "react";

import Sort from "./components/Sort";
import Modal from "./components/Modal";
import Filter from "./components/Filter";
import refineOptionsData from "../../../assets/data/refine";

function Refine(props) {
  const [refineOptions, setRefineOptions] = useState(refineOptionsData);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const newParams = { ...props.params };
    for (let option of refineOptions.sort) {
      if (option.checked) {
        newParams.sort = option.name;
      }
    }
    for (let option of refineOptions.filter) {
      newParams[option.name] = option.checked;
    }
    props.setParams(newParams);
  }, [refineOptions]);

  return (
    <>
      <div className="sticky top-20 hidden 2xl:flex flex-col items-start justify-center space-y-5">
        <h1 className="font-bold text-4xl text-gray-300">Refine</h1>
        <div className="flex flex-col items-start justify-center space-y-10">
          <Sort options={refineOptions} setOptions={setRefineOptions} />
          <Filter options={refineOptions} setOptions={setRefineOptions} />
        </div>
      </div>
      {modal ? (
        <Modal
          options={refineOptions}
          setOptions={setRefineOptions}
          closeModal={() => setModal(false)}
        />
      ) : (
        <div
          className="fixed flex 2xl:hidden flex-col items-center justify-center w-16 h-16 bottom-5 lg:bottom-10 right-5 lg:right-10 z-30 bg-olive-60 hover:bg-olive-70 rounded-full"
          onClick={() => setModal(!modal)}
        >
          <i className="fas fa-sort-shapes-up-alt text-2xl text-gray-200" />
        </div>
      )}
    </>
  );
}

export default Refine;
