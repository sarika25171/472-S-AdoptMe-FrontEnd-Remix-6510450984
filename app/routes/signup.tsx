import { Link, useNavigate } from "@remix-run/react";
import axios from "axios";
import { useEffect, useState } from "react";
import CustomButton from "~/components/custom_button";
import CustomTextBox from "~/components/custom_textbox";
import IconPassword from "~/components/icons/iconPassword";
import IconProfile from "~/components/icons/iconProfile";
import { DOMAIN, PHOTO } from "~/server/domain";

export default function SignUpView() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [salary, setSalary] = useState<string>("0");
  const [error, setError] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isValid =
      username.trim() !== "" &&
      password.trim() !== "" &&
      confirm.trim() !== "" &&
      email.trim() !== "" &&
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      phoneNumber.trim() !== "" &&
      salary.trim() !== "" &&
      password == confirm;
    setIsFormValid(isValid);
  }, [
    username,
    password,
    confirm,
    email,
    firstName,
    lastName,
    phoneNumber,
    salary,
  ]);

  async function fetchUser(
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    salary: string
  ) {
    const options = {
      method: "POST",
      url: DOMAIN+"/user/post",
      headers: { "Content-Type": "application/json" },
      data: {
        username: username,
        password: password,
        email: email,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        salary: parseInt(salary),
        priority: "user",
        photo_url: PHOTO+"default-profile.png",
      },
    };

    try {
      const { data } = await axios.request(options);
      setSuccess(true);
      navigate("/signin");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={`flex flex-col justify-center bg-[url('${PHOTO}bg-adoptme.png')] items-center w-full min-h-screen space-y-8`}>
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
        {/* Content */}
        <div className="flex flex-col justify-center items-center space-y-10 px-64 py-32">
          <h1 className="text-primary-orange text-[64px]">Sign In</h1>

          <div className="flex flex-row space-x-4">
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-row justify-center items-center space-x-2">
                {/* <IconPassword width="24" height="24" /> */}
                <h1 className="text-black font-bold text-xl">E-Mail</h1>
              </div>
              <CustomTextBox
                type="text"
                text="example@exam.com"
                state={setEmail}
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-row justify-center items-center space-x-2">
                <IconProfile width="24" height="24" />
                <h1 className="text-black font-bold text-xl">Username</h1>
              </div>
              <CustomTextBox type="text" text="Name" state={setUsername} />
            </div>
          </div>

          <div className="flex flex-row space-x-4">
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
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-row justify-center items-center space-x-2">
                <IconPassword width="24" height="24" />
                <h1 className="text-black font-bold text-xl">
                  Confirm Password
                </h1>
              </div>
              <CustomTextBox
                type="password"
                text="Confirm Password"
                state={setConfirm}
              />
            </div>
          </div>

          <div className="flex flex-row space-x-4">
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-row justify-center items-center space-x-2">
                <IconProfile width="24" height="24" />
                <h1 className="text-black font-bold text-xl">First Name</h1>
              </div>
              <CustomTextBox
                type="text"
                text="First Name"
                state={setFirstName}
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-row justify-center items-center space-x-2">
                <IconProfile width="24" height="24" />
                <h1 className="text-black font-bold text-xl">Last Name</h1>
              </div>
              <CustomTextBox type="text" text="Last Name" state={setLastName} />
            </div>
          </div>

          <div className="flex flex-row space-x-4">
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-row justify-center items-center space-x-2">
                <IconProfile width="24" height="24" />
                <h1 className="text-black font-bold text-xl">Phone Number</h1>
              </div>
              <CustomTextBox
                type="text"
                text="Phone Number"
                state={setPhoneNumber}
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-row justify-center items-center space-x-2">
                <IconProfile width="24" height="24" />
                <h1 className="text-black font-bold text-xl">Salary</h1>
              </div>
              <CustomTextBox type="text" text="Salary" state={setSalary} />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center space-y-2">
            {success && <h1 className="text-green-500">Create user success</h1>}
            {error && <h1 className="text-red-500">{error}</h1>}
            <CustomButton
              text="Sign Up"
              destination="/signin"
              color="bg-primary-orange"
              disabled={!isFormValid}
              click={(e) => {
                e.preventDefault();
                fetchUser(
                  username,
                  password,
                  email,
                  firstName,
                  lastName,
                  phoneNumber,
                  salary
                );
              }}
            />
          </div>
        </div>
        {/* Image */}
        <img src={PHOTO+"dog-in-the-air.jpg"} />
      </div>
    </div>
  );
}
