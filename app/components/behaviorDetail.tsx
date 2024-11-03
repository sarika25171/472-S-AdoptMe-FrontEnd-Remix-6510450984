import { ReactNode } from "react";
import BehaviorTopic from "./behaviorTopic";
import CatBevaior from "./catBehavior";
import DogBevaior from "./dogBehavior";

interface props {
    animal : string,
    topic : string,
}

export default function BehaviorDetail({animal, topic} : props) {
    if(animal == "Rabbits") {
        return(
            <div className="flex flex-col justify-start items-start w-full h-fit space-y-8">
                <h1 className="text-black font-bold text-xl">Rabbits are intelligent and sensitive creatures with a variety of behaviors that can tell you a lot about their well-being and mood. As a rabbit owner, it's essential to understand their actions to provide them with proper care and ensure a happy, healthy life. Here’s a guide to some common rabbit behaviors and what they mean:</h1>
                <BehaviorTopic 
                    header="Eating Habits"
                    body="Rabbits are grazers, meaning they eat throughout the day. A healthy rabbit should be munching on hay, fresh greens, and rabbit pellets almost constantly. Continuous eating is vital for their digestive system, which must always be working."
                    tip="If your rabbit stops eating or seems less interested in food, it could be a sign of a serious digestive issue, such as GI Stasis. This condition can be life-threatening and requires immediate veterinary attention."
                />
                <BehaviorTopic 
                    header="Movement and Play"
                    body="Rabbits are naturally playful and energetic. You may see them perform joyful jumps and twists known as “binkies.”These movements are a sign that your rabbit is happy and content."
                    tip="Make sure to provide enough space for your rabbit to run, hop, and explore. Interactive toys can also keep them mentally and physically stimulated."
                />
                <BehaviorTopic 
                    header="Communication"
                    body="Rabbits are quiet animals, but they have their own ways of communicating. They might thump their back feet when they feel threatened or annoyed, or they could softly grunt or purr (through grinding their teeth) when they're content."
                    tip="Pay attention to body language—ears laid back flat and a low stance often indicate fear, while relaxed, forward-facing ears show that your rabbit feels safe."
                />
                <BehaviorTopic 
                    header="Digging Instincts"
                    body="Digging is a natural behavior for rabbits. In the wild, they dig burrows, and even domestic rabbits will try to dig in blankets, carpets, or outdoor enclosures."
                    tip="Offer them safe areas to dig, such as a designated digging box filled with soft materials. This helps satisfy their instincts without damaging your hom"
                />
                <BehaviorTopic 
                    header="Social Behavior"
                    body="Rabbits are social animals that enjoy companionship, either from other rabbits or their human caretakers. They groom each other and might even try to groom you if they feel a bond."
                    tip="Regularly petting your rabbit, spending time with them, and allowing them to interact with you will strengthen your bond."
                />
                <BehaviorTopic 
                    header="Fearful Reactions"
                    body="Rabbits are prey animals, so they can be easily startled. If frightened, they may freeze in place, flatten themselves against the ground, or run and hide. They might also thump their back legs as a warning to others."
                    tip="If your rabbit seems scared, give them time and space to calm down. Ensure they have a safe hiding spot where they can retreat when they feel anxious."
                />
                <BehaviorTopic 
                    header="Territorial Behavior"
                    body="Rabbits can be territorial, especially if they are not spayed or neutered. They may mark their space by spraying urine or leaving droppings around their cage or room to establish dominance."
                    tip="Spaying or neutering your rabbit can greatly reduce this behavior. In addition, setting clear boundaries and allowing them to establish their own territory within your home can help."
                />
            </div>
        );
    }
    
    if(animal == "Hamster") {
        return(
            <div className="flex flex-col justify-start items-start w-full h-fit space-y-8">
                <h1 className="text-black font-bold text-xl">Hamsters, though small, have big personalities and a wide range of behaviors that can give you insight into their mood, health, and overall well-being. Understanding hamster behavior is crucial for ensuring that they are happy, healthy, and properly cared for. Here are some common behaviors you may observe in hamsters and what they might mean:</h1>
                <BehaviorTopic 
                    header="Burrowing and Nesting"
                    body="Hamsters love to burrow and create nests. This is a natural behavior inherited from their wild counterparts, who live in underground burrows for protection and comfort."
                    tip="If your hamster is burrowing a lot, it's a sign they are feeling comfortable in their environment. It’s important to provide them with enough bedding and a deep layer of substrate to satisfy this instinct."
                />
                <BehaviorTopic 
                    header="Chewing"
                    body="Hamsters are notorious chewers. Their teeth grow continuously throughout their lives, and chewing helps them to file down their teeth and keep them from becoming overgrown."
                    tip="Always make sure your hamster has access to safe chew toys, wood blocks, or untreated twigs to prevent destructive chewing on cage bars or plastic."
                />
                <BehaviorTopic 
                    header="Running on a Wheel"
                    body="Hamsters are incredibly active and love to run. In the wild, they cover several miles each night, so their running behavior is a reflection of their need for exercise."
                    tip="A properly sized exercise wheel (with a solid surface, not wire mesh) is essential for their health and happiness. If your hamster runs excessively or not at all, it could be a sign of stress or health issues."
                />
                <BehaviorTopic 
                    header="Biting"
                    body="Hamster biting is not always a sign of aggression. Sometimes, they bite out of fear, curiosity, or if they feel threatened."
                    tip="If your hamster is biting, it’s essential to evaluate their environment. Are they scared or stressed? Do they have enough space and toys? Handling your hamster gently and giving them time to get used to your scent can help reduce biting."
                />
                <BehaviorTopic 
                    header="Grooming"
                    body="Hamsters groom themselves frequently. This self-cleaning behavior is a good indicator of a healthy and content hamster. Grooming is also a way for them to relax and maintain their fur."
                    tip="If your hamster is grooming excessively to the point of losing fur or showing bald spots, this could be a sign of stress, illness, or parasites, and a vet visit may be necessary."
                />
                <BehaviorTopic 
                    header="Stretching and Yawning"
                    body="A stretching and yawning hamster is usually a happy and relaxed hamster. This behavior often occurs after waking up from a nap or during moments of relaxation."
                    tip="Your hamster is comfortable and content in their environment. Stretching and yawning also helps them to prepare for activity, especially if they've been sleeping during the day."
                />
                <BehaviorTopic 
                    header="Hoarding Food"
                    body="Hamsters are natural hoarders. In the wild, they store food in their burrows to ensure they have enough to eat during times when food may be scare."
                    tip="It’s normal for your hamster to hide food in their bedding or corners of their cage. This is a survival instinct and nothing to be concerned about. Make sure they have fresh food daily but don't overfill their dish."
                />
                <BehaviorTopic 
                    header="Climbing and Exploring"
                    body="Hamsters are curious and love to explore their surroundings. You might see them trying to climb the sides of their cage or investigate new objects"
                    tip="Providing them with toys, tunnels, and climbing structures can enrich their environment and keep them mentally stimulated. Just be cautious of items that could cause injury if they fall."
                />
                <BehaviorTopic 
                    header="Sleeping During the Day"
                    body="Hamsters are nocturnal, meaning they are most active at night. It’s normal for them to sleep during the day and become more active in the evening."
                    tip="If your hamster is sleeping excessively during their active hours or shows no interest in activity, it could be a sign of illness. Keep an eye on their energy levels and make sure they have the right environment for their nocturnal schedule."
                />
                <BehaviorTopic 
                    header="Scent Marking"
                    body="Hamsters have scent glands, and they use them to mark their territory. You may notice them rubbing their bodies or sides against objects in their cage to leave their scent behind."
                    tip="This behavior is normal and indicates that your hamster feels the need to establish their territory, especially when placed in a new or recently cleaned cage."
                />
            </div>
        );
    }
    if (animal == "Dogs") {
        <DogBevaior topic={topic}/>
    }
    if (animal == "Cats") {
        <CatBevaior topic={topic}/>
    }
    if (animal == "Chinchillas") {
        return(
            <div className="flex flex-col justify-start items-start w-full h-fit space-y-8">
                <h1 className="text-black font-bold text-xl">Chinchillas are unique, social animals known for their playful, curious nature and gentle demeanor. Understanding their behavior can help you ensure they’re comfortable, happy, and healthy. Here are some key behaviors that are common in chinchillas and what they typically indicate:</h1>
                <BehaviorTopic 
                    header="Dust Bathing"
                    body="Chinchillas love to roll around in dust baths to keep their dense fur clean and free from oil and moisture. This natural behavior is essential for their skin and coat health."
                    tip="Dust bathing is a sign of a healthy and happy chinchilla. Allow them regular access to a dust bath (about 2-3 times per week) to keep their fur clean and fluffy"
                />
            </div>
        );
        
    }
    if (animal == "Birds") {
        return(
            <div className="flex flex-col justify-start items-start w-full h-fit space-y-8">
                <h1 className="text-black font-bold text-xl"></h1>
                
            </div>
        );
        
    }
}