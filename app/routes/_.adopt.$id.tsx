import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { useState } from "react";
import AnimatedComponent from "~/components/animations/animatedComponent";
import { AdoptionAPI, PetAPI, UserAPI } from "~/server/repository";
import prefetchImage from "~/server/services/imagePrefetcher";
import { getSession } from "~/server/session";

export async function action({ request, params }: ActionFunctionArgs) {
  const pet = await PetAPI.getPetByID(Number(params.id));
  if (!pet) throw new Response("Pet not found", { status: 404 });
  
  const adoption = await AdoptionAPI.getAdoptionByPetID(pet.pet_id);
  if (!adoption) throw new Response("Adoption not found", { status: 404 });
  try {
    await AdoptionAPI.updateAdopted(adoption.id);
    await PetAPI.updatePetByID(adoption.pet_id);
    console.log("Adoption updated successfully");
  } catch (error) {
    console.error("Error updating adoption:", error);
    throw error;
  }

  return null;
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  const pet = await PetAPI.getPetByID(Number(params.id));
  if (!pet) throw new Response("Pet not found", { status: 404 });
  const adoption = await AdoptionAPI.getAdoptionByPetID(pet.pet_id);
  // console.log("adoption : ", adoption);
  if (!adoption) throw new Response("Adoption not found", { status: 404 });
  // console.log("adoption.user_id : ", adoption.user_id);
  const owner = await UserAPI.getUserByID(adoption.user_id);
  // console.log("owner response: ", owner);
  if (!owner) throw new Response("User not found", { status: 404 });
  const session = await getSession(request.headers.get("Cookie"));
  const username = session.get("username");
  const img = await prefetchImage(pet.photo_url);
  // console.log("username : ", username);
  // console.log("owner's username : ", owner.username);
  // console.log("username == owner's username : ", username == owner.username);
  return { pet, owner, adoption, username, img };
}

export default function AdoptPage() {
  const { pet, owner, username, img } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  function updateData() {
    fetcher.submit(null, { method: "post" });
  }

  const details = pet.description.split("-");
  const [popUp, setPopUp] = useState(false);
  const [contact, setContact] = useState(false); //*
  const [success, setSuccess] = useState<boolean>(false);

  return (
    <div className="w-svw min-h-screen flex justify-center items-center">
      {pet && owner ? (
        <div className="grid grid-flow-col grid-cols-1">
          <div
            className={`row-start-1 col-start-1 flex flex-row bg-primary-white-tone rounded-3xl w-[1500px] h-[900px] drop-shadow-lg p-2 justify-evenly items-center space-x-4 ${
              popUp ? "blur-sm" : ""
            } animate-fade-in`}
          >
            <AnimatedComponent>
              {/* Image section */}
              <div className="flex flex-col justify-center items-center">
                <img
                  src={img}
                  alt={pet.pet_name}
                  className="rounded-3xl w-[500px] h-[500px] object-cover"
                />
                <h1 className="text-black font-bold text-3xl">{pet.pet_name}</h1>

                {/* Location */}
                <div className="flex flex-row space-x-0 p-0 items-center">
                  <svg
                    version="1.0"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    height="16px"
                    viewBox="0 0 64 64"
                    enableBackground="new 0 0 64 64"
                    fill="#797676"
                    stroke="#797676"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fill="#797676"
                        d="M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24 C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24 C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z"
                      ></path>{" "}
                    </g>
                  </svg>
                  <h1 className="text-gray-500">Bangkok, Bangkaen</h1>
                </div>

                {/* Dog's properties */}
                <div className="flex flex-row p-0 space-x-2">
                  <div className="flex flex-col justify-center items-center rounded-xl bg-white px-4 py-2 space-y-2 w-[185px] h-[90px]">
                    <h1 className="text-black font-bold text-lg">Age</h1>
                    <h1 className="text-gray-400">{`${pet!.age_years} years ${pet!.age_months} months`}</h1>
                  </div>
                  <div className="flex flex-col justify-center items-center rounded-xl bg-white px-4 py-2 space-y-2 w-[185px] h-[90px]">
                    <h1 className="text-black font-bold text-lg">Weight</h1>
                    <h1 className="text-gray-400">{pet.weight} kg</h1>
                  </div>
                  <div className="flex flex-col justify-center items-center rounded-xl bg-white px-4 py-2 space-y-2 w-[185px] h-[90px]">
                    <h1 className="text-black font-bold text-lg">Gender</h1>
                    <h1 className="text-gray-400">{pet.sex}</h1>
                  </div>
                </div>
              </div>
            </AnimatedComponent>

            <AnimatedComponent>
              {/* Detail section */}
              <div className="flex flex-col justify-start items-start space-y-4">
                {/* Pet Details */}
                <div>
                  <h1 className="text-black font-bold text-2xl">Pet Details</h1>
                  <hr />
                  <div className="flex flex-row space-x-2">
                    <h1 className="text-black font-bold text-xl">
                      Animal ID :{" "}
                    </h1>
                    <h1 className="text-gray-400 text-xl">{pet.pet_id}</h1>
                  </div>
                  <div className="flex flex-row space-x-2">
                    <h1 className="text-black font-bold text-xl">Type : </h1>
                    <h1 className="text-gray-400 text-xl">{pet.species}</h1>
                  </div>
                  <div className="flex flex-row space-x-2">
                    <h1 className="text-black font-bold text-xl">Breed : </h1>
                    <h1 className="text-gray-400 text-xl">{pet.breed}</h1>
                  </div>
                  <div className="flex flex-row space-x-2">
                    <h1 className="text-black font-bold text-xl">Color : </h1>
                    <h1 className="text-gray-400 text-xl">{pet.color}</h1>
                  </div>
                  <div className="flex flex-row space-x-2">
                    <h1 className="text-black font-bold text-xl">
                      Spayed/Neutered :{" "}
                    </h1>
                    <h1 className="text-gray-400 text-xl">
                      {pet.spayed ? "Yes" : "No"}
                    </h1>
                  </div>
                </div>

                {/* Additional Details */}
                <div>
                  <h1 className="text-black font-bold text-2xl">
                    Additional Details
                  </h1>
                  <hr />
                  <ul className="text-gray-400">
                    {/* {detail} */}
                    {details.map((item, index) => {
                      if (item === "") return null;
                      return <li key={index}>- {item}</li>;
                    })}
                  </ul>
                </div>
                {success && (
                  <h1 className="text-green-600 font-bold text-3xl">
                    Pet is Adopted !
                  </h1>
                )}
                <div className="flex flex-row space-x-4">
                  <button
                    className="bg-primary-orange flex flex-row hover:scale-110 duration-200 space-x-2 text-white font-bold shadow-lg rounded-3xl text-2xl justify-center items-center w-fit h-fit px-6 py-2"
                    onClick={() => {
                      setPopUp(true);
                      setContact(true);
                    }}
                  >
                    Contact
                  </button>
                  {username == owner.username && (
                    <button
                      className="bg-primary-orange flex flex-row hover:scale-110 duration-200 space-x-2 text-white font-bold shadow-lg rounded-3xl text-2xl justify-center items-center w-fit h-fit px-6 py-2"
                      onClick={() => {
                        updateData();
                      }}
                    >
                      Adopted
                    </button>
                  )}
                </div>
              </div>
            </AnimatedComponent>
          </div>
          {popUp && (
            <div
              className={`row-start-1 col-start-1 z-10 text-black flex flex-col justify-center items-center ${
                contact === false ? "animate-fade-out" : ""
              }`}
            >
              <AnimatedComponent>
                <div className="text-black flex flex-col justify-center items-center bg-[#fff9ea] rounded-xl p-4 w-[20svw] shadow-sm">
                  <div className="flex flex-col w-5/6 h-full justify-center items-center gap-2">
                    <h1 className="text-4xl text-black font-bold">
                      Contact Owner
                    </h1>
                    <img
                      src={owner.photo_url}
                      className="h-28 object-cover rounded-full"
                    />

                    <div className="flex flex-col justify-center gap-2 bg-white p-8 rounded-xl">
                      <div className="flex flex-row gap-2">
                        <h1 className="text-black">Name:</h1>
                        <h1 className="text-gray-400">
                          {owner.first_name} {owner.last_name}
                        </h1>
                      </div>

                      <div className="flex flex-row gap-2">
                        <h1 className="text-black">Email:</h1>
                        <h1 className="text-gray-400">{owner.email}</h1>
                      </div>

                      <div className="flex flex-row gap-2">
                        <h1 className="text-black">Phone:</h1>
                        <h1 className="text-gray-400">{owner.phone_number}</h1>
                      </div>
                    </div>

                    <button
                      className="text-red-300 font-bold"
                      onClick={() => {
                        setContact(false);
                        Promise.resolve(setTimeout(() => setPopUp(false), 450));
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </AnimatedComponent>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
