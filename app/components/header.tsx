import Search from "./search_box";
import RouteButton from "./route_button";
import { Link, useNavigate } from "@remix-run/react";
import IconProfile from "./icons/iconProfile";
import IconSearch from "./icons/iconSearch";
import { useEffect, useState } from "react";
import { primaryOrangeColor } from "./colors";
import axios from "axios";
import User from "~/models/user";

interface props {
  name: string;
  page: string;
}

export default function Header() {
  const [select, setSelect] = useState("home");
  const [link, setLink] = useState<string>("");
  const [admin, setAdmin] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const navigator = useNavigate();

  async function fetchUsers({username}: {username:string | null}) {
    const options = {
      method: "GET",
      url: "https://adoptme-db.prakasitj.com/user/getAllUser",
    };

    try {
      const { data } = await axios.request<User[]>(options);
      setUsers(data);
      if(username != null) {
        setLink("/profile");
        if (data.find((user) => user.username == username)?.priority == "admin") {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const tmpUsername = sessionStorage.getItem("username");
    fetchUsers({username:tmpUsername});
  }, []);

  useEffect(() => {
    const tmpUsername = sessionStorage.getItem("username");
    const tmpPriority = users.find((user) => user.username == tmpUsername)?.priority;
    if (tmpUsername != null) {
      setLink("/profile");
      if (tmpPriority == "admin") {
        setAdmin(true);
      }
    } else {
      setLink("/signin");
      setAdmin(false);
    }
  }, [select]);

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
          src="https://cdn.prakasitj.com/proxy/get/logo-dog-paw.png"
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
            destination="/admin"
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
          destination="/addpet"
          setSelect={setSelect}
          select={select}
        />
      </div>

      {/* Icon Buttons */}
      <div className="justify-evenly items-center space-x-6">
        <button className="hover:scale-110 duration-200">
          <IconSearch
            colorCode={primaryOrangeColor}
            width="24"
            height="24"
            OnClick={() => {
              setAdmin(false);
            }}
          />
        </button>
        <button className="hover:scale-110 duration-200">
          <Link to={link}>
            <IconProfile
              colorCode={primaryOrangeColor}
              width="24"
              height="24"
            />
          </Link>
        </button>
        {/* <Search /> */}
      </div>
    </div>
  );
}
