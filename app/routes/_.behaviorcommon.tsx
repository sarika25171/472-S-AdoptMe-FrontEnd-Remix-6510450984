import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import LongCardCol from "~/components/longCardCol";
import { photoPath } from "~/server/config.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const Photo = photoPath();
  return { Photo };
}

export default function BehaviorCommonPage() {
    const { Photo } = useLoaderData<typeof loader>();
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type");

    return(
        <div className="flex flex-col justify-start items-center w-full min-h-screen p-10 space-y-8">
            <h1 className="font-bold text-black text-[64px]">Common {type} Behavior Issues</h1>
            <h1 className="text-black text-2xl">Find out more here about common behavior issues to help you and your pet address some of our canine friends behaviors and habits.</h1>
            <LongCardCol type={type!} Photo={Photo}/>
        </div>
    );
}
