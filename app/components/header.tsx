import Search from "./search_box";
import RouteButton from "./route_button";
import { Link } from "@remix-run/react";
import IconProfile from "./icons/iconProfile";
import IconSearch from "./icons/iconSearch";
import { useState } from "react";

interface props {
    name: string;
    page: string;
}

export default function Header() {
    const [select, setSelect] = useState("home");
    return (
        <div className="relative overflow-hidden flex flex-row w-svw h-auto justify-evenly items-center bg-primary-cream drop-shadow-xl pr-20 pl-5">
            <Link onClick={()=>{setSelect("home")}} to="/" className="flex flex-col items-center">
                <img src="https://cdn.prakasitj.com/proxy/get/logo-dog-paw.png" className="w-20 h-20 hover:scale-110 duration-200" />
                <h1 className={`text-black -translate-y-2 ${select==="home"?"underline":""}`}>Home</h1>
            </Link>
            <div className="justify-evenly items-center space-x-6">
                <button className="hover:scale-110 duration-200">
                    <IconSearch/>
                </button>
                <button className="hover:scale-110 duration-200">
                    <IconProfile/>
                </button>
                {/* <Search /> */}
            </div>

            <div className="justify-evenly items-center space-x-32">
                <RouteButton text="Pets" destination="/pets" setSelect={setSelect} select={select}/>
                <RouteButton text="Behavior" destination="/behavior" setSelect={setSelect} select={select}/>
                <RouteButton text="Sign In" destination="" setSelect={setSelect} select={select}/>
            </div>
        </div>
    );
}