import { ReactNode, useState } from "react";

interface props {
    children: ReactNode;
}

export default function FilterRow({children} : props) {
    return(
        <div className="flex flex-row justify-center items-center">
            <h1 className="text-black font-bold ">Filter Pets By:</h1>
            <div className="[&>button]:m-2 flex flex-col md:flex-row h-1/2 space-x-6 p-8 justify-center items-center select-none">
                {children}
            </div>
        </div>
    );
}