import { Link } from "@remix-run/react";
import LongCard from "./longCard";

interface props {
    type : string,
}

export default function LongCardCol({type} : props) {
    if(type == "Dogs") {
        return(
            <div className="flex flex-col justify-center items-center w-full h-fit space-y-8">
                <LongCard type={type!} topic="Agression" detail="If your cat seems overly aggressive, there could be several reasons for his or her behavior." img="https://cdn.prakasitj.com/proxy/get/agression.jpg"/>
            </div>
        );
    }
    if(type == "Cats") {
        return(
            <div className="flex flex-col justify-center items-center w-full h-fit space-y-8">
                <LongCard type={type!} topic="Agression" detail="If your cat seems overly aggressive, there could be several reasons for his or her behavior." img="https://cdn.prakasitj.com/proxy/get/cat-agression.jpg"/>
                <LongCard type={type!} topic="Agression" detail="If your cat seems overly aggressive, there could be several reasons for his or her behavior." img="https://cdn.prakasitj.com/proxy/get/cat-agression.jpg"/>
            </div>
        );
    }
}