import { SetStateAction } from "react";
import CustomButton from "./custom_button";
import CustomTextbox from "./custom_textbox";
import IconPassword from "./icons/iconPassword";
import { Link } from "@remix-run/react";
import IconProfile from "./icons/iconProfile";

export default function SignIn() {
    return(
        <div className="bg-white rounded-xl overflow-clip">
            <div className="flex flex-row p-0 space-x-0 space-y-0 w-auto h-auto">
                {/* Image */}
                <img src="https://cdn.prakasitj.com/proxy/get/dog-in-the-air.jpg"/>

                {/* Content */}
                <div className="flex flex-col justify-center items-center space-y-10 px-64 py-32">
                    <h1 className="text-primary-orange text-[64px]">Sign In</h1>
                    <CustomTextbox placeholder={"Username"}>
                        <IconProfile/>
                    </CustomTextbox>
                    <CustomTextbox placeholder={"Password"}>
                        <IconPassword/>
                    </CustomTextbox>
                    <div className="flex flex-col justify-center items-center space-y-2">
                        <CustomButton text="Sign In" destination="" color="bg-primary-orange"/>

                        {/* SignUp / Recover Password */}
                        <div className="flex flex-row items-center justify-center space-x-4">
                            <Link to="">
                                <button type="button" className="text-black underline">
                                    <h1 className="items-center">Don’t have account ?<br/>Click here to Sign Up.</h1>
                                </button>
                            </Link>
                            <Link to="">
                                <button type="button" className="text-black underline">
                                    <h1 className="items-center">Forget password.</h1>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}