import { useParams, useSearchParams } from "@remix-run/react";
import LongCard from "~/components/longCard";

export default function BehaviorCommonPage() {
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type");

    return(
        <div className="flex flex-col justify-start items-center w-full min-h-screen p-10 space-y-8">
            <h1 className="font-bold text-black text-[64px]">Common {type} Behavior Issues</h1>
            <h1 className="text-black text-2xl">Find out more here about common behavior issues to help you and your pet address some of our canine friends behaviors and habits.</h1>
            <div className="flex flex-col justify-center items-center w-full h-fit space-y-8">
                <LongCard type={type!} topic="Agression" img="https://cdn.prakasitj.com/proxy/get/agression.jpg"/>
            </div>
        </div>
    );
}
