import { Link } from "@remix-run/react";

interface props {
    id:number;
    name:string;
    sex:string;
    breed:string;
    ageYear:number;
    ageMonth:number;
    imgSrc:string;
}

export default function AnimalCard({id, name, sex, breed, ageYear, ageMonth, imgSrc}: props){
    return (
        <Link to={`/adopt/${id}`} prefetch="intent">
            <div className="relative w-[200px] h-[320px] xl:w-full xl:h-[420px] rounded-2xl max-w-xs overflow-hidden bg-clip-border w-500 h-640 hover:shadow-2xl hover:shadow-yellow-600 group bg-black" style={{transitionDuration:"0.5s"}}>
                <img src={imgSrc} className="w-full h-full transition-transform group-hover:scale-110 duration-200 object-cover"/>

                <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-primary-orange/40 to-transparent">
                    <div className="p-4 text-white text-center text-xl px-4">
                        <h1 className="text-4xl font-bold ">{name}</h1>
                        <hr className="h-px my-2 bg-white w-auto"></hr>
                        <h2>{sex}</h2>
                        {ageYear > 0 ? <h2>{ageYear} years </h2> : <h2>{ageMonth} months</h2>}
                        <h2>{breed}</h2>
                    </div>
                </div>
                
            </div>
        </Link>
    );
}