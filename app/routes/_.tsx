import { json, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  Link,
  Outlet,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import { useState } from "react";
import { primaryOrangeColor } from "~/components/colors";
import IconProfile from "~/components/icons/iconProfile";
import IconSignOut from "~/components/icons/iconSignOut";
import RouteButton from "~/components/route_button";
import { Cart } from "~/models/cart";
import { photoPath } from "~/server/config.server";
import { getSession } from "~/server/session";
import CartDrawer from "~/components/CartDrawer";
import { ShoppingBag } from "lucide-react";
import { CartAPI } from "~/server/repository";


export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  console.log("Request Cookie Header:", cookieHeader);
  const session = await getSession(request.headers.get("Cookie"));
  const username = session.get("username");
  const isAdmin = session.get("isAdmin");
  const Photo = photoPath();
  
  const userId = session.get("userId");
  let carts: Cart[] = [];
  if (userId) {
    carts = await CartAPI.getCart(userId);
    // console.log(`Cart(${username}):`, carts);
  }
  
  return { Photo, username, isAdmin, carts };
}

export default function Base() {
  const { Photo, username, isAdmin, carts } = useLoaderData<typeof loader>();
  const [select, setSelect] = useState("home");
  const [signOut, setSignOut] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartsFetcher = useFetcher<{ carts: Cart[] }>();
  const signOutFetcher = useFetcher();

  const handleSignOut = () => {
    setSignOut(true);
    signOutFetcher.submit(null, { method: "post", action: "/signout" });
  };
  // console.log(`Carts :`, carts);
  const cartItemCount = carts.length;
  // console.log(`Cart Item Count:`, cartItemCount);

  return (
    <div
      className={`bg-[url('${Photo}bg-adoptme.png')] w-svw h-svh justify-center items-center overflow-auto`}
    >
      <div className="fixed top-0 left-0 right-0 z-30 bg-primary-cream/80 backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          {/* Home */}
          <Link
            onClick={() => {
              setSelect("home");
            }}
            to="/"
            prefetch="intent"
            className="flex flex-col items-center"
          >
            <img
              src={Photo + "logo-dog-paw.png"}
              className="w-20 h-20 hover:scale-110 duration-200"
            />
            <h1
              className={`text-black -translate-y-2 ${
                select === "home" ? "underline" : ""
              }`}
            >
              Home
            </h1>
          </Link>

          {/* Text Buttons */}
          <div className="justify-evenly items-center space-x-10 md:space-x-32">
            {isAdmin && (
              <RouteButton
                text="Admin"
                destination="/admin/dashboard"
                setSelect={setSelect}
                select={select}
              />
            )}
            <RouteButton
              text="Pets"
              destination="/pets"
              setSelect={setSelect}
              select={select}
            />
            <RouteButton
              text="Behavior"
              destination="/behaviormain"
              setSelect={setSelect}
              select={select}
            />
            <RouteButton
              text="Pet Help"
              destination="/pethelp"
              setSelect={setSelect}
              select={select}
            />
            <RouteButton
              text="Products"
              destination="/Product"
              setSelect={setSelect}
              select={select}
            />
            <RouteButton
              text="History"
              destination="/history/list"
              setSelect={setSelect}
              select={select}
            />
            <RouteButton
            text="Emergency"
            destination="/Emergency"
            setSelect={setSelect}
            select={select}
          />
          </div>

          {/* Icon Buttons */}
          <div className="flex items-center space-x-4">
            {/* Sign Out Button */}
            {username && (
              <button
                onClick={handleSignOut}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <IconSignOut
                  width="24"
                  height="24"
                  colorCode={primaryOrangeColor}
                />
              </button>
            )}
            
            {/* Profile Button */}
            <Link to="/profile" className="p-2 hover:bg-gray-100 rounded-full">
              <IconProfile
                width="24"
                height="24"
                colorCode={primaryOrangeColor}
              />
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <ShoppingCart className="w-6 h-6 text-primary-orange" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            
          </div>
        </div>
      </div>

      {/* Sign Out Message */}
      {signOut && (
        <div className="fixed right-32 w-28 animate-pulse">
          <h1
            className={`font-bold font-sans ${
              signOutFetcher.state === "submitting"
                ? "text-red-600"
                : signOutFetcher.state === "idle"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {signOutFetcher.state === "submitting"
              ? "Signing out..."
              : signOutFetcher.state === "idle"
              ? "Signed out!"
              : "Error signing out"}
          </h1>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer
        carts={ cartsFetcher.data?.carts as unknown as Cart[] ?? carts }
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {/* Body */}
      <div className="mb-[10.9rem] md:mb-[6.5rem]"></div>
      <Outlet />
    </div>
  );
}
