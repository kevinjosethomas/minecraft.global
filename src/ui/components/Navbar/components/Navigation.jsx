import Link from "next/link";

export default function Links(props) {
  return (
    <div className="flex items-center justify-start space-x-6">
      <Brand />
      <div className="flex items-center space-x-4">
        {props.links.map((element, index) => (
          <NavbarLink
            key={index}
            icon={element.icon}
            label={element.label}
            href={element.href}
          />
        ))}
      </div>
      <div className="flex items-center space-x-3">
        {props.icons.map((icon, index) => (
          <Social key={index} icon={icon.icon} href={icon.href} />
        ))}
      </div>
    </div>
  );
}

function Brand() {
  return (
    <Link href="/" passHref>
      <img
        src="/logo.svg"
        className="h-10 w-10 transform cursor-pointer duration-1000 hover:rotate-[360deg]"
        alt="Logo"
      />
    </Link>
  );
}

function NavbarLink(props) {
  return (
    <Link href={props.href}>
      <a className="group flex items-center space-x-2">
        <i
          className={`${props.icon} text-2xl text-white text-opacity-80 transition duration-300 group-hover:text-opacity-90`}
        />
        <p className="text-2xl text-white text-opacity-80 transition duration-300 group-hover:text-opacity-90">
          {props.label}
        </p>
      </a>
    </Link>
  );
}

function Social(props) {
  const Container = ({ children }) => {
    if (props.href.startsWith("/")) {
      return (
        <Link href={props.href}>
          <a>{children}</a>
        </Link>
      );
    } else {
      return (
        <a href={props.href} target="_blank" rel="noreferrer">
          {children}
        </a>
      );
    }
  };

  return (
    <Container>
      <i
        className={`${props.icon} text-xl text-white text-opacity-80 transition duration-300 hover:text-opacity-90`}
      />
    </Container>
  );
}
