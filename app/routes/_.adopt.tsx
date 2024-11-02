import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import AdoptCard from "~/components/adoptCard";
import Pet from "~/models/pet";
import { DOMAIN } from "~/server/domain";

export const loader: LoaderFunction = async ({ params }) => {
    // console.log(params);
  const response = await fetch(DOMAIN+"/pet/getPetByID/"+params.id);
  const pet: Pet = await response.json();
  return params;
};

export default function AdoptPage() {
  const pet = useLoaderData<Pet>();

  return (
    <div className="w-svw min-h-screen flex justify-center items-center">
      <AdoptCard
        img={pet.photo_url}
        name={pet.pet_name}
        age={pet.age_years + pet.age_months}
        weight={pet.weight}
        sex={pet.sex}
        id={pet.pet_id}
        type={pet.species}
        breed={pet.breed}
        color={pet.color}
        spayed={pet.spayed}
        detail={pet.description}
      />
    </div>
  );
}
