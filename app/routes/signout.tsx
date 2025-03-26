import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { commitSession, getSession } from "~/server/session";

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  session.unset("userId");
  session.unset("username");
  session.unset("isAdmin"); // Unset isAdmin too

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}
