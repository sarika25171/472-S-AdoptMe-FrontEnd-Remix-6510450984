import { Link } from "@remix-run/react";
import LongCard from "./longCard";

interface props {
    type : string,
}

export default function LongCardCol({type} : props) {
    if(type == "Dogs") {
        return(
            <div className="flex flex-col justify-center items-center w-full h-fit space-y-8">
                <LongCard type={type!} topic="Agression" detail="Aggression is the most common and most serious behavior problem in dogs. Different forms of aggression require different treatments." img="https://cdn.prakasitj.com/proxy/get/agression.jpg"/>
                <LongCard type={type!} topic="Barking" detail="Each type of bark serves a distinct function for dogs. Identify the reason for barking before seeking treatment." img="https://cdn.prakasitj.com/proxy/get/dog-barking.png"/>
                <LongCard type={type!} topic="Food Guarding" detail="Resource guarding can range from benign to aggressive. Lean how to prevent and treat this canine behavior." img="https://cdn.prakasitj.com/proxy/get/dog-food.jpg"/>
                <LongCard type={type!} topic="Puppies" detail="Young dogs explore the world with their mouths, but it’s important to train them away from mouthy behaviour." img="https://cdn.prakasitj.com/proxy/get/dog-puppies.webp"/>
                <LongCard type={type!} topic="Adult Dogs" detail="Adult dogs can inadvertently cause injury with their mouths. You can teach your dog to be gentle instead." img="https://cdn.prakasitj.com/proxy/get/dog-adult.jpg"/>
                <LongCard type={type!} topic="Howling" detail="Like barking, dogs howl for many reasons. Learn what to do if your dog howls excessively." img="https://cdn.prakasitj.com/proxy/get/dog-howling.jpg"/>
                <LongCard type={type!} topic="Whining" detail="Dogs whine for different reasons. Identify the trigger before seeking treatment." img="https://cdn.prakasitj.com/proxy/get/dog-whining.jpeg"/>
                <LongCard type={type!} topic="Separation Anxiety" detail="Many dogs become destructive or disruptive when left alone. Read tips to help manage separation anxiety." img="https://cdn.prakasitj.com/proxy/get/dog-separation.jpg"/>
            </div>
        );
    }
    if(type == "Cats") {
        return(
            <div className="flex flex-col justify-center items-center w-full h-fit space-y-8">
                <LongCard type={type!} topic="Agression" detail="If your cat seems overly aggressive, there could be several reasons for his or her behavior." img="https://cdn.prakasitj.com/proxy/get/cat-agression.jpg"/>
                <LongCard type={type!} topic="Aggression Between Cats in Your Household" detail="Feline aggression and find out how to create peace between your cats." img="https://cdn.prakasitj.com/proxy/get/cat-agression-two.jpg"/>
                <LongCard type={type!} topic="Destructive Scratching" detail="Cats enjoy scratching for many reasons, including stretching, marking their territory and playing." img="https://cdn.prakasitj.com/proxy/get/Cat-Scratching-Paper.jpg"/>
                <LongCard type={type!} topic="Little Box Problems" detail="Little box problems for cats can be diverse and complex, but treatments can be very effective." img="https://cdn.prakasitj.com/proxy/get/cat-box.jpg"/>
                <LongCard type={type!} topic="Meowing and Yowling" detail="Learn more about why cats meow, and what to do if your cat’s meowing becomes excessive." img="https://cdn.prakasitj.com/proxy/get/cat-meowing.jpg"/>
                <LongCard type={type!} topic="Older Cats with Behavior Problems" detail="As your cat ages, he or she may experience a decline in cognitive functioning." img="https://cdn.prakasitj.com/proxy/get/cat-older.jpg"/>
                <LongCard type={type!} topic="Urine Marking in Cats" detail="It is important to determine whether your cat has a little box problem, or if he or she is urine marking." img="https://cdn.prakasitj.com/proxy/get/cat-urine-marking.jpg"/>
               
            </div>
        );
    }
}