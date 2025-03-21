import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { useRef, useState } from "react";
import UploadButton from "~/components/upload_button";
import PetAPI from "~/server/repositories/petRepository";
import { getSession } from "~/server/session";

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
    const image = formData.get("image") as File | null;

    if (!image) {
      return { error: "Please upload an image." };
    }
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
  const session = await getSession(request.headers.get("Cookie"));
  const username = session.get("username");
  return { username };
}

export default function AddPetPage() {
  const { username } = useLoaderData<typeof loader>();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // use useState for instant preview (remix is not)

  return (
    <div>
      {username ? (
        <div className="flex flex-col justify-start items-center w-svw min-h-screen">
          <HeadPart />
          {/* Body */}
          <div className="flex flex-row items-start justify-center space-x-10 p-20 w-[60%]">
            <ImagePart
              image={image}
              setImage={setImage}
              setImagePreview={setImagePreview}
              imagePreview={imagePreview}
            />
            <FormPart />
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

function ImagePart({
  image,
  setImage,
  setImagePreview,
  imagePreview,
}: {
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  imagePreview: string | null;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setImage(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      {image ? (
        <img
          src={imagePreview!}
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
        onClick={() => fileInputRef.current?.click()}
        className="bg-primary-orange text-white font-bold px-6 py-2 rounded-3xl"
      >
        Upload Photo
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileSelect}
        hidden
      />
    </div>
  );
}

function FormPart() {
  const fetcher = useFetcher<typeof action>();

  return (
    <fetcher.Form
      method="post"
      className="flex flex-col justify-center w-full space-y-2"
    >

      <label>
        Name: <input type="text" name="name" placeholder="Pet name" required />
      </label>

      <label>
        Type:
        <select name="type" required>
          <option value="Dogs">Dogs</option>
          <option value="Cats">Cats</option>
          <option value="Rabbits">Rabbits</option>
          <option value="Others">Others</option>
        </select>
      </label>

      <label>
        Breed: <input type="text" name="breed" placeholder="ex. Golden Retriever" required />
      </label>

      <label>
        Color: <input type="text" name="color" placeholder="ex. Orange" required />
      </label>

      <label>
        Gender:
        <select name="gender" required>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>

      <label>
        Age (Years): <input type="text" name="ageYear" placeholder="Age Years" required />
      </label>

      <label>
        Age (Months): <input type="text" name="ageMonth" placeholder="Age Months" required />
      </label>

      <label>
        Weight (Kg): <input type="text" name="weight" placeholder="ex. 2" required />
      </label>

      <label>
        Spayed/Neutered:
        <select name="spayed" required>
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </label>

      <label>
        Description: <textarea name="detail" placeholder="Description" required />
      </label>

      <button
        type="submit"
        disabled={fetcher.state !== "idle"}
        className="bg-green-500 text-white px-4 py-2 rounded"
        name="_action" 
        value="add"
      >
        Add Pet for Adoption
      </button>
    </fetcher.Form>
  );
}
