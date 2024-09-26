import { Outlet } from "@remix-run/react";
import Body from "~/components/body";
import Header from "~/components/header";

export default function Base() {
    return(
        <Body>
            <Header/>
            <Outlet/>
        </Body>
    );
}