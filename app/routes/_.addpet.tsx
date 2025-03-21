import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import PetAPI from "~/server/repositories/petRepository";
import { ImageAPI } from "~/server/repository";
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
    const imageName = formData.get("imageName") as string | null;

    if (!image) {
      return { error: "Please upload an image." };
    }

    if(!imageName)
      return {error: "No image name."}

    await PetAPI.createPet(
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
    await ImageAPI.uploadImage(image, imageName);
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
  const [imageName, setImageName] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // use useState for instant preview (remix is not)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetcher = useFetcher<typeof action>();
  const tailwindIn =
    "w-full bg-white border-4 rounded-xl px-4 py-2 text-black/80 focus:outline-none focus:border-blue-600";

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    console.log("file : ", file)
    if (file) {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview); // Revoke previous preview before setting a new one
      }
      setImagePreview(URL.createObjectURL(file));
      setImageName(file.name); // Store the file name
      setImage(file);
    }
  };

  // Cleanup the object URL when the component unmounts
  useEffect(() => {
    console.log("imagePreview : ", imagePreview)
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      
    };
  }, [imagePreview]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!image) {
      alert("Please upload an image");
      return;
    }

    setIsSubmitting(true)
    const formData = new FormData(event.currentTarget);
    formData.append("image", image); // Append actual file

    if (imageName) {
      formData.append("imageName", imageName); // Append image name
    }

    fetcher.submit(formData, {
      method: "post",
      encType: "multipart/form-data",
    });
  };

  useEffect(() => {
    if (fetcher.state === "idle") {
      setIsSubmitting(false); // Reset loading state when fetch is complete
    }
  }, [fetcher.state]);

  return (
    <div>
      {username ? (
        <div className="flex flex-col justify-start items-center w-svw min-h-screen">
          <HeadPart />

          <fetcher.Form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="flex flex-row items-start justify-center space-x-10 p-20 w-[60%]"
          >
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
              <label className="bg-primary-orange text-white font-bold px-6 py-2 rounded-3xl hover:scale-105 duration-200 cursor-pointer">
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  name="image"
                  required
                  className="hidden"
                />
              </label>
            </div>
            <div className="flex flex-col justify-center w-full space-y-2">
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  placeholder="Pet name"
                  className={`${tailwindIn}`}
                  required
                />
              </label>

              <label>
                Type:
                <select name="type" className={`${tailwindIn}`} required>
                  <option value="Dogs">Dogs</option>
                  <option value="Cats">Cats</option>
                  <option value="Rabbits">Rabbits</option>
                  <option value="Others">Others</option>
                </select>
              </label>

              <label>
                Breed:
                <input
                  type="text"
                  name="breed"
                  placeholder="ex. Golden Retriever"
                  className={`${tailwindIn}`}
                  required
                />
              </label>

              <label>
                Color:
                <input
                  type="text"
                  name="color"
                  placeholder="ex. Orange"
                  className={`${tailwindIn}`}
                  required
                />
              </label>

              <label>
                Gender:
                <select name="gender" className={`${tailwindIn}`} required>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>

              <label>
                Age (Years):
                <input
                  type="number"
                  name="ageYear"
                  placeholder="Age Years"
                  className={`${tailwindIn}`}
                  required
                />
              </label>

              <label>
                Age (Months):
                <input
                  type="number"
                  name="ageMonth"
                  placeholder="Age Months"
                  className={`${tailwindIn}`}
                  required
                />
              </label>

              <label>
                Weight (Kg):
                <input
                  type="number"
                  name="weight"
                  placeholder="ex. 2"
                  className={`${tailwindIn}`}
                  required
                />
              </label>

              <label>
                Spayed/Neutered:
                <select name="spayed" className={`${tailwindIn}`} required>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </label>

              <label>
                Description:
                <textarea
                  name="detail"
                  placeholder="Description"
                  className={`${tailwindIn}`}
                  required
                />
              </label>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex flex-row hover:scale-105 duration-200 space-x-2 text-white font-bold shadow-lg 
          bg-green-500 rounded-3xl text-2xl justify-center items-center w-full h-fit py-2`}
                name="_action"
                value="add"
              >
                {isSubmitting ? "Adding..." : "Add Pet for Adoption"}
              </button>
            </div>
          </fetcher.Form>
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
