import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import BehaviorAnimal from "~/components/behaviorAnimal";
import { photoPath } from "~/server/config.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const Photo = photoPath();
  return { Photo };
}

export default function BehaviorMainPage() {
    const { Photo } = useLoaderData<typeof loader>();
    return(
        <div className="flex flex-col justify-center items-center w-full min-h-screen p-10 space-y-8">
            <h1 className="font-bold text-black text-[64px]">Behavior</h1>
            <h1 className="text-black text-2xl">Understanding pet behavior is very important for owners in order to care for and adjust to the pet's needs appropriately.</h1>
            <div className="grid grid-flow-dense grid-cols-2 gap-[124px]">
                <BehaviorAnimal route="/behaviorcommon" type="Dogs" img={Photo+"behavior-dogs.jpeg"}/>
                <BehaviorAnimal route="/behaviorcommon" type="Cats" img={Photo+"cats-behavior.jpg"}/>
                <BehaviorAnimal route="/behaviordetail" type="Rabbits" img={Photo+"behavior-rabbits.jpg"}/>
                <BehaviorAnimal route="/behaviordetail" type="Hamster" img={Photo+"behavior-hamster.jpg"}/>
                <BehaviorAnimal route="/behaviordetail" type="Birds" img={Photo+"behavior-birds.jpeg"}/>
                <BehaviorAnimal route="/behaviordetail" type="Chinchillas" img={Photo+"behavior-chinchillas.jpg"}/>
            </div>
        </div>
    );
}