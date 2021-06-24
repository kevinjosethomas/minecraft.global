import Link from "next/link";

function Footer(props) {
  return (
    <div
      className={`flex flex-col md:flex-row items-center justify-center w-full md:space-x-20 py-16 md:py-10 space-y-6 md:space-y-0 ${
        props.dark ? "bg-dark-80" : "bg-dark-70"
      }`}
    >
      <img src="/images/logo.svg" className="w-32" draggable="false" />
      <div className="flex flex-col items-center md:items-start justify-center space-y-2 text-center md:text-left">
        <h1 className="font-bold text-2xl lg:text-3xl text-olive-60">
          minecraft<span className="text-olive-50">.</span>global
        </h1>
        <div className="flex flex-col items-center md:items-start justify-center">
          <a href={process.env.NEXT_PUBLIC_DISCORD_INVITE_URL} target="_blank">
            <a className="font-medium lg:text-lg text-gray-400 hover:text-gray-300 transition duration-500">
              Buy an advertisement
            </a>
          </a>
          <Link href="/premium">
            <a className="font-medium lg:text-lg text-gray-400 hover:text-gray-300 transition duration-500 line-through">
              Upgrade to premium
            </a>
          </Link>
          <div className="flex flex-row items-center justify-start space-x-3">
            <a
              href={process.env.NEXT_PUBLIC_DISCORD_INVITE_URL}
              target="_blank"
            >
              <i className="fab fa-discord lg:text-lg text-gray-400 hover:text-gray-300 transition duration-500" />
            </a>
            <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`} target="_blank">
              <i className="fas fa-inbox lg:text-lg text-gray-400 hover:text-gray-300 transition duration-500" />
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center md:items-start justify-center space-y-2 text-center md:text-left">
        <h1 className="font-bold text-2xl lg:text-3xl text-olive-60">legal</h1>
        <div className="flex flex-col items-center md:items-start justify-center">
          <Link href="/privacy">
            <a className="font-medium lg:text-lg text-gray-400 hover:text-gray-300 transition duration-500">
              Privacy Policy
            </a>
          </Link>
          <Link href="/terms">
            <a className="font-medium lg:text-lg text-gray-400 hover:text-gray-300 transition duration-500">
              Terms of Service
            </a>
          </Link>
          <span className="font-medium lg:text-lg text-gray-400">
            Not affiliated with <span className="text-olive-60">Minecraft</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
