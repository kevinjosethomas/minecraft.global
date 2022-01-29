import { Fragment, useState } from "react";
import Cookies from "cookies";

import {
  FetchUserProducts,
  FetchAdvertisementPrices,
  FetchWeeeklyAdvertisements,
} from "api/advertisements";
import Default from "ui/layouts/Default";
import { GetLoggedInUser } from "api/login";
import Navigation from "./components/Navigation";
import Products from "./screens/Products/Products";
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
  const [screen, setScreen] = useState(screens[0]);

  return (
    <Default user={props.user}>
      <div className="flex w-full flex-col space-y-8">
        <h1 className="text-5xl font-medium tracking-tight text-white">
          Banner Advertising
        </h1>
        <div className="flex flex-col space-y-4">
          <Navigation screens={screens} screen={screen} setScreen={setScreen} />
          {screen.name === "information" ? (
            <Information screens={screens} setScreen={setScreen} />
          ) : screen.name === "products" ? (
            <Products products={props.products} />
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

    if (products[1] || prices[1] || slots[1]) {
      console.log(products[1]);
      return {
        props: {
          error: 500,
        },
      };
    }

    if (user[1]) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    } else {
      return {
        props: {
          user: user[0],
          products: products[0],
          prices: prices[0],
          slots: slots[0],
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
