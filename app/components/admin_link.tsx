import { Link } from "@remix-run/react";
import { Dispatch, ReactNode, SetStateAction } from "react";

interface props {
    text: string;
    value: string;
    setSelect: Dispatch<SetStateAction<string>>;
    select: string;
}

export default function AdminLink({ text, value, select, setSelect }: props) {
    const routeMap: { [key: string]: string } = {
        "Dashboard": "/admin/dashboard",
        "Pet Management": "/admin/petmanagement",
    };
    
    return (
        <Link to={routeMap[value] || "/admin/dashboard"}>
            <button 
                type="button"
                onClick={() => setSelect(value)}
                className={`flex flex-row hover:scale-110 duration-200 space-x-2 text-black font-bold shadow-lg 
                bg-primary-cream rounded-3xl text-2xl justify-center items-center w-fit h-fit px-6 py-2 
                ${select === value ? "bg-primary-orange text-white animate-scale-in" : "animate-scale-out-in"}`}
            >
                <h1>{text}</h1>
            </button>
        </Link>
    );
}