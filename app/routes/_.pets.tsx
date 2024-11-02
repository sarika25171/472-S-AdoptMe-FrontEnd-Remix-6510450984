import { useEffect, useState } from "react";
import FilterButton from "../components/filter_button";
import AnimalCard from "../components/animalCard";
import { DOMAIN } from "~/server/domain";
import Pet from "~/models/pet";
import IconDog from "~/components/icons/iconDog";
import IconCat from "~/components/icons/iconCat";
import IconPaw from "~/components/icons/iconPaw";
import IconRabbit from "~/components/icons/iconRabbit";

export default function PetsPage() {
  const [select, setSelect] = useState(""); // State for selected filter
  const [pets, setPets] = useState<Pet[]>([]); // State for pets data

  async function fetchPet() {
    const response = await fetch(DOMAIN + "/pet/getAllPet");
    const data: Pet[] = await response.json();
    setPets(data);
  }
    
  useEffect(() => {
    fetchPet();
  }, []);

  return (
    <div className="flex flex-col justify-start items-center w-svw min-h-screen space-y-4 px-10 py-10">
      <div className="flex space-x-4">
      <FilterButton text="" value="" select={select} setSelect={setSelect}>
        <h1>All</h1>
        </FilterButton>
        <FilterButton text="Dogs" value="Dog" select={select} setSelect={setSelect}>
          <IconDog width="24" height="24" colorCode={select === "Dog" ? "#ffffff" : "#000000"} />
        </FilterButton>
        <FilterButton text="Cats" value="Cat" select={select} setSelect={setSelect}>
          <IconCat width="24" height="24" colorCode={select === "Cat" ? "#ffffff" : "#000000"} />
        </FilterButton>
        <FilterButton text="Rabbits" value="Rabbit" select={select} setSelect={setSelect}>
          <IconRabbit width="24" height="24" colorCode={select === "Rabbit" ? "#ffffff" : "#000000"} />
        </FilterButton>
        <FilterButton text="Others" value="Other" select={select} setSelect={setSelect}>
          <IconPaw width="24" height="24" colorCode={select === "Other" ? "#ffffff" : "#000000"} />
        </FilterButton>
      </div>

      <div className="grid grid-flow-dense grid-cols-6 gap-16">
        {pets.filter(petData => !select || petData.species === select).map((petData) => (
          <AnimalCard
            key={petData.pet_id}
            id={petData.pet_id}
            name={petData.pet_name}
            sex={petData.sex}
            breed={petData.breed}
            age={petData.age_years + petData.age_months}
            imgSrc={petData.photo_url}
          />
        ))}
      </div>
    </div>
  );
}
