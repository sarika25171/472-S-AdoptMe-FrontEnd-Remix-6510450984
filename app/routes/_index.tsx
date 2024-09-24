import type { MetaFunction } from "@remix-run/node";
import Header from "./header";
import Card from "./card";
import Search from "./search_box";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  let puppyAge = 4;
  return (
    <div className="bg-white h-svh justify-center items-center">

      <Header name="Adopt Me" page="Main Page"/>
      <Card name="Thong Dee" gender="Male" breed="Golden Retriever" age={puppyAge} ageUnit="Months" imgSrc="https://cdn.prakasitj.com/proxy/get/puppy.jpg"/>
      {/* <Search/> */}
    </div>
  );
}

