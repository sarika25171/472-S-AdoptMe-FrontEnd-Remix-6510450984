import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import AdoptCard from "~/components/adoptCard";
import Pet from "~/models/pet";
import { DOMAIN } from "~/server/domain";



export default function AdoptPage() {
  const [searchParams] = useSearchParams();
  const pet_id = searchParams.get("id")
  const [pet, setPet] = useState<Pet>();

  useEffect(() => {
    async function fetchPet() {
      const response = await fetch(DOMAIN+"/pet/getPetByID", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pet_id: parseInt(pet_id || "")
        })
      });
      const data : Pet = await response.json();
      setPet(data);
    }
    fetchPet();
    console.log(pet_id);
  }, []);



  return (
    <div className="w-svw min-h-screen flex justify-center items-center">
      {
        pet ? <AdoptCard
        img={pet!.photo_url}
        name={pet!.pet_name}
        age={`${pet!.age_years} years ${pet!.age_months} months`}
        weight={pet!.weight}
        sex={pet!.sex}
        id={pet!.pet_id}
        type={pet!.species}
        breed={pet!.breed}
        color={pet!.color}
        spayed={pet!.spayed}
        detail={pet!.description}
      />
      : ""
      }
    </div>
  );
}