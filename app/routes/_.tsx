import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Body from "~/components/body";
import Header from "~/components/header";
import { getSession } from "~/server/session";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  console.log("Request Cookie Header:", cookieHeader);
  const session = await getSession(request.headers.get("Cookie"));
  const username = session.get("username");
  const isAdmin = session.get("isAdmin");
  return { username, isAdmin };
}

export default function Base() {
    const { username, isAdmin } = useLoaderData<typeof loader>();
    return(
        <Body>
            <Header username={username} isAdmin={isAdmin}/>
            <div className="mb-[10.9rem] md:mb-[6.5rem]"></div>
            <Outlet/>
        </Body>
    );
}