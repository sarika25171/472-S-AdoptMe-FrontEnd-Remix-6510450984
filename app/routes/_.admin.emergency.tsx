import { json, redirect } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import type { LoaderFunction, ActionFunction, LoaderFunctionArgs } from "@remix-run/node";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { EmergencyAPI } from "~/server/repository";
import { getSession } from "~/server/session";

export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  let emergencyLocations = await EmergencyAPI.getAll();
  const session = await getSession(request.headers.get("Cookie"));
  const isAdmin = session.get("isAdmin");
  if (!isAdmin) {
    return redirect("/");
  }
  return { emergencyLocations, isAdmin };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const locationId = Number(formData.get("locationId"));

  if (!locationId) return json({ error: "Invalid location ID" }, { status: 400 });

  try {
    await EmergencyAPI.deleteLocationByID(locationId);
    return json({ success: true });
  } catch (error) {
    return json({ error: "Failed to delete location" }, { status: 500 });
  }
};

export default function AdminEmergencyManagement() {
  const { emergencyLocations, isAdmin } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
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
          rows={emergencyLocations.map((loc) => ({ ...loc, id: loc.location_id }))}
          columns={columns}
          sx={{ backgroundColor: "#FFFFFF" }}
        />
      </div>
    </div>
  );
}
