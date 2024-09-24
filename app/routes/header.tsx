import { Children } from "react";
import Search from "./search_box";

interface props {
    name:string;
    page:string;
}

export default function Header({name,page}: props){
    return (
        <div className="relative overflow-hidden flex flex-row w-svw h-20 justify-evenly items-center bg-primary-cream drop-shadow-xl text-primary-orange font-extrabold text-2xl">
            <img src="resources\images\logo-dog-paw.png" className="w-20 h-20"/>
            <Search/>
            <button>Pets</button>
            <button>Behavior</button>
            <button>Sign In</button>
        </div>
    );
}