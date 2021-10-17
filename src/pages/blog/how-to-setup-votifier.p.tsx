import Head from "next/head";
import { GetServerSidePropsContext } from "next";

import Blog from "ui/layouts/Blog";
import GetLoggedInUser from "api/auth";
import Default from "ui/layouts/Default";

type HowToSetupVotifierProps = {
  user?: Record<string, any>;
};

function HowToSetupVotifier(props: HowToSetupVotifierProps): JSX.Element {
  return (
    <Default background="bg-dark-700" user={props.user}>
      <Blog
        title="How to setup Votifier? - Minecraft Servers"
        metatitle="How to setup Votifier? - Minecraft Servers"
        author="trustedmercury"
        uuid="268e0a03-728e-46c0-bd27-dbfc3178e617"
        date="October 17th 2021"
      >
        <div>
          <p>
            Votifier is a Minecraft plugin that allows you to reward players for upvoting your
            server on Minecraft server lists. This allows you to boost your server&apos;s ranking on
            server lists and also allows users to get cool items for free! Votifier is used by most
            successful Minecraft servers, we would definitely recommend using this system to get
            more votes and reward users!
          </p>
        </div>
        <div>
          <h3>How do I setup Votifier?</h3>
          <p>
            There are multiple Votifier plugins you can use. However we would recommend using{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.spigotmc.org/resources/nuvotifier.13449/"
            >
              NuVotifier
            </a>
            , it supports most versions and is the most widely used Votifier plugin right now! In
            this article, I will be demonstrating how to install NuVotifier and use it with{" "}
            <a target="_blank" rel="noreferrer" href="https://minecraft.global/">
              minecraft.global
            </a>
            . The process is very similar with other plugins and server lists!
          </p>
        </div>
      </Blog>
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

export default HowToSetupVotifier;
