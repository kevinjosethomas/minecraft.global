import tags from "lib/tags.json";
import Default from "ui/layouts/Default";
import { GetDefaultData } from "api/core";
import { GetLoggedInUser } from "api/login";

export default function Tag(props) {
  return <Default user={props.user} defaultResults={props.defaultResults} search></Default>;
}

export async function getServerSideProps(ctx) {
  try {
    const tag = ctx.params.tag;

    const found = tags.find((t) => t.name.toLowerCase() === tag.toLowerCase());

    if (!found) {
      return {
        props: {
          error: 404,
        },
      };
    }

    const user = GetLoggedInUser(ctx);
    const data = GetDefaultData(ctx);

    const responses = await Promise.all([user, data]);

    const userdata = responses[0];
    const defaultdata = responses[1];

    if (defaultdata[1]) {
      return {
        props: {
          error: defaultdata[1].response?.status || 500,
        },
      };
    }

    if (userdata[1]) {
      return {
        props: {
          defaultResults: defaultdata[0],
        },
      };
    } else {
      return {
        props: {
          user: userdata[0],
          defaultResults: defaultdata[0],
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
