import Link from "next/link";
import { GetServerSidePropsContext } from "next";

import GetLoggedInUser from "api/auth";
import Default from "ui/layouts/Default";
import Contact from "./components/Contact";
import Question from "./components/Question";

type SupportProps = {
  user?: Record<string, any>;
};

function Support(props: SupportProps): JSX.Element {
  const contacts = [
    {
      id: 1,
      icon: "fab fa-discord",
      href: "https://discord.minecraft.global/",
    },
    {
      id: 2,
      icon: "fab fa-twitter",
      href: "https://twitter.com/mcdotglobal",
    },
    {
      id: 3,
      icon: "fas fa-envelope",
      href: "mailto:team@minecraft.global",
    },
    {
      id: 4,
      icon: "fas fa-phone",
      href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ];

  const questions = [
    {
      id: 1,
      question: "How do I add my Minecraft server?",
      answer: (
        <span>
          You can add your Minecraft server by filling out the form{" "}
          <Link href="/server/add">
            <a>here</a>
          </Link>{" "}
          when you are logged in!
        </span>
      ),
    },
    {
      id: 2,
      question: "My server is already on the site but I didn't add it!",
      answer: (
        <span>
          Create a ticket in our{" "}
          <a href="https://discord.minecraft.global" target="_blank" rel="noreferrer">
            Discord server
          </a>{" "}
          and we&apos;ll take down the server for you! Unfortunately, there is no way to verify the
          owner of a server unless we join the server to check ranks! Sorry for the inconvenience!
        </span>
      ),
    },
    {
      id: 3,
      question: "I'm interested in partnering with minecraft.global, what are the requirements?",
      answer: (
        <span>
          Great! We&apos;re looking to partner with content creators, other websites and more! Reach
          out by creating a ticket in our{" "}
          <a href="https://discord.minecraft.global" target="_blank" rel="noreferrer">
            Discord server
          </a>{" "}
          and we&apos;ll talk to you personally!
        </span>
      ),
    },
    {
      id: 4,
      question: "How can I link my Minecraft account to my minecraft.global account?",
      answer: (
        <span>
          We are currently developing an automatic verification system! Feel free to create a ticket
          in our{" "}
          <a href="https://discord.minecraft.global" target="_blank" rel="noreferrer">
            Discord server
          </a>{" "}
          if you are in a hurry!
        </span>
      ),
    },
  ];

  return (
    <Default background="bg-dark-700" user={props.user}>
      <div className="flex flex-col items-start justify-start w-full space-y-10">
        <div className="flex flex-col items-start justify-start w-full space-y-5">
          <span className="font-bold text-6xl text-gray-300">Support</span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-0 w-full items-center justify-center">
            {contacts.map((contact) => (
              <Contact key={contact.id} contact={contact} />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full space-y-5">
          <span className="font-bold text-6xl text-gray-300">FAQ</span>
          <div className="flex flex-col items-center justify-start w-full space-y-4">
            {questions.map((question) => (
              <Question key={question.id} question={question} />
            ))}
          </div>
        </div>
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const [user, error] = await GetLoggedInUser(ctx);

  if (error) {
    return {
      props: {},
    };
  } else {
    return {
      props: {
        user: user.payload,
      },
    };
  }
}

export default Support;
