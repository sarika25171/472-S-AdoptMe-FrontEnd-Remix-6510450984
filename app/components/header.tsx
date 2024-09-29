import Search from "./search_box";
import RouteButton from "./route_button";
import { Link } from "@remix-run/react";
import IconProfile from "./icons/iconProfile";
import IconSearch from "./icons/iconSearch";
import { useState } from "react";
import { primaryOrangeColor } from "./colors";

interface props {
    name: string;
    page: string;
}

export default function Header() {
    const [select, setSelect] = useState("home");
    return (
        // Home
        <div className="fixed top-0 left-0 z-50 overflow-hidden flex flex-col md:flex-row w-svw h-auto justify-between items-center bg-primary-cream drop-shadow-xl px-2 md:px-12 ">
            <Link onClick={()=>{setSelect("home")}} to="/" className="flex flex-col items-center">
                <img src="https://cdn.prakasitj.com/proxy/get/logo-dog-paw.png" className="w-20 h-20 hover:scale-110 duration-200" />
                <h1 className={`text-black -translate-y-2 ${select==="home"?"underline":""}`}>Home</h1>
            </Link>

            {/* Text Buttons */}
            <div className="justify-evenly items-center space-x-10 md:space-x-32">
                <RouteButton text="Pets" destination="/pets" setSelect={setSelect} select={select}/>
                <RouteButton text="Behavior" destination="/behavior" setSelect={setSelect} select={select}/>
                <RouteButton text="Pet Help" destination="" setSelect={setSelect} select={select}/>
            </div>

            {/* Icon Buttons */}
            <div className="justify-evenly items-center space-x-6">
                <button className="hover:scale-110 duration-200">
                    <IconSearch colorCode={primaryOrangeColor}  width="24" height="24"/>
                </button>
                <button className="hover:scale-110 duration-200">
                    <IconProfile colorCode={primaryOrangeColor}  width="24" height="24"/>
                </button>
                {/* <Search /> */}
            </div>
        </div>
    );
}