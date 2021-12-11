import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

import Default from "ui/layouts/Default";
import { GetDefaultData } from "api/core";
import { GetLoggedInUser } from "api/login";

const socials = [
  {
    icon: "fab fa-discord",
    href: "https://discord.minecraft.global",
  },
  {
    icon: "fab fa-twitter",
    href: "https://discord.minecraft.global",
  },
  {
    icon: "far fa-envelope",
    href: "https://discord.minecraft.global",
  },
];

const questions = [
  {
    question: "How do I add my server to the server list?",
    answer: (
      <Fragment>
        You can add your Minecraft server by filling out the form{" "}
        <Link href="/server/add">
          <a>here</a>
        </Link>{" "}
        when you are logged in!
      </Fragment>
    ),
  },
  {
    question: "Someone else added my server to the site! What can I do about it?",
    answer: (
      <Fragment>
        Unfortunately, there is no way to determine who actually owns a server :( To claim
        ownership, you can report the server on the server page or join our{" "}
        <a href="https://discord.minecraft.global" target="_blank" rel="noreferrer nofollow">
          Discord server
        </a>{" "}
        and create a ticket (for faster action)
      </Fragment>
    ),
  },
];

export default function Support(props) {
  return (
    <Default
      user={props.user}
      defaultResults={props.defaultResults}
      title="Support - Minecraft Server List"
      search
    >
      <div className="flex flex-col items-start justify-start w-full space-y-10">
        <div className="flex flex-col items-start justify-start w-full space-y-3">
          <h3 className="font-bold text-5xl text-white text-opacity-90 tracking-tight">
            Contact us <i className="fas fa-caret-down ml-2 text-4xl" />
          </h3>
          <div className="grid grid-cols-3 items-start justify-start w-full gap-x-10">
            {socials.map((social, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center py-16 bg-olive-940 hover:bg-olive-930 border-2 border-olive-920 cursor-pointer rounded-md transition duration-500"
              >
                <i className={`${social.icon} text-5xl text-white text-opacity-90`} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full space-y-3">
          <h3 className="font-bold text-5xl text-white text-opacity-90 tracking-tight">
            FAQ <i className="fas fa-caret-down ml-2 text-4xl" />
          </h3>
          <div className="flex flex-col items-start justify-start w-full space-y-2">
            {questions.map((question, index) => (
              <Question key={index} {...question} />
            ))}
          </div>
        </div>
      </div>
    </Default>
  );
}

function Question(props) {
  const controls = useAnimation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      controls.start({ rotate: 0 });
    } else {
      controls.start({
        rotate: 180,
      });
    }
  }, [open]);

  return (
    <div className="flex flex-col items-start justify-start w-full space-y-0.5">
      <div
        className={`flex flex-row items-center justify-between w-full p-5 bg-olive-920 cursor-pointer ${
          open ? "rounded-t-lg" : "rounded-lg"
        }`}
        onClick={() => setOpen((o) => !o)}
      >
        <p className="text-2xl text-white text-opacity-80 select-none">{props.question}</p>
        <motion.i
          animate={controls}
          className="far fa-angle-down text-2xl text-white text-opacity-80"
        />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className={`flex flex-row items-start justify-start w-full bg-olive-950 rounded-b-lg`}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.1 }}
          >
            <p className="p-5 text-xl text-white text-opacity-80 format-links select-none">
              {props.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const [user, data] = await Promise.all([GetLoggedInUser(ctx), GetDefaultData(ctx)]);

    if (data[1]) {
      return {
        props: {
          error: data[1].response?.status || 500,
        },
      };
    }

    if (user[1]) {
      return {
        props: {
          defaultResults: data[0],
        },
      };
    } else {
      return {
        props: {
          user: user[0],
          defaultResults: data[0],
        },
      };
    }
  } catch (e) {
    console.log(e);
    return {
      props: {
        error: 500,
      },
    };
  }
}
