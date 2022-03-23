import Default from "ui/layouts/Default";
import { GetLoggedInUser } from "api/login";

export default function Notifications(props) {
  return (
    <Default
      user={props.user}
      defaultResults={props.defaultResults}
      title="Notifications - Minecraft Server List"
    >
      <div className="flex w-full flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <i className="fas fa-bells text-6xl text-white" />
          <h1 className="text-6xl font-bold text-white">Your Notifications</h1>
        </div>
        <div className="flex w-full items-center justify-center space-x-8 space-y-1 rounded-lg border-2 border-olive-940 bg-olive-950 py-10">
          <img
            alt="Creeper"
            src="/images/creeper.png"
            className="w-64 saturate-100"
            draggable="false"
          />
          <p className="max-w-sm text-center text-3xl font-medium text-white">
            You don&apos;t have any notifications... ☠️{" "}
          </p>
        </div>
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const [user, error] = await GetLoggedInUser(ctx);

    if (error) {
      return {
        props: {},
      };
    } else {
      return {
        props: {
          user,
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
