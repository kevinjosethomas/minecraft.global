import NavElement from "./components/NavElement";

const Navbar = (): JSX.Element => {
  const NavElements = [
    {
      id: 1,
      name: "Discover",
      icon: "far fa-sparkles",
      href: "/",
    },
    {
      id: 2,
      name: "Search",
      icon: "far fa-search",
      href: "/search",
    },
    {
      id: 3,
      name: "Premium",
      icon: "far fa-gem",
      href: "/premium",
    },
  ];

  return (
    <div className="flex flex-row items-center justify-between w-full h-20 px-20 bg-dark-800">
      <div className="flex flex-row items-center justify-start space-x-8">
        <img src="/images/logo.svg" alt="Logo" className="w-8" />
        {NavElements.map((element) => (
          <NavElement key={element.id} {...element} />
        ))}
      </div>
    </div>
  );
};

export default Navbar;
