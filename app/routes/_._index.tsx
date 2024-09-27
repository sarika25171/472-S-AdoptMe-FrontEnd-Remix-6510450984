import type { MetaFunction } from "@remix-run/node";
import Header from "../components/header";
import Card from "../components/card";
import FilterButton from "../components/filter_button";
import Search from "../components/search_box";
import Body from "~/components/body";
import CustomButton from "~/components/button";

export const meta: MetaFunction = () => {
  return [
    { title: "AdoptMe!" },
    { name: "description", content: "Welcome to AdoptMe!!" },
  ];
};

export default function Index() {
  return (
    <div className="relative">
      <img src="https://cdn.prakasitj.com/proxy/get/blue-adopt.png" className="w-svw h-svh"/>
      <div className="absolute inset-0 flex flex-col space-y-2 justify-center items-start px-20 py-60">
        <h1 className="text-[64px] text-black">Pet Adoption</h1>
        <h3 className="text-[32px] text-gray-500">Find your new best friend and give a pet a loving home.</h3>
        <CustomButton destination="/pets" text="Find a pet"/>
      </div>
    </div>
  );
}

