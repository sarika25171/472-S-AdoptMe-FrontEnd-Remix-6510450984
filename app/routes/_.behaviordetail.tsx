import { useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import BehaviorDetail from "~/components/behaviorDetail";
import BehaviorTopic from "~/components/behaviorTopic";
import LongCard from "~/components/longCard";

export default function BehaviorCommonPage() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  let image;
  if (type == "Rabbits") {
    image = "rabbit1.jpg";
  } else if (type == "Hamster") {
    image = "the-hamster.png";
  }

  return (
    <div className="flex flex-col justify-center items-center bg-primary-white-tone w-auto min-h-screen m-10 p-10 space-y-8 rounded-2xl">
      <h1 className="font-bold text-black text-[64px]">{type} Behavior</h1>
      <img
        src={`https://cdn.prakasitj.com/proxy/get/${image}`}
        alt={type || ""}
      />
      <BehaviorDetail animal={type!} />
    </div>
  );
}
