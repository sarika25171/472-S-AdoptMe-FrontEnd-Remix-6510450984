import RouteButton from "./route_button";
import { Form, Link, useFetcher, useLoaderData } from "@remix-run/react";
import IconProfile from "./icons/iconProfile";
import IconSearch from "./icons/iconSearch";
import { useState, useEffect } from "react";
import { primaryOrangeColor } from "./colors";
import type { Cart } from "~/models/cart";
import { LoaderFunctionArgs } from "@remix-run/node";

export default function Header({username, isAdmin} : {username : string | undefined, isAdmin: boolean | undefined}) {
  console.log("Header session username :", username);
  console.log("Header session isAdmin :", isAdmin);
  const [select, setSelect] = useState("home");
  const [signOut, setSignOut] = useState<boolean>(false);
  const cartFetcher = useFetcher<{ cart: Cart }>();
  
  useEffect(() => {
    // Fetch cart data when component mounts
    cartFetcher.load("/cart");
  }, []);

  const cartItemCount = cartFetcher.data?.cart.items.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    
  );
}
