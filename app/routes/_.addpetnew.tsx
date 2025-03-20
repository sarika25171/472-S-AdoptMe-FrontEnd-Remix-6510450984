import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { useRef, useState } from "react";
import UploadButton from "~/components/upload_button";
import PetAPI from "~/server/repositories/petRepository";

const [image, setImage] = useState<File | null>(null);
const [imagePreview, setImagePreview] = useState<string | null>(null); // use useState for instant preview (remix is not)

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const action = formData.get("_action");
  if (action === "add") {
    const name = formData.get("name") as string;
    const type = formData.get("type") as string;
    const breed = formData.get("breed") as string;
    const color = formData.get("color") as string;
    const gender = formData.get("gender") as string;
    const ageYear = formData.get("ageYear") as string;
    const ageMonth = formData.get("ageMonth") as string;
    const weight = formData.get("weight") as string;
    const spayed = formData.get("spayed") as string;
    const detail = formData.get("detail") as string;
    PetAPI.createPet(
      name,
      type,
      breed,
      color,
      gender,
      ageYear,
      ageMonth,
      weight,
      spayed,
      detail
    );
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const username = sessionStorage.getItem("username");
  return { username };
}

export default function AddPetPage() {
  const { username } = useLoaderData<typeof loader>();
  return (
    <div>
      {username === "" ? (
        <div className="flex flex-col justify-start items-center w-svw min-h-screen">
          {HeadPart()}
          {/* Body */}
          <div className="flex flex-row items-start justify-center space-x-10 p-20 w-[60%]">
            {ImagePart()}
            {FormPart()}
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-svw h-[75svh] overflow-hidden">
          <Link to="/signin" className="text-black font-bold text-2xl ">
            <h1 className="text-black font-bold text-5xl hover:text-gray-500 active:scale-95">
              Please Sign In
            </h1>
          </Link>
        </div>
      )}
    </div>
  );
}

const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0] || null;
  setImage(file);
  if (file) {
    setImagePreview(URL.createObjectURL(file)); // Generate preview URL
  } else {
    setImagePreview(null); // Clear preview if no file is selected
  }
};

function HeadPart() {
  return (
    <>
      <h1 className="font-bold text-black text-[64px]">Add Pet</h1>
      <h1 className="text-black text-2xl">
        List pets in need of a loving home! Share details about the animal’s
        personality, age, and special needs to help them find the perfect
        family. Make a difference by helping pets find their forever homes.
      </h1>
    </>
  );
}

function ImagePart() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click(); // Trigger file input click
  };
  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      {imagePreview ? (
        <img
          src={imagePreview}
          alt="Uploaded pet"
          className="w-[400px] h-[400px] border-2 border-black rounded-xl"
        />
      ) : (
        <div className="w-[400px] h-[400px] border-2 border-black rounded-xl flex items-center justify-center">
          <p className="text-gray-500">No image uploaded</p>
        </div>
      )}
      <button
        type="button"
        onClick={handleClick}
        className={`flex flex-row hover:scale-110 duration-200 space-x-2 text-white font-bold shadow-lg bg-primary-orange rounded-3xl text-2xl justify-center items-center w-fit h-fit px-6 py-2`}
      >
        <h1>Upload Photo</h1>
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileSelect}
        style={{ display: "none" }} // Hide the file input
      />
    </div>
  );
}

function FormPart() {
  const fetcher = useFetcher<typeof action>();
  const formData = fetcher.formData;
  const isFormValid =
    formData &&
    [
      "name",
      "type",
      "breed",
      "color",
      "gender",
      "ageYear",
      "ageMonth",
      "weight",
      "spayed",
      "description",
    ].every((field) => formData.get(field)?.toString().trim() !== "");

  return (
    <fetcher.Form
      method="post"
      className="flex flex-col justify-center w-full items-start space-y-2"
    >
      <label>
        Name :
        <input type="text" name="name" placeholder="Pet name" />
      </label>

      <label>
        Type :
        <select
          className="w-full bg-white border-4 border-green-600 h-12 rounded-xl px-4 py-2 text-black/80"
          name="type"
        >
          <option value="Dogs">Dogs</option>
          <option value="Cats">Cats</option>
          <option value="Rabbits">Rabbits</option>
          <option value="Others">Others</option>
        </select>
      </label>

      <label>
        Breed :
        <input
          type="text"
          name="breed"
          placeholder="ex. Golden Retriever"
        />
      </label>

      <label>
        Color :
        <input type="text" name="color" placeholder="ex. Orange" />
      </label>

      <label>
        Gender :
        <select
          className="w-full bg-white border-4 border-green-600 h-12 rounded-xl px-4 py-2 text-black/80"
          name="gender"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>

      <label>
        {" "}
        Age Years :
        <input type="text" name="ageYear" placeholder="Age Years" />
      </label>

      <label>
        {" "}
        Age Months :
        <input type="text" name="ageMonth" placeholder="Age Months" />
      </label>

      <label>
        {" "}
        Weight Kg.:
        <input type="text" name="weight" placeholder="ex. 2" />
      </label>

      <label>
        {" "}
        Spayed/Neutered :
        <select
          className="w-full bg-white border-4 border-green-600 h-12 rounded-xl px-4 py-2 text-black/80"
          name="spayed"
        >
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </label>

      <label>
        {" "}
        Description :
        <textarea name="description" placeholder="Description" />
      </label>

      <button type="submit" name="_action" value="add" disabled={!isFormValid}>
        Add Pet For Adoption
      </button>
    </fetcher.Form>
  );
}
