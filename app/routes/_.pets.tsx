import { useState } from "react";
import FilterButton from "../components/filter_button";
import AnimalCard from "../components/animalCard";
import Pet from "~/models/pet";
import IconDog from "~/components/icons/iconDog";
import IconCat from "~/components/icons/iconCat";
import IconPaw from "~/components/icons/iconPaw";
import IconRabbit from "~/components/icons/iconRabbit";
import AnimatedComponent from "~/components/animations/animatedComponent";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import prefetchImage from "~/server/services/imagePrefetcher";
import { PetAPI } from "~/server/repository";

export async function loader({request} : LoaderFunctionArgs) {
  let pets: Pet[] = await PetAPI.getAll();
  for (let pet of pets) {
    pet.photo_url = await prefetchImage(pet.photo_url);
  }
  return { pets }
}

export default function PetsPage() {
  const { pets } = useLoaderData<typeof loader>();
  const [select, setSelect] = useState(""); // State for selected filter

  return (
    <div className="flex flex-col justify-start items-center w-svw min-h-screen space-y-4 px-10 py-10" style={{transitionDuration:"1s"}}>
      <div className="flex space-x-4">
        <FilterButton text="" value="" select={select} setSelect={setSelect}>
          <h1>All</h1>
        </FilterButton>
        <FilterButton
          text="Dogs"
          value="Dogs"
          select={select}
          setSelect={setSelect}
        >
          <IconDog
            width="24"
            height="24"
            colorCode={select === "Dog" ? "#ffffff" : "#000000"}
          />
        </FilterButton>
        <FilterButton
          text="Cats"
          value="Cats"
          select={select}
          setSelect={setSelect}
        >
          <IconCat
            width="24"
            height="24"
            colorCode={select === "Cat" ? "#ffffff" : "#000000"}
          />
        </FilterButton>
        <FilterButton
          text="Rabbits"
          value="Rabbits"
          select={select}
          setSelect={setSelect}
        >
          <IconRabbit
            width="24"
            height="24"
            colorCode={select === "Rabbit" ? "#ffffff" : "#000000"}
          />
        </FilterButton>
        <FilterButton
          text="Others"
          value="Others"
          select={select}
          setSelect={setSelect}
        >
          <IconPaw
            width="24"
            height="24"
            colorCode={select === "Others" ? "#ffffff" : "#000000"}
          />
        </FilterButton>
        <Link 
        to="/addpet"
        className="flex hover:scale-110 duration-200 space-x-2 text-black font-bold shadow-lg bg-green-400 rounded-3xl text-2xl justify-center items-center w-fit h-fit px-6 py-2 animate-scale-out-in"
        >
          <h1>Add Pet</h1>
        </Link>
      </div>

      <div className="grid grid-flow-dense grid-cols-6 gap-16">
        {pets
          .filter((petData) => !select || petData.species === select)
          .filter((petData) => petData.adopted === false)
          .map((petData) => (
            <AnimatedComponent key={petData.pet_id}>
              <AnimalCard
                key={petData.pet_id}
                id={petData.pet_id}
                name={petData.pet_name}
                sex={petData.sex}
                breed={petData.breed}
                ageYear={petData.age_years}
                ageMonth={petData.age_months}
                imgSrc={petData.photo_url}
              />
            </AnimatedComponent>
          ))}
      </div>
    </div>
  );
}
