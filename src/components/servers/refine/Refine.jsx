import { useEffect, useState } from "react";

import Sort from "./components/Sort";
import Filter from "./components/Filter";
import refineOptionsData from "../../../data/refine";

function Refine(props) {
  const [refineOptions, setRefineOptions] = useState(refineOptionsData);

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
    <div className="sticky top-20 flex flex-col items-start justify-center space-y-5">
      <h1 className="font-bold text-4xl text-gray-300">Refine</h1>
      <div className="flex flex-col items-start justify-center space-y-10">
        <Sort options={refineOptions} setOptions={setRefineOptions} />
        <Filter options={refineOptions} setOptions={setRefineOptions} />
      </div>
    </div>
  );
}

export default Refine;
