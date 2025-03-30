import { json, redirect } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import type { LoaderFunction, ActionFunction, LoaderFunctionArgs } from "@remix-run/node";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { EmergencyAPI } from "~/server/repository";
import { getSession } from "~/server/session";
import { Emergency } from "~/models/emergency";

export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  let emergencyLocations = await EmergencyAPI.getAllEmergencies();
  const session = await getSession(request.headers.get("Cookie"));
  const isAdmin = session.get("isAdmin");
  if (!isAdmin) {
    return redirect("/");
  }
  return { emergencyLocations, isAdmin };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const locationId = String(formData.get("emergency_id"));

  if (!locationId) return json({ error: "Invalid location ID" }, { status: 400 });

  try {
    await EmergencyAPI.deleteLocationByID(locationId);

    const emergency = await EmergencyAPI.getEmergencyById(locationId);
    if (emergency?.id) {
      await EmergencyAPI.deleteLocationByID(emergency.id);
    }

    return json({ success: true });
  } catch (error) {
    return json({ error: "Failed to delete location" }, { status: 500 });
  }
};

export default function AdminEmergencyManagement() {
  const { emergencyLocations, isAdmin } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const columns: GridColDef[] = [
    { field: "emergency_id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "address", headerName: "Address", flex: 3 },
    { field: "phone", headerName: "Phone", flex: 2 },
    { field: "type", headerName: "Type", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <fetcher.Form method="post">
          <input type="hidden" name="locationId" value={params.row.id} />
          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-lg">
            Delete
          </button>
        </fetcher.Form>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-10 space-y-8">
      <h1 className="text-4xl font-bold">Emergency Locations Management</h1>
      <div className="w-4/5">
        <DataGrid
          rows={emergencyLocations.map((location: Emergency) => ({ ...location, id: location.id }))}
          rowHeight={100}
          columns={columns}
          sx={{ backgroundColor: "#FFFFFF" }}
        />
      </div>
    </div>
  );
}
