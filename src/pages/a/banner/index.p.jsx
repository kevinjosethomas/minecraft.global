import Cookies from "cookies";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

import {
  FetchUserProducts,
  FetchAdvertisementPrices,
  FetchWeeeklyAdvertisements,
} from "api/advertisements";
import Default from "ui/layouts/Default";
import { GetLoggedInUser } from "api/login";
import Navigation from "./components/Navigation";
import Products from "./screens/Products/Products";
import Purchase from "./screens/Purchase/Purchase";
import Information from "./screens/Information/Information";

const screens = [
  {
    name: "information",
    label: "Information",
    icon: "far fa-info-circle",
  },
  {
    name: "products",
    label: "Products",
    icon: "far fa-box-open",
  },
  {
    name: "purchase",
    label: "Purchase",
    icon: "far fa-badge-dollar",
  },
];

export default function Banner(props) {
  const router = useRouter();
  const [screen, setScreen] = useState(screens[0]);

  useEffect(() => {
    if (!router.query.screen) {
      return;
    }

    const q = router.query.screen.toLowerCase();
    const s = screens.find((x) => x.name === q);

    if (s) {
      setScreen(s);
    }
  }, []);

  return (
    <Default
      user={props.user}
      title="Banner Advertising - Minecraft Server List"
    >
      <div className="flex w-full flex-col space-y-4 md:space-y-8">
        <h1 className="text-3xl font-medium tracking-tight text-white md:text-5xl">
          Banner Advertising
        </h1>
        <div className="flex flex-col space-y-4">
          <Navigation screens={screens} screen={screen} setScreen={setScreen} />
          {screen.name === "information" ? (
            <Information
              screens={screens}
              setScreen={setScreen}
              prices={props.prices}
            />
          ) : screen.name === "products" ? (
            <Products products={props.products} />
          ) : screen.name === "purchase" ? (
            <Purchase
              slots={props.slots}
              prices={props.prices}
              products={props.products}
            />
          ) : (
            <Fragment />
          )}
        </div>
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const cookies = new Cookies(ctx.req, ctx.res);
    const token = cookies.get("token");

    const [user, products, prices, slots] = await Promise.all([
      GetLoggedInUser(ctx),
      FetchUserProducts(token),
      FetchAdvertisementPrices(),
      FetchWeeeklyAdvertisements(),
    ]);

    if (user[1]) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    if (products[1] || prices[1] || slots[1]) {
      return {
        props: {
          error: 500,
        },
      };
    }

    return {
      props: {
        user: user[0],
        products: products[0].payload,
        prices: prices[0].payload,
        slots: slots[0].payload,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        error: 500,
      },
    };
  }
}
