import { Outlet } from "@remix-run/react";
import Body from "~/components/body";
import Header from "~/components/header";

export default function Base() {
    return(
        <Body>
            <Header/>
            <div className="mb-[10.9rem] md:mb-[6.5rem]"></div>
            <Outlet/>
        </Body>
    );
}