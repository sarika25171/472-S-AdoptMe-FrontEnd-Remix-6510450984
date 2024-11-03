import { Link } from "@remix-run/react";

interface props {
    topic : string,
    img : string,
    type? : string,
}

export default function LongCard({type, topic, img} : props) {
    return(
        <Link to={`/behaviordetail?type=${type || ""}&topic=${topic}&img=${img}`} prefetch="intent">
            <div className="flex flex-rol justify-between p-0 space-x-0 w-[1500px] h-[400px] drop-shadow-xl bg-primary-white-tone items-center hover:bg-primary-cream duration-200">
                <img src={img} alt={topic} className="w-[440px] h-[400px] object-cover"/>
                <h1 className="font-bold text-black text-[48px]">{topic}</h1>
                <div className="flex h-full w-[100px] bg-primary-orange justify-center items-center [&>div>svg]:hover:scale-110">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.82054 20.7313C8.21107 21.1218 8.84423 21.1218 9.23476 20.7313L15.8792 14.0868C17.0505 12.9155 17.0508 11.0167 15.88 9.84497L9.3097 3.26958C8.91918 2.87905 8.28601 2.87905 7.89549 3.26958C7.50497 3.6601 7.50497 4.29327 7.89549 4.68379L14.4675 11.2558C14.8581 11.6464 14.8581 12.2795 14.4675 12.67L7.82054 19.317C7.43002 19.7076 7.43002 20.3407 7.82054 20.7313Z" fill="#ffffff"></path> </g></svg>
                </div>
            </div>
        </Link>
    );
}