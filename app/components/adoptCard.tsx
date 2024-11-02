interface props {
    img : string,
    name : string,
    age : string,
    weight : number,
    sex : string,
    id : number
    type : string,
    breed : string,
    color : string,
    spayed : boolean,
    detail : string,
}

export default function AdoptCard({name, img, age, weight, sex, id, type, color, breed, spayed, detail} : props) {
    return(
        <div className="flex flex-row bg-primary-white-tone rounded-3xl w-[1500px] h-[900px] drop-shadow-lg p-2 justify-evenly items-center space-x-4">

            {/* Image section */}
            <div className="flex flex-col justify-center items-center">
                <img src={img} alt={name} className="rounded-3xl w-[500px] h-[500px] object-cover"/>
                <h1 className="text-black font-bold text-3xl">{name}</h1>

                {/* Location */}
                <div className="flex flex-row space-x-0 p-0 items-center">
                    <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" fill="#797676" stroke="#797676"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#797676" d="M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24 C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24 C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z"></path> </g></svg>
                    <h1 className="text-gray-500">Bangkok, Bangkaen</h1>
                </div>

                {/* Dog's properties */}
                <div className="flex flex-row p-0 space-x-2">
                    <div className="flex flex-col justify-center items-center rounded-xl bg-white px-4 py-2 space-y-2 w-[185px] h-[90px]">
                        <h1 className="text-black font-bold text-lg">Age</h1>
                        <h1 className="text-gray-400">{age}</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center rounded-xl bg-white px-4 py-2 space-y-2 w-[185px] h-[90px]">
                        <h1 className="text-black font-bold text-lg">Weight</h1>
                        <h1 className="text-gray-400">{weight} kg</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center rounded-xl bg-white px-4 py-2 space-y-2 w-[185px] h-[90px]">
                        <h1 className="text-black font-bold text-lg">Gender</h1>
                        <h1 className="text-gray-400">{sex}</h1>
                    </div>
                </div>
            </div>

            {/* Detail section */}
            <div className="flex flex-col justify-start items-start space-y-4">
                    {/* Pet Details */}
                    <div>
                        <h1 className="text-black font-bold text-2xl">Pet Details</h1>
                        <hr />
                        <div className="flex flex-row space-x-2">
                            <h1 className="text-black font-bold text-xl">Animal ID : </h1>
                            <h1 className="text-gray-400 text-xl">{id}</h1>
                        </div>
                        <div className="flex flex-row space-x-2">
                            <h1 className="text-black font-bold text-xl">Type : </h1>
                            <h1 className="text-gray-400 text-xl">{type}</h1>
                        </div>
                        <div className="flex flex-row space-x-2">
                            <h1 className="text-black font-bold text-xl">Breed : </h1>
                            <h1 className="text-gray-400 text-xl">{breed}</h1>
                        </div>
                        <div className="flex flex-row space-x-2">
                            <h1 className="text-black font-bold text-xl">Color : </h1>
                            <h1 className="text-gray-400 text-xl">{color}</h1>
                        </div>
                        <div className="flex flex-row space-x-2">
                            <h1 className="text-black font-bold text-xl">Spayed/Neutered :  </h1>
                            <h1 className="text-gray-400 text-xl">{spayed ? "Yes" : "No"}</h1>
                        </div>
                    </div>

                    {/* Additional Details */}
                    <div>
                        <h1 className="text-black font-bold text-2xl">Additional Details</h1>
                        <hr />
                        <ul className="text-gray-400">
                            {detail}
                            {/* <li>Likes to explore new places and say hi to everyone he meets</li>
                            <li>Enjoys car rides and sits in his own little booster seat</li>
                            <li>Loves going on walks and does best with a harness</li>
                            <li>Happy to nap on the couch at night with his people</li> */}
                        </ul>
                    </div>

            </div>
        </div>
    );
}