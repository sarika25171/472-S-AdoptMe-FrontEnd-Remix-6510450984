import type { MetaFunction } from "@remix-run/node";
import Header from "../components/header";
import Card from "../components/card";
import FilterButton from "../components/filter_button";
import Search from "../components/search_box";
import Body from "~/components/body";
import FilterRow from "~/components/filter_row";
import IconDog from "~/components/icons/iconDog";
import IconCat from "~/components/icons/iconCat";
import IconRabbit from "~/components/icons/iconRabbit";
import IconPaw from "~/components/icons/iconPaw";
import { useState } from "react";

export default function Pets() {
  const [select, setSelect] = useState("");
  let puppyAge = 4;
  return (
    <div>
      <FilterRow>
        <FilterButton text="DOGS" select={select} setSelect={setSelect}>
          <IconDog />
        </FilterButton>
        <FilterButton text="CATS" select={select} setSelect={setSelect}>
          <IconCat />
        </FilterButton>
        <FilterButton text="RABBITS" select={select} setSelect={setSelect}>
          <IconRabbit />
        </FilterButton>
        <FilterButton text="OTHERS" select={select} setSelect={setSelect}>
          <IconPaw />
        </FilterButton>
      </FilterRow>
      <Card name="Thong Dee" gender="Male" breed="Golden Retriever" age={puppyAge} ageUnit="Months" imgSrc="https://cdn.prakasitj.com/proxy/get/golden-puppy.jpg" />
      {/* <Search/> */}
    </div>
  );
}

