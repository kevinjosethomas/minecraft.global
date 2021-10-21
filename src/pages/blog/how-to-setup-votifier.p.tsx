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
        header="A step-by-step tutorial on setting up Votifier for Minecraft Servers"
        title="How to setup Votifier on a Minecraft Server?"
        metatitle="How to setup Votifier on a Minecraft Server?"
        description="In this tutorial, we go over setting up Votifier and Vote Rewards for Minecraft servers! This helps Minecraft servers rank higher on server lists and also keeps players motivated!"
        keywords="votifier, minecraft servers votifier, how to setup votifier"
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
          <div>
            <h4>Installing the plugin</h4>
            <p>
              You can start by installing the NuVotifier plugin{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.spigotmc.org/resources/nuvotifier.13449/"
              >
                here
              </a>
              . This plugin will work for most server frameworks including Spigot, Bukkit, Sponge
              and Paper. Once you have the JAR installed, place it in your server&apos;s{" "}
              <code>/plugin</code> directory!
              <br />
              <br />
              Once you install the plugin and restart your server, NuVotifier should generate a
              default configuration file. This will work for a single-server configuration, but you
              may need to change the port that NuVotifier listens on if you use a shared host or run
              multiple servers on the same machine! However, if you&apos;re running a BungeeCord
              network on another proxy network, you will need additional configuration.
            </p>
          </div>
          <div>
            <h4>Setting up on server lists</h4>
            <p>
              Once you have the plugin fully installed, you can add your server to server lists! In
              this article, we will show you how to add Votifier to{" "}
              <a target="_blank" rel="noreferrer" href="https://minecraft.global/">
                minecraft.global
              </a>
              !
              <br />
              <br />
              Assuming you have already added your server to the site, we&apos;ll demonstrate adding
              Votifier in the Edit Server page (the process is the same in the New Server page).
              This is what the Edit Votifier page looks like -
              <br />
              <br />
              <img
                draggable="false"
                src="https://i.imgur.com/pXzxC1r.png"
                alt="minecraft.global - Edit Votifier Page"
                className="border-4 border-olive-500 rounded transform hover:scale-[1.005] duration-500"
              />
              <br />
              <br />
              Fill the fields in with -
              <ol>
                <li>- The IP Address that your server is running on in the Votifier Host field.</li>
                <li>
                  - The port you configured in your config.yml file in the Votifier Port field.
                  field.
                </li>
                <li>- The token you find in your config.yml file in the Votifier Token field.</li>
              </ol>
              <br />
              Make sure you provide the token and not the RSA key in the Votifier Token field. Other
              server lists might use the key, but the token is the latest and most secure way to
              transmit votes in server lists!{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/NuVotifier/NuVotifier/wiki/Setup-Guide#key-vs-token"
              >
                Here is a more in-depth explanation of the differences.
              </a>
              <br />
              <br />
              Finally, hit Save Changes and your votifier fields should update! minecraft.global
              allows you to test your Votifier settings with a button!
            </p>
          </div>
          <div>
            <h4>Reward users for voting</h4>
            <p>
              Once you setup Votifier on your server list, we recommend rewarding players for voting
              and adding a <code>/vote</code> command. This will motivate players to vote. More
              votes will help rank your server higher on server lists! To allow this, you will need
              to add a vote listener plugin. <br />
              <br />
              We recommend using{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.spigotmc.org/resources/votingplugin.15358/"
              >
                VotingPlugin
              </a>{" "}
              because it is updated regularly and has over a hundred thousand downloads. To set up
              vote rewards using VotingPlugin, refer to this{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/BenCodez/AdvancedCore/wiki/Rewards"
              >
                documentation
              </a>
              !
            </p>
          </div>
        </div>
        <div>
          <h3>Conclusion</h3>
          <p>
            Setting up votifier is a great way to advertise your server and get new players!
            Rewarding players motivate them to vote for your server and helps you rank higher! If
            you own a Minecraft server, we would recommend adding it to our website -{" "}
            <a target="_blank" rel="noreferrer" href="https://minecraft.global/">
              minecraft.global
            </a>
            ! Have a nice day and good luck with your server!
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
