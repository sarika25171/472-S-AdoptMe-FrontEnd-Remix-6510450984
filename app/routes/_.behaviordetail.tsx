import BehaviorAnimal from "~/components/behaviorAnimal";
import LongCard from "~/components/longCard";

export default function BehaviorDetailPage() {
    return(
        <div className="flex flex-col justify-center items-center w-full min-h-screen p-10 space-y-8">
            <h1 className="font-bold text-black text-[64px]">Rabbit Behavior</h1>
            {/* <h1 className="text-black text-2xl">Understanding pet behavior is very important for owners in order to care for and adjust to the pet's needs appropriately.</h1> */}
            <img src="https://cdn.prakasitj.com/proxy/get/golden-puppy.jpg" alt="A Dawg" />
            <div className="flex flex-col justify-start items-start w-full h-fit space-y-8">
                <BehaviorAnimal type="Dogs" img="https://cdn.prakasitj.com/proxy/get/golden-puppy.jpg"/>
                <BehaviorAnimal type="Dogs" img="https://cdn.prakasitj.com/proxy/get/golden-puppy.jpg"/>
                <BehaviorAnimal type="Dogs" img="https://cdn.prakasitj.com/proxy/get/golden-puppy.jpg"/>
                <BehaviorAnimal type="Dogs" img="https://cdn.prakasitj.com/proxy/get/golden-puppy.jpg"/>
                <BehaviorAnimal type="Dogs" img="https://cdn.prakasitj.com/proxy/get/golden-puppy.jpg"/>
                <BehaviorAnimal type="Dogs" img="https://cdn.prakasitj.com/proxy/get/golden-puppy.jpg"/>
            </div>
        </div>
    );
}