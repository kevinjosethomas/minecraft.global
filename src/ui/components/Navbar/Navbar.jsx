import cookie from "js-cookie";
import { useRouter } from "next/router";

import Mobile from "./components/Mobile";
import Desktop from "./components/Desktop";

export default function Navbar(props) {
  const router = useRouter();

  const links = [
    {
      icon: "far fa-stars",
      label: "Discover",
      href: "/search",
    },
    {
      icon: "far fa-sparkles",
      label: "Advertise",
      href: "/a",
    },
  ];

  const mobile = [
    {
      icon: "far fa-home-alt",
      label: "Discover",
      href: "/",
    },
    {
      icon: "far fa-search",
      label: "Search",
      href: "/search",
    },
    {
      icon: "far fa-badge-dollar",
      label: "Advertise",
      href: "/a",
    },
  ];

  const icons = [
    {
      icon: "fab fa-discord",
      href: "https://discord.minecraft.global",
    },
    {
      icon: "fab fa-twitter",
      href: "https://twitter.com/mcdotglobal",
    },
    {
      icon: "far fa-question-circle",
      href: "/why",
    },
  ];

  const user = [
    {
      icon: "fas fa-info-circle",
      label: "View Profile",
      href: `/user/${props.user?.user_id}`,
    },
    {
      icon: "fas fa-plus-circle",
      label: "Add Server",
      href: "/server/add",
    },
    {
      icon: "far fa-pencil-paintbrush",
      label: "Edit Profile",
      href: `/user/${props.user?.user_id}/edit`,
    },
    {
      icon: "far fa-sign-out",
      label: "Log Out",
      onClick: () => {
        cookie.remove("token");
        router.reload();
      },
    },
  ];

  const data = {
    links,
    icons,
    user,
    mobile,
  };

  return (
    <div className="flex w-full items-center justify-center">
      <Mobile user={props.user} data={data} />
      <Desktop user={props.user} data={data} />
    </div>
  );
}
