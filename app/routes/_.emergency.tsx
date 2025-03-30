import { useState, useRef, useEffect } from "react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { EmergencyAPI } from "~/server/repository";
import { EmergencyCard, EmergencyPlace } from "~/components/emergencyCard";
import FilterButton from "~/components/filter_button";
import MapLibreComponent from "~/components/MapLibreComponent";

export async function loader({ request }: LoaderFunctionArgs) {
    const emergencyData = await EmergencyAPI.getAllEmergencies();
    
    // Transform the data to match what your components expect
    const emergencyPlaces = emergencyData.map(item => ({
      id: item.emergency_id.toString(),
      name: item.name,
      address: item.address,
      phone: item.phone_number,
      
      // Add any other fields your components need
    }));
    
    return { emergencyPlaces };
  }

export default function EmergencyPage() {
  const { emergencyPlaces } = useLoaderData<typeof loader>();
  const [filter, setFilter] = useState("");
  const [selectedEmergency, setSelectedEmergency] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filteredPlaces = emergencyPlaces.filter(
      (    place: { type: string; }) => filter === "" || place.type === filter
  );

  // Scroll to the card when a marker is clicked
  useEffect(() => {
    if (selectedEmergency && cardRefs.current[selectedEmergency]) {
      cardRefs.current[selectedEmergency]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [selectedEmergency]);

  const handleMarkerClick = (place: EmergencyPlace) => {
    setSelectedEmergency(place.id);
  };

  return (
    <div className="flex flex-col justify-start items-center w-full min-h-screen space-y-4 px-10 py-10">
      <h1 className="text-3xl font-bold">Emergency Locations</h1>
      
      <div className="flex space-x-4">
        <FilterButton text="All" value="" select={filter} setSelect={setFilter} children={undefined} />
        <FilterButton text="Veterinary" value="veterinary" select={filter} setSelect={setFilter} children={undefined} />
        <FilterButton text="Shelter" value="shelter" select={filter} setSelect={setFilter} children={undefined} />
        <FilterButton text="Rescue Center" value="rescue" select={filter} setSelect={setFilter} children={undefined} />
      </div>
      
      {/* Map Component */}
      <div className="w-full">
        <MapLibreComponent 
          emergencyPlaces={filteredPlaces} 
          height={500}
          onMarkerClick={handleMarkerClick}
        />
      </div>
      
      {/* List of Emergency Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {filteredPlaces.map((place: EmergencyPlace) => (
          <div 
            key={place.id}
            ref={el => cardRefs.current[place.id] = el}
            className={selectedEmergency === place.id ? "ring-2 ring-offset-2 ring-blue-500 rounded-lg" : ""}
          >
            <EmergencyCard 
              place={place} 
              onClick={() => setSelectedEmergency(place.id)}
            />
          </div>
        ))}
      </div>
      
      {filteredPlaces.length === 0 && (
        <div className="text-center p-10 text-gray-500">
          No emergency locations found for the selected filter.
        </div>
      )}
    </div>
  );
}