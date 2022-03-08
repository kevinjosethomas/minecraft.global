import cookies from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";
import Dropzone from "react-dropzone";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import Modal from "ui/layouts/Modal";
import Input from "../components/Input";
import { CreateNewProduct } from "api/advertisements";

export default function NewProduct(props) {
  const router = useRouter();

  const [image, setImage] = useState();
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const submit = async () => {
    if (!name) {
      toast.error("You must provide a name!");
      return;
    }
    if (name.length < 4) {
      toast.error("The name must be atleast 4 characters long!");
      return;
    }
    if (name.length > 32) {
      toast.error("The name must be under 32 characters!");
      return;
    }
    if (!link) {
      toast.error("You must provide a link!");
      return;
    }
    if (!image) {
      toast.error("You must provide an image!");
      return;
    }

    let formattedLink = link;

    if (
      !formattedLink.startsWith("http") &&
      !formattedLink.startsWith("https")
    ) {
      formattedLink = `https://${link}`;
    }

    const token = cookies.get("token");
    const [response, error] = await CreateNewProduct(
      name,
      formattedLink,
      image,
      token
    );

    if (error) {
      switch (error?.response?.status) {
        case 403:
          toast.error("You cannot have more than 8 products!");
          break;
        case 415:
          toast.error("Invalid image provided!");
          break;
        case 422:
          toast.error("Invalid information provided!");
          break;
        default:
          toast.error("An unknown error occured!");
          break;
      }
      return;
    }

    props.showModal(false);
    router.push("/advertise/banner?screen=products");
  };

  return (
    <Modal showModal={props.showModal}>
      <motion.div
        className="flex max-h-[90%] w-11/12 flex-col space-y-4 overflow-y-scroll rounded-lg border-2 border-olive-940 bg-olive-950 p-6 md:w-auto md:space-y-6"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h1 className="text-3xl font-medium text-white text-opacity-90 md:text-4xl">
          Create Advertisement
        </h1>
        <div className="flex flex-col items-start justify-start space-y-3 md:space-y-5">
          <Input
            value={name}
            label="Advertisement Name"
            description="A name for your advertisement (only be visible to you)"
            onChange={(e) => setName(e.target.value.substring(0, 32))}
          />
          <Input
            value={link}
            label="Advertisement Link"
            description="The website to redirect people who click your ad to"
            onChange={(e) => setLink(e.target.value)}
          />
          <DropFiles image={image} setImage={setImage} />
        </div>
        <div className="flex w-full items-center justify-end space-x-2">
          <div
            className="flex cursor-pointer items-center justify-center rounded-lg bg-olive-920 px-6 py-2 transition duration-300 hover:bg-olive-910"
            onClick={() => props.showModal(false)}
          >
            <p className="select-none text-xl text-white text-opacity-90">
              Cancel
            </p>
          </div>
          <div
            className="flex cursor-pointer items-center justify-center rounded-lg bg-olive-800 px-6 py-2 transition duration-300 hover:bg-olive-600"
            onClick={submit}
          >
            <p className="select-none text-xl text-white text-opacity-90">
              Submit
            </p>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
}

function DropFiles(props) {
  const onDrop = (file) => {
    props.setImage(
      Object.assign(file[0], { preview: URL.createObjectURL(file[0]) })
    );
  };

  return (
    <div className="flex w-full flex-col space-y-3">
      <div className="flex flex-col items-start justify-start">
        <p className="text-xl text-white text-opacity-80 md:text-2xl">
          Advertisement Banner Image
        </p>
        <p className="leading-tight text-white text-opacity-60 md:text-lg">
          Click or drag and drop an image to upload
        </p>
      </div>
      {props.image ? (
        <div className="relative flex w-full items-center justify-center rounded-lg border-2 border-white border-opacity-10 bg-white bg-opacity-5 p-10">
          <div
            className="absolute z-10 flex h-full w-full cursor-pointer items-center justify-center bg-olive-940 opacity-0 transition duration-300 hover:opacity-100"
            onClick={() => props.setImage(null)}
          >
            <i className="fas fa-trash text-4xl text-white text-opacity-80" />
          </div>
          <img
            src={props.image.preview}
            alt="Your Banner Image"
            className="h-[200px] w-[800px]"
          />
        </div>
      ) : (
        <Dropzone
          onDrop={onDrop}
          accept={["image/png", "image/jpeg"]}
          multiple={false}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              className="flex h-40 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-white border-opacity-10 bg-white bg-opacity-5"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <i
                className={`${
                  isDragActive ? "fas fa-clone" : "fas fa-file-plus"
                } text-4xl text-white text-opacity-50`}
              />
            </div>
          )}
        </Dropzone>
      )}
    </div>
  );
}
