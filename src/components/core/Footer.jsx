import Link from "next/link";

function Footer(props) {
  return (
    <div
      className={`flex flex-row items-center justify-center w-full space-x-20 py-10 ${
        props.dark ? "bg-dark-80" : "bg-dark-70"
      }`}
    >
      <img src="/images/logo.svg" className="w-32" draggable="false" />
      <div className="flex flex-col items-start justify-center space-y-2">
        <h1 className="font-bold text-3xl text-olive-60">
          minecraft<span className="text-olive-50">.</span>global
        </h1>
        <div className="flex flex-col items-start justify-center">
          <Link href="/advertise">
            <a className="font-medium text-lg text-gray-400 hover:text-gray-300 transition duration-500">
              Buy an advertisement
            </a>
          </Link>
          <Link href="/premium">
            <a className="font-medium text-lg text-gray-400 hover:text-gray-300 transition duration-500">
              Upgrade to premium
            </a>
          </Link>
          <div className="flex flex-row items-center justify-start space-x-3">
            <a
              href={process.env.NEXT_PUBLIC_DISCORD_INVITE_URL}
              target="_blank"
            >
              <i className="fab fa-discord text-lg text-gray-400 hover:text-gray-300 transition duration-500" />
            </a>
            <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`} target="_blank">
              <i className="fas fa-inbox text-lg text-gray-400 hover:text-gray-300 transition duration-500" />
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center space-y-2">
        <h1 className="font-bold text-3xl text-olive-60">legal</h1>
        <div className="flex flex-col items-start justify-center">
          <Link href="/terms">
            <a className="font-medium text-lg text-gray-400 hover:text-gray-300 transition duration-500">
              Terms of Service
            </a>
          </Link>
          <Link href="/privacy">
            <a className="font-medium text-lg text-gray-400 hover:text-gray-300 transition duration-500">
              Privacy Policy
            </a>
          </Link>
          <span className="font-medium text-lg text-gray-400">
            Not affiliated with <span className="text-olive-60">Minecraft</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
