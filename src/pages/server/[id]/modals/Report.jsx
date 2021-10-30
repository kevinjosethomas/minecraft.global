import { useState } from "react";

import Modal from "ui/layouts/Modal";
import TextArea from "../components/TextArea";

export default function Report(props) {
  const [parameters, setParameters] = useState({
    reason: "",
    proof: "",
  });

  const onReasonChange = (e) => {
    setParameters((p) => ({ ...p, reason: e.target.value.substring(0, 250) }));
  };

  const onProofChange = (e) => {
    setParameters((p) => ({ ...p, proof: e.target.value.substring(0, 250) }));
  };

  return (
    <Modal showModal={props.showModal}>
      <div
        className="flex flex-col items-start justify-start w-[1000px] p-8 space-y-8 bg-olive-950 border-2 border-olive-930 rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-medium text-[56px] text-white text-opacity-90">Report Server</span>
        <div className="flex flex-col items-start justify-start space-y-8">
          <TextArea label="Reason" value={parameters.reason} onChange={onReasonChange} />
          <TextArea
            label="Proof (links/images)"
            value={parameters.proof}
            onChange={onProofChange}
          />
        </div>
        <div className="flex flex-row items-center justify-center w-full space-x-4">
          <div
            className="flex flex-row items-center justify-center w-full py-2 bg-black bg-opacity-20 rounded hover:bg-opacity-30 transition duration-500 cursor-pointer"
            onClick={() => props.showModal(false)}
          >
            <span className="text-[32px] text-white text-opacity-80">Cancel</span>
          </div>
          <div className="flex flex-row items-center justify-center w-full py-2 bg-olive-800 rounded hover:bg-olive-900 transition duration-500 cursor-pointer">
            <span className="text-[32px] text-white text-opacity-80">Submit</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
