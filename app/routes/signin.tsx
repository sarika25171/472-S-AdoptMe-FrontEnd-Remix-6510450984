import { Link, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import CustomButton from "~/components/custom_button";
import CustomTextBox from "~/components/custom_textbox";
import IconPassword from "~/components/icons/iconPassword";
import IconProfile from "~/components/icons/iconProfile";
import { DOMAIN } from "~/server/domain";

export default function SignInView() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  async function fetchUser(username: string, password: string) {
    interface response {
      username: string;
      message: string;
    }
    const response = await fetch(DOMAIN+"/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data: response = await response.json();
    if (data.username == "Error authen failed") {
      setError("User not found");
      console.log("User not found");
    } else if (
      data.message == "undefined is not an object (evaluating 'authen[0].salt')"
    ) {
      setError("User not found");
    } else {
      setSuccess(true);
    }
  }

  useEffect(() => {
    if (success) {
      sessionStorage.setItem("user", JSON.stringify({ name: username }));
      sessionStorage.setItem("username", username);
      //   sessionStorage.setItem("priority", )
      window.location.href = "/";
    }
  }, [success]);

  return (
    // <div className="flex flex-col justify-center items-center w-full h-svh bg-blue-200 overflow-auto">
    //   <div className="flex flex-col space-y-10 px-20 py-20 bg-white/20 justify-center items-center rounded-2xl shadow-xl">
    //     {/* Login Text */}
    //     <h1 className="text-black font-bold text-[48px]">Login</h1>
    //     {/* Username */}
    //     <CustomTextBox type="text" text="Username" state={setUsername} />
    //     {/* Password */}
    //     <CustomTextBox type="password" text="Password" state={setPassword} />
    //     {error && <h1 className="text-red-500">{error}</h1>}
    //     <Link
    //       to="/"
    //       onClick={(e) => {
    //         e.preventDefault();
    //         fetchUser(username, password);
    //       }}
    //     >
    //       <button
    //         type="button"
    //         className={
    //           "bg-primary-blue active:brightness-[80%] hover:brightness-[110%] hover:scale-110 duration-200 space-x-2 text-white font-bold shadow-lg rounded-lg text-2xl justify-center items-center w-fit h-fit px-6 py-2"
    //         }
    //       >
    //         <h1 className="items-center">Login</h1>
    //       </button>
    //     </Link>
    //   </div>
    // </div>
    <div className="flex flex-col justify-center bg-[url('https://cdn.prakasitj.com/proxy/get/bg-adoptme.png')] items-center w-full min-h-screen">
      <div className="flex flex-row p-0 space-x-0 bg-white space-y-0 w-auto h-auto border rounded-3xl overflow-clip drop-shadow-2xl">
        {/* Image */}
        <img src="https://cdn.prakasitj.com/proxy/get/dog-in-the-air.jpg" />

        {/* Content */}
        <div className="flex flex-col justify-center items-center space-y-10 px-64 py-32">
          <h1 className="text-primary-orange text-[64px]">Sign In</h1>
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row justify-center items-center space-x-2">
              <IconProfile width="24" height="24" />
              <h1 className="text-black font-bold text-xl">Username</h1>
            </div>
            <CustomTextBox type="text" text="Name" state={setUsername} />
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row justify-center items-center space-x-2">
              <IconPassword width="24" height="24" />
              <h1 className="text-black font-bold text-xl">Password</h1>
            </div>
            <CustomTextBox
              type="password"
              text="Password"
              state={setPassword}
            />
          </div>
          <div className="flex flex-col justify-center items-center space-y-2">
            {error && <h1 className="text-red-500">{error}</h1>}
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                fetchUser(username, password);
              }}
            >
              <button
                type="button"
                className={
                  "flex flex-row hover:scale-110 duration-200 space-x-2 text-white font-bold shadow-lg bg-primary-orange rounded-3xl text-2xl justify-center items-center w-fit h-fit px-6 py-2"
                }
              >
                <h1 className="items-center">Sign In</h1>
              </button>
            </Link>

            {/* SignUp / Recover Password */}
            <div className="flex flex-row items-center justify-center space-x-4">
              <Link to="" prefetch="intent">
                <button type="button" className="text-black underline">
                  <h1 className="items-center">
                    Don’t have account ?<br />
                    Click here to Sign Up.
                  </h1>
                </button>
              </Link>
              {/* <Link to="" prefetch="intent">
                                <button type="button" className="text-black underline">
                                    <h1 className="items-center">Forget password.</h1>
                                </button>
                            </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
