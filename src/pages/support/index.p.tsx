import { GetServerSidePropsContext } from "next";

import GetLoggedInUser from "api/auth";
import Default from "ui/layouts/Default";
import Contact from "./components/Contact";

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
  ];
  return (
    <Default background="bg-dark-700" user={props.user}>
      <div className="flex flex-col items-start justify-start w-full space-y-10">
        <span className="font-bold text-6xl text-gray-300">Support</span>
        <div className="flex flex-col items-center justify-between">
          {contacts.map((contact) => (
            <Contact key={contact.id} contact={contact} />
          ))}
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
