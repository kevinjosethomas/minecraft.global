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
    href: "https://twitter.com/mcdotglobal",
  },
  {
    icon: "far fa-envelope",
    href: "mailto:team@minecraft.global",
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
    question:
      "Someone else added my server to the site! What can I do about it?",
    answer: (
      <Fragment>
        Unfortunately, there is no easy way to determine who actually owns a
        server :( To claim ownership, you can report the server on the server
        page or join our{" "}
        <a
          href="https://discord.minecraft.global"
          target="_blank"
          rel="noreferrer nofollow"
        >
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
      <div className="flex w-full flex-col items-start justify-start space-y-10">
        <div className="flex w-full flex-col items-start justify-start space-y-3">
          <h1 className="text-5xl font-bold tracking-tight text-white text-opacity-90">
            Contact us <i className="fas fa-caret-down ml-2 text-4xl" />
          </h1>
          <div className="grid w-full grid-cols-3 items-start justify-start gap-x-10">
            {socials.map((social, index) => (
              <Link href={social.href} passHref>
                <a
                  target="_blank"
                  key={index}
                  className="flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-olive-920 bg-olive-940 py-16 transition duration-500 hover:bg-olive-930"
                >
                  <i
                    className={`${social.icon} text-5xl text-white text-opacity-90`}
                  />
                </a>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-start space-y-3">
          <h1 className="text-5xl font-bold tracking-tight text-white text-opacity-90">
            FAQ <i className="fas fa-caret-down ml-2 text-4xl" />
          </h1>
          <div className="flex w-full flex-col items-start justify-start space-y-2">
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
    <div className="flex w-full flex-col items-start justify-start space-y-0.5">
      <div
        className={`flex w-full cursor-pointer flex-row items-center justify-between bg-olive-920 p-5 ${
          open ? "rounded-t-lg" : "rounded-lg"
        }`}
        onClick={() => setOpen((o) => !o)}
      >
        <p className="select-none text-2xl text-white text-opacity-80">
          {props.question}
        </p>
        <motion.i
          animate={controls}
          className="far fa-angle-down text-2xl text-white text-opacity-80"
        />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className={`flex w-full flex-row items-start justify-start rounded-b-lg bg-olive-950`}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.1 }}
          >
            <p className="format-links select-none p-5 text-xl text-white text-opacity-80">
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
    const [user, data] = await Promise.all([
      GetLoggedInUser(ctx),
      GetDefaultData(),
    ]);

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
