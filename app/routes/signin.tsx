import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  json,
  Link,
  redirect,
  useActionData,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import IconPassword from "~/components/icons/iconPassword";
import IconProfile from "~/components/icons/iconProfile";
import { photoPath } from "~/server/config.server";
import { UserAPI } from "~/server/repository";
import prefetchImage from "~/server/services/imagePrefetcher";
import { commitSession, getSession } from "~/server/session";

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const action = formData.get("_action");
  if (action === "signIn") {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    try {
      const user = await UserAPI.userLogin(username, password); // Await the login
      // console.log("signIn info:", user);
      // Store user in the session
      session.set("username", user.username);
      session.set("userId", user.user_id);
      
      if (user.priority === "ADMIN") session.set("isAdmin", true);
      else session.set("isAdmin", false);
      // console.log("session username : ", session.get("username"));
      // console.log("session isAdmin : ", session.get("isAdmin"));
      return redirect("/", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    } catch (error) {
      return json(
        { success: false, error: "Username or password are incorrect." },
        { status: 400 }
      );
    }
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const Photo = photoPath();
  const dogPhoto = await prefetchImage(Photo + "dog-in-the-air.jpg");
  return { Photo, dogPhoto };
}

export default function SignInView() {
  const { Photo } = useLoaderData<typeof loader>();
  return (
    <div
      className={`flex flex-col justify-center bg-[url('${Photo}bg-adoptme.png')] items-center w-full min-h-screen space-y-8`}
    >
      <Link to="/" prefetch="intent">
        <button
          type="button"
          className={
            "flex flex-row hover:scale-110 duration-200 space-x-2 text-white font-bold shadow-lg bg-red-500 rounded-3xl text-2xl justify-center items-center w-fit h-fit px-6 py-2"
          }
        >
          Back
        </button>
      </Link>
      <FormBody />
    </div>
  );
}

function FormBody() {
  const fetcher = useFetcher<typeof action>();
  const actionData = useActionData<typeof action>() || null;
  const { Photo, dogPhoto } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-row p-0 space-x-0 bg-white space-y-0 w-auto h-auto border rounded-3xl overflow-clip drop-shadow-2xl">
      {/* Image */}
      <img src={dogPhoto} />

      {/* Content */}
      <div className="flex flex-col justify-center items-center space-y-10 px-64 py-32">
        <h1 className="text-primary-orange text-[64px]">Sign In</h1>
        <Form
          method="post"
          className="w-full flex flex-col justify-center items-center space-y-4"
        >
          <div className="flex flex-row justify-center items-center space-x-2">
            <IconProfile width="24" height="24" />
            <h1 className="text-black font-bold text-xl">Username</h1>
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className={`w-full bg-white border-4 rounded-xl px-4 py-2 text-black/80 focus:outline-none focus:border-blue-600`}
            required
          />
          <div className="flex flex-row justify-center items-center space-x-2">
            <IconPassword width="24" height="24" />
            <h1 className="text-black font-bold text-xl">Password</h1>
          </div>
          <input
            type="password"
            name="password"
            className={`w-full bg-white border-4 rounded-xl px-4 py-2 text-black/80 focus:outline-none focus:border-blue-600`}
            placeholder="Password"
            required
          />
          {actionData && (
            <h1 className="text-red-500">{actionData.error}</h1>
          )}
          <button
            type="submit"
            className="flex flex-row hover:scale-110 duration-200 space-x-2 text-white font-bold shadow-lg bg-primary-orange rounded-3xl text-2xl justify-center items-center w-fit h-fit px-6 py-2"
            name="_action"
            value="signIn"
          >
            Sign In
          </button>
        </Form>

        <Link to="/signup" prefetch="intent">
          <button type="button" className="text-black underline">
            <h1 className="items-center">
              Don't have account ?<br />
              Click here to Sign Up.
            </h1>
          </button>
        </Link>
      </div>
    </div>
  );
}
