import RouteButton from "./route_button";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import IconProfile from "./icons/iconProfile";
import IconSearch from "./icons/iconSearch";
import { useState } from "react";
import { primaryOrangeColor } from "./colors";
import { LoaderFunctionArgs } from "@remix-run/node";
import { UserAPI } from "~/server/repository";

const Photo = process.env.PHOTO!

const [admin, setAdmin] = useState<boolean>(false);

export function loader({request} : LoaderFunctionArgs) {
  const username = sessionStorage.getItem("username");
  if(username) {
    const currentUser = UserAPI.getUserByUsername(username);
    currentUser.then((user) => {
      if(user.priority === "admin") 
        setAdmin(true);
    })
  }
  return { username };
}

export default function Header() {
  const {username} = useLoaderData<typeof loader>();

  const [select, setSelect] = useState("home");
  const [admin, setAdmin] = useState<boolean>(false);
  const [signOut, setSignOut] = useState<boolean>(false);

  return (
    // Home
    <div className="fixed top-0 left-0 z-50 overflow-hidden flex flex-col md:flex-row w-svw h-auto justify-between items-center bg-primary-cream drop-shadow-xl px-2 md:px-12">
      <Link
        onClick={() => {
          setSelect("home");
        }}
        to="/"
        prefetch="intent"
        className="flex flex-col items-center"
      >
        <img
          src={Photo+"logo-dog-paw.png"}
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
        {admin && (
          <RouteButton
            text="Admin"
            destination="/adminnew"
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
          text="Add Pet"
          destination="/addpetnew"
          setSelect={setSelect}
          select={select}
        />
      </div>

      {/* Icon Buttons */}
      <div className="justify-evenly items-center space-x-6">
        {
          username &&
          <button className="hover:scale-110 duration-200">
          {/* I think this icon is signout icon, not search lol */}
          <IconSearch
            colorCode={primaryOrangeColor}
            width="24"
            height="24"
            OnClick={() => {
              setAdmin(false);
              setSignOut(true);
              Promise.resolve(setTimeout(() => setSignOut(false), 2000));
            }}
          />
        </button>
        }
        <button className="hover:scale-110 duration-200">
          <Link to={username ? "/profilenew" : "/signin"}>
            <IconProfile
              colorCode={primaryOrangeColor}
              width="24"
              height="24"
            />
          </Link>
        </button>
        {/* <Search /> */}
      </div>
      {signOut && (
        <div className="fixed right-32 w-28 animate-pulse">
          <h1 className="text-red-600 font-bold font-sans">Signing out...</h1>
        </div>
      )}
    </div>
  );
}
