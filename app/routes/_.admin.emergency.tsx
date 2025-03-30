import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type {
  LoaderFunction,
  LoaderFunctionArgs
} from "@remix-run/node";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { EmergencyAPI } from "~/server/repository";
import { getSession } from "~/server/session";
import { Emergency } from "~/models/emergency";
import { useState, useEffect } from "react";

export const loader: LoaderFunction = async ({
  request
}: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const isAdmin = session.get("isAdmin");
  if (!isAdmin) {
    return redirect("/");
  }
  let emergencyLocations = await EmergencyAPI.getAllEmergencies();
  return { emergencyLocations, isAdmin };
};

export default function AdminEmergencyManagement() {
  const { emergencyLocations, isAdmin } = useLoaderData<typeof loader>();
  const [locations, setLocations] = useState<Emergency[]>(emergencyLocations);

  useEffect(() => {
    // Refresh data when component mounts or when returning from MapHub
    const fetchLocations = async () => {
      try {
        const updatedLocations = await EmergencyAPI.getAllEmergencies();
        setLocations(updatedLocations);
      } catch (error) {
        console.error("Error refreshing locations:", error);
      }
    };
    
    fetchLocations();
    
    // Poll for updates every 30 seconds to catch changes made on MapHub
    const intervalId = setInterval(fetchLocations, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  const handleMapHubAction = () => {
    // Navigate directly to the MapHub embed URL
    window.open("https://maphub.net/embed_h/nqewvFBEVe2HSW40?panel=1&panel_closed=1", '_blank');
  };

  const columns: GridColDef[] = [
    { field: "emergency_id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "address", headerName: "Address", flex: 3 },
    { field: "phone", headerName: "Phone", flex: 2 },
    { field: "type", headerName: "Type", flex: 2 },
  ];

  if (!isAdmin) {
    return <div className="p-10">You do not have permission to view this page.</div>;
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-10 space-y-8">
      <h1 className="text-4xl font-bold">Emergency Locations Management</h1>
      
      {/* Centered Action Buttons */}
      <div className="flex gap-4 justify-center w-full mb-6">
        <button
          onClick={handleMapHubAction}
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg flex items-center text-lg"
        >
          <span className="mr-2">+</span> Add Location
        </button>
        
        <button
          onClick={handleMapHubAction}
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg flex items-center text-lg"
        >
          <span className="mr-2">-</span> Delete Location
        </button>
      </div>
      
      {/* Map Component */}
      <div className="w-full flex justify-center mb-8">
        <iframe 
          width="768" 
          height="576" 
          src="https://maphub.net/embed_h/nqewvFBEVe2HSW40?panel=1&panel_closed=1" 
          frameBorder="0"
          title="Emergency Locations Map"
          className="border border-gray-300 rounded-lg shadow-lg"
        ></iframe>
      </div>
      
      {/* Data Grid */}
      <div className="w-4/5">
        <h2 className="text-2xl font-semibold mb-4">Emergency Location List</h2>
        <DataGrid
          rows={locations.map((location: Emergency) => ({ ...location, id: location.id }))}
          rowHeight={100}
          columns={columns}
          sx={{ backgroundColor: "#FFFFFF" }}
          pageSizeOptions={[5, 10, 25]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        />
      </div>
    </div>
  );
}