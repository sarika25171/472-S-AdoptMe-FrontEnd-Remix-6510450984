import BehaviorTopic from "./behaviorTopic";

interface props {
    topic : string;
}

export default function DogBevaior({topic} : props) {
    if(topic == "Agression") {
        return(
            <div className="flex flex-col justify-start items-start w-full h-fit space-y-8">
                <h1 className="text-black font-bold text-xl"></h1>
                <BehaviorTopic 
                    header=""
                    body=""
                    tip=""
                />
            </div> 
        );
    }
}