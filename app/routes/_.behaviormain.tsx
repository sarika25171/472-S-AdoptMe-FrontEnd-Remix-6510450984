import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import BehaviorAnimal from "~/components/behaviorAnimal";
import { photoPath } from "~/server/config.server";
import prefetchImage from "~/server/services/imagePrefetcher";

export async function loader({ request }: LoaderFunctionArgs) {
  const Photo = photoPath();
  const photoDog = await prefetchImage(Photo+"behavior-dogs.jpeg");
  const photoCat = await prefetchImage(Photo+"cats-behavior.jpg");
  const photoRabbit = await prefetchImage(Photo+"behavior-rabbits.jpg");
  const photoHamster = await prefetchImage(Photo+"behavior-hamster.jpg");
  const photoBird = await prefetchImage(Photo+"behavior-birds.jpeg");
  const photoChinchilla = await prefetchImage(Photo+"behavior-chinchillas.jpg");
  return { Photo, photoDog, photoCat, photoRabbit, photoHamster, photoBird, photoChinchilla };
}

export default function BehaviorMainPage() {
    const { photoDog, photoCat, photoRabbit, photoHamster, photoBird, photoChinchilla } = useLoaderData<typeof loader>();
    return(
        <div className="flex flex-col justify-center items-center w-full min-h-screen p-10 space-y-8">
            <h1 className="font-bold text-black text-[64px]">Behavior</h1>
            <h1 className="text-black text-2xl">Understanding pet behavior is very important for owners in order to care for and adjust to the pet's needs appropriately.</h1>
            <div className="grid grid-flow-dense grid-cols-2 gap-[124px]">
                <BehaviorAnimal route="/behaviorcommon" type="Dogs" img={photoDog}/>
                <BehaviorAnimal route="/behaviorcommon" type="Cats" img={photoCat}/>
                <BehaviorAnimal route="/behaviordetail" type="Rabbits" img={photoRabbit}/>
                <BehaviorAnimal route="/behaviordetail" type="Hamster" img={photoHamster}/>
                <BehaviorAnimal route="/behaviordetail" type="Birds" img={photoBird}/>
                <BehaviorAnimal route="/behaviordetail" type="Chinchillas" img={photoChinchilla}/>
            </div>
        </div>
    );
}