import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "@remix-run/react";
import axios from "axios";
import { c } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
import { useEffect, useState } from "react";
import Adoption from "~/models/adoption";
import Pet from "~/models/pet";
import User from "~/models/user";
import { DOMAIN } from "~/server/domain";

export default function AdminView() {
  const [rows, setRows] = useState<Pet[]>([]);
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigator = useNavigate();

  async function fetchUsers() {
    const response = await fetch(DOMAIN + "/user/getAllUser");
    const data: User[] = await response.json();
    setUsers(data);
    const tmpUsername = sessionStorage.getItem("username");
    const currentUser = data.find((user) => user.username === tmpUsername);
    if (currentUser?.priority !== "admin") {
      navigator("/");
    }
    setCurrentUser(currentUser || null);
  }

  async function fetchPet() {
    const response = await fetch(DOMAIN + "/pet/getAllPet");
    const data: Pet[] = await response.json();
    // Ensure each row has an `id` field for DataGrid
    setRows(data.map((pet) => ({ ...pet, id: pet.pet_id })));
  }

  async function fetchAdoptation() {
    const options = {
      method: "GET",
      url: DOMAIN + "/adoption/getAllAdoption",
    };

    try {
      const { data } = await axios.request<Adoption[]>(options);
      setAdoptions(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUsers();
    fetchPet();
    fetchAdoptation();
  }, []);

  const handleDelete = (id: number) => {
    const row = rows.find((row) => row.pet_id === id);
    // Remove the row from the table
    setRows((prevRows) => prevRows.filter((row) => row.pet_id !== id));

    // Optionally, make a request to delete this pet from the server
    console.log("ID : " + id);
    fetch(DOMAIN + "/pet/deletePetByID", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pet_id: id,
      }),
    });

    // Delete the adoption record
    async function deleteAdoption() {
      const adoption = adoptions.find((adoption) => adoption.pet_id === id);
      const options = {
        method: "DELETE",
        url: "https://adoptme-db.prakasitj.com/adoption/delete",
        headers: { "Content-Type": "application/json" },
        data: { added_id: adoption?.added_id },
      };

      try {
        const { data } = await axios.request(options);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    async function deleteFile(fileName: string) {
      const options = {
        method: "DELETE",
        url: "https://cdn.prakasitj.com/proxy/delete",
        headers: { "Content-Type": "application/json" },
        data: { filename: fileName, key: "T6qom9erqaYUpddmnWlo" },
      };

      try {
        const { data } = await axios.request(options);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    deleteAdoption();
    if (row?.photo_url) {
      const fileName = row.photo_url.split("/").pop();
      deleteFile(fileName!);
    }
  };

  const columns: GridColDef[] = [
    { field: "pet_id", headerName: "ID", flex: 1 },
    {
      field: "photo_url",
      headerName: "Image",
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.row.photo_url}
          alt={`${params.row.pet_name}'s photo`}
          style={{ width: 120, height: 120, borderRadius: "10%" }}
        />
      ),
    },
    { field: "pet_name", headerName: "Name", flex: 1 },
    {
      field: "age",
      headerName: "Age",
      flex: 1,
      valueGetter: (value, row) =>
        `${row.age_years} years ${row.age_months} months`,
    },
    { field: "species", headerName: "Type", flex: 1 },
    { field: "breed", headerName: "Breed", flex: 1 },
    { field: "sex", headerName: "Sex", flex: 1 },
    { field: "weight", headerName: "Weight (kg)", flex: 1 },
    { field: "adopted", headerName: "Adopted", flex: 1, type: "boolean" },
    { field: "spayed", headerName: "Spayed", flex: 1, type: "boolean" },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "color", headerName: "Color", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div className="flex flex-col">
          <button
            className="bg-red-500 rounded-xl"
            onClick={() => handleDelete(params.row.id)}
          >
            <h1 className="text-center text-black0">Delete</h1>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col justify-start items-center w-full min-h-screen p-10 space-y-8">
      {currentUser?.priority === "admin" && (
        <h1 className="text-[48px] font-bold text-black">Admin's Page</h1>
      )}
      <div
        style={{
          height: "80%",
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {currentUser?.priority === "admin" && (
          <DataGrid
            rows={rows}
            rowHeight={120}
            columns={columns}
            sx={{ backgroundColor: "#FFFFFF" }}
            className="[&>*]:font-urbanist [&>*]:font-bold [&>*]:text-black"
          />
        )}
      </div>
    </div>
  );
}
