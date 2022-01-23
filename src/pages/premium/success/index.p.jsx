import Link from "next/link";

import Default from "ui/layouts/Default";
import { GetDefaultData } from "api/core";
import { GetLoggedInUser } from "api/login";

export default function PremiumSuccess(props) {
  return (
    <Default user={props.user} defaultResults={props.defaultResults} search>
      <div className="flex flex-col items-start justify-start">
        <h3 className="font-medium text-4xl text-white">Thank you for subscribing to Premium!</h3>
        <div className="flex flex-col items-start justify-start space-y-4">
          <p className="text-2xl text-white text-opacity-60 format-links">
            You have unlocked a handful of new features to grow your server! You can start by
            claiming a custom vanity URL in your{" "}
            <Link href={`/server/${props.server_id}/manage`}>
              <a>Manage Server</a>
            </Link>{" "}
            page! We have automatically added a Premium badge to your server card on all pages!
          </p>
          <p className="text-2xl text-white text-opacity-60 format-links">
            We would recommend joining our{" "}
            <a href="https://discord.minecraft.global" target="_blank" rel="nofollow noreferrer">
              Discord server
            </a>{" "}
            to get access to any beta Premium features that haven&apos;t been documented yet!
          </p>
        </div>
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const { server_id } = ctx.query;

    if (!server_id) {
      return {
        redirect: {
          destination: "/premium",
          permanent: false,
        },
      };
    }

    const [user, data] = await Promise.all([GetLoggedInUser(ctx), GetDefaultData()]);

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
          server_id: server_id,
          defaultResults: data[0],
        },
      };
    } else {
      return {
        props: {
          user: user[0],
          server_id: server_id,
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
