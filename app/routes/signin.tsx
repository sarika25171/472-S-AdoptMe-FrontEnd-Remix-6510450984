import { Link, useNavigate } from "@remix-run/react";
import axios from "axios";
import { useEffect, useState } from "react";
import CustomButton from "~/components/custom_button";
import CustomTextBox from "~/components/custom_textbox";
import IconPassword from "~/components/icons/iconPassword";
import IconProfile from "~/components/icons/iconProfile";
import User from "~/models/user";
import { DOMAIN } from "~/server/domain";

export default function SignInView() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [priority, setPriority] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  async function fetchUsers() {
    const options = {
      method: "GET",
      url: DOMAIN + "/user/getAllUser",
    };

    try {
      const { data } = await axios.request<User[]>(options);
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUser(username: string, password: string) {
    interface response {
      username: string;
      message: string;
      priority: string;
    }
    const response = await fetch(DOMAIN + "/user/login", {
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
      const currentUser = users.filter((user) => user.username == username);
      sessionStorage.setItem("user", JSON.stringify(currentUser[0]));
      const tempData: any = data;
      setPriority(tempData[0].priority);
      console.log(priority);
      setSuccess(true);
    }
  }

  useEffect(() => {
    if (success) {
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("priority", priority);
      window.location.href = "/";
    }
  }, [success]);

  return (
    <div className="flex flex-col justify-center bg-[url('https://cdn.prakasitj.com/proxy/get/bg-adoptme.png')] items-center w-full min-h-screen space-y-8">
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
              <Link to="/signup" prefetch="intent">
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
