import BehaviorAnimal from "~/components/behaviorAnimal";
import LongCard from "~/components/longCard";

export default function PetHelpPage() {
    return(
        <div className="flex flex-col justify-center items-center w-full min-h-screen px-20 py-10 space-y-8">
            <h1 className="font-bold text-black text-[64px]">General Pet Care</h1>
            <h1 className="text-black text-2xl">Are you a new pet parent, or looking for answers to a pet care-related question? Our Pet Care section provides a wealth of health and behavior information to help pet parents provide the best possible care for their furry friends.</h1>
            <div className="grid grid-flow-dense grid-cols-1 gap-[124px]">
                <LongCard topic="Aggression" img="https://cdn.prakasitj.com/proxy/get/golden-puppy.jpg"/>
                <LongCard topic="Aggression" img="https://cdn.prakasitj.com/proxy/get/golden-puppy.jpg"/>
                <LongCard topic="Aggression" img="https://cdn.prakasitj.com/proxy/get/golden-puppy.jpg"/>
                <LongCard topic="Aggression" img="https://cdn.prakasitj.com/proxy/get/golden-puppy.jpg"/>
                <LongCard topic="Aggression" img="https://cdn.prakasitj.com/proxy/get/golden-puppy.jpg"/>
                <LongCard topic="Aggression" img="https://cdn.prakasitj.com/proxy/get/golden-puppy.jpg"/>
                <LongCard topic="Aggression" img="https://cdn.prakasitj.com/proxy/get/golden-puppy.jpg"/>

            </div>
        </div>
    );
}