import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import AdoptCard from "~/components/adoptCard";
import { AdoptionAPI, PetAPI, UserAPI } from "~/server/repository";

export async function loader({ params }: LoaderFunctionArgs) {
  const pet = await PetAPI.getPetByID(Number(params.id));
  if (!pet) throw new Response("Pet not found", { status: 404 });
  const adoption = await AdoptionAPI.getAdoptionByPetID(pet.pet_id);
  if (!adoption) throw new Response("Adoption not found", { status: 404 });
  const owner = await UserAPI.getUserByID(adoption.user_id)
  if (!owner) throw new Response("User not found", { status: 404 });

  return { pet, owner, adoption };
}

export default function AdoptPage() {
  const { pet, owner, adoption } = useLoaderData<typeof loader>();

  return (
    <div className="w-svw min-h-screen flex justify-center items-center">
      {pet && owner? (
        <AdoptCard
          adoption = {adoption}
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
          owner={owner}
        />
      ) : (
        ""
      )}
    </div>
  );
}