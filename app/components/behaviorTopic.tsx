import { ReactNode } from "react";

interface props {
    header : string,
    body : string,
    tip : string,
}

export default function BehaviorTopic({header, body, tip} : props) {
    return(
        <div className="flex flex-col justify-start items-start space-y-2">
            <h1 className="text-primary-orange font-bold text-[48px]">{header}</h1>
            <h1 className="text-black font-bold text-xl">{body}</h1>
            <h1 className="text-black font-bold text-xl py-8"><strong>Tip:</strong> {tip}</h1>                
        </div>
    );
}