import cookies from "js-cookie";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import GoogleLogin from "react-google-login";

import Default from "ui/layouts/Default";
import { GetLoggedInUser, LoginWithGoogle } from "api/login";

export default function Login(props) {
  return (
    <Default user={props.user}>
      <div className="flex flex-col items-center justify-center w-full 2xl:py-12 3xl:py-28 space-y-6">
        <motion.h1
          className="font-bold text-[48px] text-white text-opacity-90 leading-tight"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          How would you like to login or sign up?
        </motion.h1>
        <div className="flex flex-row items-center justify-center space-x-6">
          <Google />
          <Discord />
        </div>
      </div>
    </Default>
  );
}

function Google() {
  const router = useRouter();

  const onSuccess = async (response) => {
    if (response.tokenId) {
      const [data, error] = await LoginWithGoogle(response.tokenId);

      if (error) {
        toast.error("Failed to log you in!");
        return;
      }

      cookies.set("token", data.payload.token);
      router.push("/");
    }
  };

  const onFailure = (error) => {
    toast.error("Failed to log you in!");
    return;
  };

  return (
    <GoogleLogin
      clientId={process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID}
      onSuccess={onSuccess}
      onFailure={onFailure}
      render={(renderProps) => (
        <motion.div
          className="google-gradient flex flex-row items-center justify-center w-96 h-96 hover:scale-[1.01] border-2 border-olive-950 rounded-[12px] transform duration-300 cursor-pointer"
          onClick={renderProps.onClick}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <i className="fab fa-google text-[96px] text-white" />
        </motion.div>
      )}
    />
  );
}

function Discord() {
  return (
    <motion.a
      href={process.env.NEXT_PUBLIC_DISCORD_LOGIN_URL}
      className="discord-gradient flex flex-row items-center justify-center w-96 h-96 hover:scale-[1.01] border-2 border-olive-950 rounded-[12px] transform duration-300"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <i className="fab fa-discord text-[96px] text-white" />
    </motion.a>
  );
}

export async function getServerSideProps(ctx) {
  const [response, error] = await GetLoggedInUser(ctx);

  if (error) {
    return {
      props: {},
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: true,
    },
  };
}
