import type { MetaFunction } from "@remix-run/node";
import Header from "../components/header";
import Card from "../components/card";
import FilterButton from "../components/filter_button";
import Search from "../components/search_box";
import Body from "~/components/body";

export const meta: MetaFunction = () => {
  return [
    { title: "AdoptMe!" },
    { name: "description", content: "Welcome to AdoptMe!!" },
  ];
};

export default function Index() {
  return (
      <div>

      </div>
  );
}

