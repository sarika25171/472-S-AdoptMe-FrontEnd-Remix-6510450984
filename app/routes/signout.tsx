import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { getSession, destroySession } from "~/server/session";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const session = await getSession(request.headers.get("Cookie"));
    
    // Destroy the entire session
    const cookie = await destroySession(session);

    // Redirect to home page with the updated cookie
    return redirect("/", {
      headers: {
        "Set-Cookie": cookie,
      },
    });
  } catch (error) {
    console.error("Sign out error:", error);
    return json(
      { error: "Failed to sign out. Please try again." },
      { status: 500 }
    );
  }
}
