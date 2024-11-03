import { SetStateAction } from "react";
import CustomButton from "./custom_button";
import CustomTextbox from "./custom_textbox";
import IconPassword from "./icons/iconPassword";
import { Link } from "@remix-run/react";
import IconProfile from "./icons/iconProfile";

export default function SignUp() {
    return(
        <div className="bg-white rounded-xl overflow-clip">
            <div className="flex flex-row p-0 space-x-0 space-y-0 w-auto h-auto">
                {/* Content */}
                <div className="flex flex-col justify-center items-center space-y-10 px-64 py-32">
                    {/* <h1 className="text-primary-orange text-[64px]">Sign Up</h1>
                    <CustomTextbox placeholder={"Username"}>
                        <IconProfile width="24" height="24"/>
                    </CustomTextbox>
                    <CustomTextbox placeholder={"Password"}>
                        <IconPassword width="24" height="24"/>
                    </CustomTextbox>
                    <CustomTextbox placeholder={"Confirm Password"}>
                        <IconPassword width="24" height="24"/>
                    </CustomTextbox>
                    <div className="flex flex-row justify-center items-center space-x-2">
                        <CustomButton text="Sign Up" destination="" color="bg-green-500"/>
                        <CustomButton text="Cancel" destination="" color="bg-red-500"/>
                    </div> */}
                </div>

                {/* Image */}
                <img src="https://cdn.prakasitj.com/proxy/get/dog-in-the-air.jpg"/>
            </div>
        </div>
    );
}