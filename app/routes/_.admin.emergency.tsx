import { json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import type { 
  LoaderFunction, 
  ActionFunction, 
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
  const navigate = useNavigate();
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

  const handleMapHubAction = (action: 'add' | 'delete') => {
    // Navigate to MapHub with the appropriate action context
    const mapHubUrl = "https://maphub.net/nammeyyy/map";
    window.open(mapHubUrl, '_blank');
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
      
      <div className="flex gap-4 w-4/5 justify-end mb-4">
        <button
          onClick={() => handleMapHubAction('add')}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg flex items-center"
        >
          <span className="mr-2">+</span> Add Location
        </button>
        
        <button
          onClick={() => handleMapHubAction('delete')}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg flex items-center"
        >
          <span className="mr-2">-</span> Delete Location
        </button>
      </div>
      
      <div className="w-4/5">
        <DataGrid
          rows={locations.map((location: Emergency) => ({ ...location, id: location.id }))}
          rowHeight={100}
          columns={columns}
          sx={{ backgroundColor: "#FFFFFF" }}
          pageSizeOptions={[5, 10, 25]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        />
      </div>
      
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 w-4/5 mt-6">
        <p className="text-yellow-700">
          <strong>Note:</strong> To add or delete locations, click the respective button above. 
          You will be redirected to MapHub where you can manage the emergency locations. 
          Any changes you make will be updated in this application automatically.
        </p>
      </div>
    </div>
  );
}