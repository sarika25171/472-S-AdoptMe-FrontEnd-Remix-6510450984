import { Link } from "@remix-run/react";

interface props {
    type : string,
    img : string,

}

export default function BehaviorAnimal({type, img} : props) {
    return(
        <div className="flex flex-col bg-primary-white-tone rounded-3xl justify-center items-center p-2 space-y-2 border-4 border-primary-orange w-[500px] h-[400px] drop-shadow-lg">
            <img src={img} alt={type} className="rounded-3xl w-[460px] h-[260px] items-center object-cover"/>
            <h1 className="text-black font-bold text-3xl">{type}</h1>
            {/* <Link to={"/behavior"+type}> */}
            <Link to={"/behavior"}>
                <button className="text-black font-bold text-xl rounded-full bg-primary-white-tone border-2 border-primary-orange px-4 py-2 hover:bg-primary-orange hover:text-white">
                    Learn More
                </button>
            </Link>
        </div>
    );
}