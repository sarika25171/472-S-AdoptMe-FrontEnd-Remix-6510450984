import {
    DataGrid,
    GridColDef,
  } from "@mui/x-data-grid";
  import { useEffect, useState } from "react";
  import Pet from "~/models/pet";
  import { DOMAIN } from "~/server/domain";
  
  export default function AdminView() {
    const [rows, setRows] = useState<Pet[]>([]);
  
    async function fetchPet() {
      const response = await fetch(DOMAIN + "/pet/getAllPet");
      const data: Pet[] = await response.json();
      // Ensure each row has an `id` field for DataGrid
      setRows(data.map((pet) => ({ ...pet, id: pet.pet_id })));
    }
  
    useEffect(() => {
      fetchPet();
    }, []);
  
    const columns: GridColDef[] = [
      { field: "pet_id", headerName: "ID", flex: 1 },
      { field: "pet_name", headerName: "Name", flex: 1 },
      {
        field: "age",
        headerName: "Age",
        flex: 1,
        valueGetter: (value, row) =>
          `${row.age_years} years ${row.age_months} months`,
      },
      { field: "species", headerName: "Species", flex: 1},
      { field: "breed", headerName: "Breed", flex: 1 },
      { field: "sex", headerName: "Sex", flex: 1 },
      {
        field: "photo_url",
        headerName: "Image", 
        flex: 1,
        renderCell: (params) => (
          <img
            src={params.row.photo_url}
            alt={`${params.row.pet_name}'s photo`}
            style={{ width: 50, height: 50, borderRadius: "50%" }}
          />
        ),
      },
      { field: "weight", headerName: "Weight (kg)", width: 110 },
      { field: "adopted", headerName: "Adopted", flex: 1, type: "boolean" },
      { field: "spayed", headerName: "Spayed", flex: 1, type: "boolean" },
      { field: "description", headerName: "Description", flex: 1},
      { field: "color", headerName: "Color", flex: 1 },
    ];
  
    return (
        <div className="flex flex-col justify-start items-center w-full min-h-screen p-10 space-y-8">
            <h1 className="text-[48px] font-bold text-black">Admin's Page</h1>
            <div
        style={{
          height: "80%",
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <DataGrid 
            rows={rows} 
            columns={columns}
            sx={{ backgroundColor: "#FFFFFF" }}
            className="[&>*]:font-urbanist [&>*]:font-bold"
        />
      </div>
        </div>
    );
  }
  