import cookies from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import Modal from "ui/layouts/Modal";
import { ReportServer } from "api/server";
import TextArea from "../components/TextArea";

export default function Report(props) {
  const [parameters, setParameters] = useState({
    report: "",
    proof: "",
  });

  const onReportChange = (e) => {
    setParameters((p) => ({ ...p, report: e.target.value.substring(0, 1000) }));
  };

  const onProofChange = (e) => {
    setParameters((p) => ({ ...p, proof: e.target.value.substring(0, 1000) }));
  };

  const submit = async () => {
    if (parameters.report.length < 50) {
      toast.error("Your report must be over 50 characters!");
      return;
    }
    if (parameters.report.length > 1000) {
      toast.error("Your report must not be over 1000 characters!");
      return;
    }
    if (parameters.proof.length > 1000) {
      toast.error("Your proof must not be over 1000 characters!");
      return;
    }

    const token = cookies.get("token");
    const [response, error] = await ReportServer(
      props.id,
      {
        report: parameters.report,
        proof: parameters.proof || null,
      },
      token
    );

    if (error) {
      if (error.response?.status === 401) {
        toast.error("Please login and try again!");
      } else if (error.response?.status === 409) {
        toast.error("You have already reported this server!");
      } else {
        toast.error("An unknown error occurred!");
      }
      return;
    }

    toast.success("Sent your report!");
    props.showModal(false);
    return;
  };

  return (
    <Modal showModal={props.showModal}>
      <motion.div
        className="flex flex-col items-start justify-start w-[1000px] p-8 space-y-4 2xl:space-y-8 bg-olive-950 border-2 border-olive-930 rounded-md"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <span className="font-medium text-[56px] text-white text-opacity-90">Report Server</span>
        <TextArea label="Reason" value={parameters.report} onChange={onReportChange} />
        <TextArea label="Proof (links/images)" value={parameters.proof} onChange={onProofChange} />
        <div className="flex flex-row items-center justify-center w-full space-x-4">
          <div
            className="flex flex-row items-center justify-center w-full py-2 bg-black bg-opacity-20 rounded hover:bg-opacity-30 transition duration-500 cursor-pointer"
            onClick={() => props.showModal(false)}
          >
            <span className="text-[32px] text-white text-opacity-80">Cancel</span>
          </div>
          <div
            className="flex flex-row items-center justify-center w-full py-2 bg-olive-800 rounded hover:bg-olive-900 transition duration-500 cursor-pointer"
            onClick={submit}
          >
            <span className="text-[32px] text-white text-opacity-80">Submit</span>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
}
