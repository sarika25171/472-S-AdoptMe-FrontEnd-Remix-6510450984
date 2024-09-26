import { ReactNode, useState } from "react";

interface props {
    children: ReactNode;
}

export default function FilterRow({children} : props) {
    return(
        <div className="flex flex-row justify-center items-center">
            <h1 className="text-black font-bold ">Filter Pets By:</h1>
            <div className="flex flex-row space-x-6 p-8 justify-center items-center select-none">
                {children}
            </div>
        </div>
    );
}