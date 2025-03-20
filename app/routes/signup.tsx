import { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, Link, redirect, useActionData } from "@remix-run/react";
import IconPassword from "~/components/icons/iconPassword";
import IconProfile from "~/components/icons/iconProfile";
import { UserAPI } from "~/server/repository";

const Photo = process.env.PHOTO!;

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const action = formData.get("_action");
  if (action === "signUp") {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm_password") as string;
    const email = formData.get("email") as string;
    const firstName = formData.get("first_name") as string;
    const lastName = formData.get("last_name") as string;
    const phoneNumber = formData.get("phone_no") as string;
    const salary = formData.get("salary") as string;
    if (confirmPassword === password) {
      UserAPI.userSignUp(
        username,
        password,
        email,
        firstName,
        lastName,
        phoneNumber,
        salary
      );
      return redirect("/signin");
    } else {
      return json(
        { success: false, error: "Passwords do not match." },
        { status: 400 }
      );
    }
  }
}

export default function SignUpView() {
  const actionData = useActionData<typeof action>() || null;

  return (
    <div
      className={`flex flex-col justify-center bg-[url('${Photo}bg-adoptme.png')] items-center w-full min-h-screen space-y-8`}
    >
      <Link to="/signin" prefetch="intent">
        <button
          type="button"
          className={
            "flex flex-row hover:scale-110 duration-200 space-x-2 text-white font-bold shadow-lg bg-red-500 rounded-3xl text-2xl justify-center items-center w-fit h-fit px-6 py-2"
          }
        >
          Back
        </button>
      </Link>
      <div className="flex flex-row p-0 space-x-0 bg-white space-y-0 w-auto h-auto border rounded-3xl overflow-clip drop-shadow-2xl">
        {/* Content */}
        <Form
          method="post"
          className="flex flex-col justify-center items-center space-y-10 px-64 py-32"
        >
          <h1 className="text-primary-orange text-[64px]">Sign Up</h1>

          <div className="flex flex-row space-x-4">
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-row justify-center items-center space-x-2">
                {/* <IconPassword width="24" height="24" /> */}
                <h1 className="text-black font-bold text-xl">E-Mail</h1>
              </div>
              <input
                type="email"
                name="email"
                placeholder="example@exam.com"
                className={`w-full bg-white border-4 rounded-xl px-4 py-2 text-black/80 focus:outline-none focus:border-blue-600`}
                required
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-row justify-center items-center space-x-2">
                <IconProfile width="24" height="24" />
                <h1 className="text-black font-bold text-xl">Username</h1>
              </div>
              <input
                type="text"
                name="username"
                placeholder="ex. username11"
                className={`w-full bg-white border-4 rounded-xl px-4 py-2 text-black/80 focus:outline-none focus:border-blue-600`}
                required
              />
            </div>
          </div>

          <div className="flex flex-row space-x-4">
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-row justify-center items-center space-x-2">
                <IconPassword width="24" height="24" />
                <h1 className="text-black font-bold text-xl">Password</h1>
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={`w-full bg-white border-4 rounded-xl px-4 py-2 text-black/80 focus:outline-none focus:border-blue-600`}
                required
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-row justify-center items-center space-x-2">
                <IconPassword width="24" height="24" />
                <h1 className="text-black font-bold text-xl">
                  Confirm Password
                </h1>
              </div>
              <input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                className={`w-full bg-white border-4 rounded-xl px-4 py-2 text-black/80 focus:outline-none focus:border-blue-600`}
                required
              />
            </div>
          </div>

          <div className="flex flex-row space-x-4">
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-row justify-center items-center space-x-2">
                <IconProfile width="24" height="24" />
                <h1 className="text-black font-bold text-xl">First Name</h1>
              </div>
              <input
                type="text"
                name="first_name"
                placeholder="ex. John"
                className={`w-full bg-white border-4 rounded-xl px-4 py-2 text-black/80 focus:outline-none focus:border-blue-600`}
                required
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-row justify-center items-center space-x-2">
                <IconProfile width="24" height="24" />
                <h1 className="text-black font-bold text-xl">Last Name</h1>
              </div>
              <input
                type="text"
                name="last_name"
                placeholder="ex. Doe"
                className={`w-full bg-white border-4 rounded-xl px-4 py-2 text-black/80 focus:outline-none focus:border-blue-600`}
                required
              />
            </div>
          </div>

          <div className="flex flex-row space-x-4">
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-row justify-center items-center space-x-2">
                <IconProfile width="24" height="24" />
                <h1 className="text-black font-bold text-xl">Phone Number</h1>
              </div>
              <input
                type="text"
                name="phone_no"
                placeholder="ex. 089xxxxxxx"
                className={`w-full bg-white border-4 rounded-xl px-4 py-2 text-black/80 focus:outline-none focus:border-blue-600`}
                required
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-row justify-center items-center space-x-2">
                <IconProfile width="24" height="24" />
                <h1 className="text-black font-bold text-xl">Salary</h1>
              </div>
              <input
                type="number"
                name="salary"
                placeholder="ex. 12000"
                className={`w-full bg-white border-4 rounded-xl px-4 py-2 text-black/80 focus:outline-none focus:border-blue-600`}
                required
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center space-y-2">
            <button
              type="submit"
              className="flex flex-row hover:scale-110 duration-200 space-x-2 text-white font-bold shadow-lg bg-primary-orange rounded-3xl text-2xl justify-center items-center w-fit h-fit px-6 py-2"
              name="_action"
              value="signUp"
            >
              Sign Up
            </button>
            {actionData && <h1 className="text-red-500">{actionData.error}</h1>}
          </div>
        </Form>
        {/* Image */}
        <img src={Photo + "dog-in-the-air.jpg"} />
      </div>
    </div>
  );
}
