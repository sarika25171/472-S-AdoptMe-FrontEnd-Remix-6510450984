import { Children } from "react";

interface props {
    name:string;
    page:string;
}

export default function Header({name,page}: props){
    return (
        <div className="flex flex-row w-svw h-40 justify-between items-center bg-blue-300">
            <h1 className="ml-4">{name}</h1>
            <h1 className="mr-4">{page}</h1>
        </div>
    );
}