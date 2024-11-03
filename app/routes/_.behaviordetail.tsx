import { useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import BehaviorDetail from "~/components/behaviorDetail";
import BehaviorTopic from "~/components/behaviorTopic";
import LongCard from "~/components/longCard";

export default function BehaviorCommonPage() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const topic = searchParams.get("topic");
  const img = searchParams.get("img");
  let image;
  if (type == "Rabbits") {
    image = "https://cdn.prakasitj.com/proxy/get/rabbit1.jpg";
  } else if (type == "Hamster") {
    image = "https://cdn.prakasitj.com/proxy/get/the-hamster.png";
  } else if (type == "Chinchillas") {
    image = "https://cdn.prakasitj.com/proxy/get/chinchilla1.jpg";
  } else if (type == "Birds") {
    image = "https://cdn.prakasitj.com/proxy/get/birds1.webp";
  } else {
    image = img;
  }
  console.log("img : " + img);

  return (
    <div className="flex flex-col justify-start items-center bg-primary-white-tone w-auto min-h-screen m-10 p-10 space-y-8 rounded-2xl">
      <h1 className="font-bold text-black text-[64px]">{type} {topic} Behavior</h1>
      <img
        src={image!}
        alt={type || ""}
      />
      <BehaviorDetail animal={type!} />
    </div>
  );
}
