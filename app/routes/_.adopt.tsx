import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import axios from "axios";
import { useEffect, useState } from "react";
import AdoptCard from "~/components/adoptCard";
import Adoption from "~/models/adoption";
import Pet from "~/models/pet";
import User from "~/models/user";
import { DOMAIN } from "~/server/domain";

export default function AdoptPage() {
  const [searchParams] = useSearchParams();
  const pet_id = searchParams.get("id");
  const [pet, setPet] = useState<Pet>();

  const [users, setUsers] = useState<User[]>([]);
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [owner, setOwner] = useState<User>();

  useEffect(() => {
    async function fetchPet() {
      const response = await fetch(DOMAIN + "/pet/getPetByID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pet_id: parseInt(pet_id || ""),
        }),
      });
      const data: Pet = await response.json();
      setPet(data);
    }

    async function fetchUsers() {
      const options = {
        method: "GET",
        url: DOMAIN + "/user/getAllUser",
      };

      try {
        const { data } = await axios.request<User[]>(options);
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchAdoptation() {
      const options = {
        method: "GET",
        url: DOMAIN+"/adoption/getAllAdoption",
      };

      try {
        const { data } = await axios.request(options);
        setAdoptions(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchAdoptation();
    fetchUsers();
    fetchPet();
    console.log(pet_id);
  }, []);

  useEffect(() => {
    if (pet && users.length > 0 && adoptions.length > 0) {
      const adoption = adoptions.find((adoption) => adoption.pet_id === pet.pet_id);
      const user = users.find((user) => user.user_id === adoption?.added_user);
      setOwner(user);
    }
  }, [pet, users,adoptions]);

  return (
    <div className="w-svw min-h-screen flex justify-center items-center">
      {pet && owner? (
        <AdoptCard
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
