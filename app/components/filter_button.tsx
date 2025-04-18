import { Dispatch, ReactNode, SetStateAction } from "react";

interface props {
    text: string;
    value: string;
    children: ReactNode;
    setSelect: Dispatch<SetStateAction<string>>;
    select: string;
}

export default function FilterButton({ text, value, children, select, setSelect }: props) {
    return (
        <button 
            type="button"
            onClick={() => setSelect(value)} // Use the value prop to set the filter
            className={`flex flex-row hover:scale-110 duration-200 space-x-2 text-black font-bold shadow-lg 
            bg-primary-cream rounded-3xl text-2xl justify-center items-center w-fit h-fit px-6 py-2 
            ${select === value ? "bg-primary-orange text-white animate-scale-in" : "animate-scale-out-in"}`}>
            {children}
            <h1>{text}</h1>
        </button>
    );
}