import { Link } from "@remix-run/react";
import { Children, Dispatch, ReactNode, SetStateAction } from "react";

interface props {
    text: string;
    destination: string;
    color: string
}

export default function CustomButton({text, destination, color} : props) {
    return(
        <Link to={destination} prefetch="intent">
            <button type="button" 
            className={`flex flex-row hover:scale-110 duration-200 space-x-2 text-white font-bold shadow-lg 
            ${color} rounded-3xl text-2xl justify-center items-center w-fit h-fit px-6 py-2`}>
                <h1>{text}</h1>
            </button>
        </Link>
    );
}