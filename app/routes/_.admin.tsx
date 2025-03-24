import { json } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import type { LoaderFunction, ActionFunction, LoaderFunctionArgs } from "@remix-run/node";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { PetAPI, AdoptionAPI, ImageAPI } from "~/server/repository";
import Pet from "~/models/pet";

export const loader: LoaderFunction = async ({ request } : LoaderFunctionArgs) => {
  // const users = await UserAPI.getUser();
  const pets = await PetAPI.getAll();
  // const adoptions = await AdoptionAPI.getAdoption();

  return { pets };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const petId = Number(formData.get("petId"));
  const photoUrl = formData.get("photoUrl") as string;

  if (!petId) return json({ error: "Invalid pet ID" }, { status: 400 });

  try {
    // Delete pet
    await PetAPI.deletePetByID(petId);

    // Delete adoption record if it exists
    const adoption = await AdoptionAPI.getAdoptionByPetID(petId);
    if (adoption?.id) {
      await AdoptionAPI.deleteAdoptionByID(adoption.id);
    }

    // Delete pet image
    if (photoUrl) {
      const fileName = photoUrl.split("/").pop();
      if (fileName) {
        ImageAPI.deleteImage(fileName);
      }
    }

    return json({ success: true });
  } catch (error) {
    return json({ error: "Failed to delete pet" }, { status: 500 });
  }
};

// --- AdminView Component ---
export default function AdminView() {
  const { pets } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const columns: GridColDef[] = [
    { field: "pet_id", headerName: "ID", flex: 1 },
    {
      field: "photo_url",
      headerName: "Image",
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.row.photo_url}
          alt={`${params.row.pet_name}`}
          className="w-24 h-24 rounded-lg object-cover"
        />
      ),
    },
    { field: "pet_name", headerName: "Name", flex: 1 },
    { field: "species", headerName: "Type", flex: 1 },
    { field: "breed", headerName: "Breed", flex: 1 },
    { field: "sex", headerName: "Sex", flex: 1 },
    { field: "weight", headerName: "Weight (kg)", flex: 1 },
    { field: "adopted", headerName: "Adopted", flex: 1, type: "boolean" },
    { field: "spayed", headerName: "Spayed", flex: 1, type: "boolean" },
    { field: "color", headerName: "Color", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <fetcher.Form method="post">
          <input type="hidden" name="petId" value={params.row.pet_id} />
          <input type="hidden" name="photoUrl" value={params.row.photo_url} />
          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-lg">
            Delete
          </button>
        </fetcher.Form>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-10 space-y-8">
      <h1 className="text-4xl font-bold">Admin's Page</h1>
      <div className="w-4/5">
        <DataGrid
          rows={pets.map((pet: Pet) => ({ ...pet, id: pet.pet_id }))}
          rowHeight={100}
          columns={columns}
          sx={{ backgroundColor: "#FFFFFF" }}
        />
      </div>
    </div>
  );
}
