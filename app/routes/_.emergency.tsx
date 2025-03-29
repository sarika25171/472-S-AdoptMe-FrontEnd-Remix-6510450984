import { useState } from "react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { EmergencyAPI } from "~/server/repository";
import GoogleMapComponent from "~/components/GoogleMapComponent";
import EmergencyCard from "~/components/EmergencyCard";
import FilterButton from "~/components/filter_button";

export async function loader({ request }: LoaderFunctionArgs) {
  const emergencyPlaces = await EmergencyAPI.getAll();
  return { emergencyPlaces };
}

export default function EmergencyPage() {
  const { emergencyPlaces } = useLoaderData<typeof loader>();
  const [filter, setFilter] = useState("");

  return (
    <div className="flex flex-col justify-start items-center w-full min-h-screen space-y-4 px-10 py-10">
      <h1 className="text-3xl font-bold">Emergency Locations</h1>
      
      <div className="flex space-x-4">
        <FilterButton text="All" value="" select={filter} setSelect={setFilter} />
        <FilterButton text="Veterinary" value="veterinary" select={filter} setSelect={setFilter} />
        <FilterButton text="Shelter" value="shelter" select={filter} setSelect={setFilter} />
        <FilterButton text="Rescue Center" value="rescue" select={filter} setSelect={setFilter} />
      </div>
      
      <GoogleMapComponent emergencyPlaces={emergencyPlaces.filter(place => filter === "" || place.type === filter)} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {emergencyPlaces
          .filter(place => filter === "" || place.type === filter)
          .map(place => (
            <EmergencyCard key={place.id} place={place} />
          ))}
      </div>
    </div>
  );
}
