import { Link } from "@remix-run/react";
import axios from "axios";
 import { useEffect, useState } from "react";
import CustomButton from "~/components/custom_button";
import CustomTextBox from "~/components/custom_textbox";
import UploadButton from "~/components/upload_button";
import Pet from "~/models/pet";
import User from "~/models/user";
import { DOMAIN, PHOTO, PHOTOPOST } from "~/server/domain";

export default function AddPetPage() {
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("Dogs");
  const [breed, setBreed] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [gender, setGender] = useState<string>("Male");
  const [ageYear, setAgeYear] = useState<string>("0");
  const [ageMonth, setAgeMonth] = useState<string>("0");
  const [weight, setWeight] = useState<string>("0");
  const [spayed, setSpayed] = useState<string>("false");
  const [detail, setDetail] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("Dogs");
  const [selectedGender, setSelectedGender] = useState<string>("Male");
  const [selectedSpayed, setSelectedSpayed] = useState<string>("false");
  const [image, setImage] = useState<File | null>(null); // New state for image file
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [waiting, setWaiting] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (username) {
      setUsername(username);
    }
  }, []);

  useEffect(() => {
    const isValid =
      name.trim() !== "" &&
      type.trim() !== "" &&
      breed.trim() !== "" &&
      color.trim() !== "" &&
      gender.trim() !== "" &&
      ageYear.trim() !== "" &&
      ageMonth.trim() !== "" &&
      weight.trim() !== "" &&
      spayed.trim() !== "" &&
      detail.trim() !== "" &&
      image != null;
    setIsFormValid(isValid);
    console.log(isValid);
  }, [
    name,
    type,
    breed,
    color,
    gender,
    ageYear,
    ageMonth,
    weight,
    spayed,
    detail,
    selectedGender,
    selectedType,
    selectedSpayed,
    image,
  ]);

  useEffect(() => {
    async function fetchData(
      name: string,
      type: string,
      breed: string,
      color: string,
      gender: string,
      ageYear: string,
      ageMonth: string,
      weight: string,
      spayed: string,
      detail: string
    ) {
      uploadFile(image!, name.trim().replace(" ", "") + "-photo.jpg");
      console.log(DOMAIN + "/pet/post");
      const sendData = {
        method: "POST",
        url: DOMAIN + "/pet/post",
        headers: { "Content-Type": "application/json" },
        data: {
          pet_name: name,
          age_years: parseInt(ageYear),
          age_months: parseInt(ageMonth),
          species: type,
          breed: breed,
          photo_url:
            PHOTO +
            name.trim().replace(" ", "") +
            "-photo.jpg",
          weight: parseInt(weight),
          adopted: false,
          spayed: false,
          description: detail,
          color: color,
          sex: gender,
        },
      };

      try {
        const { data } = await axios.request<Pet>(sendData);
        const userString = sessionStorage.getItem("user");
        if (!userString) {
          return;
        }
        const user: User = JSON.parse(userString);
        fetchAdoption({added_user: user.user_id, pet_id: data.pet_id});
        console.table(data);
      } catch (error) {
        console.error(error);
      } finally {
        setFetching(false);
      }
    }

    async function fetchAdoption({added_user, pet_id}: {added_user: string, pet_id: number}) {
      const options = {
        method: 'POST',
        url: DOMAIN+'/adoption/post',
        headers: {'Content-Type': 'application/json'},
        data: {added_user: added_user, pet_id: pet_id}
      };
      
      try {
        const { data } = await axios.request(options);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }

    if (fetching) {
      fetchData(
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
  }, [fetching]);

  async function uploadFile(file: File, fileName: string) {
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("filename", fileName);
    formdata.append("key", "T6qom9erqaYUpddmnWlo");

    const sendData = {
      method: "POST",
      url: PHOTOPOST,
      headers: { "Content-Type": "multipart/form-data" },
      data: formdata,
    };

    try {
      const { data } = await axios.request(sendData);
      setWaiting(false);
      setSuccess(true);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  // Handler for file selection
  const handleFileSelect = (file: File | null) => {
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Generate a URL for image preview
    } else {
      setImagePreview(null); // Clear preview if no file is selected
    }
  };

  return (
    <div>
      {username === "" ? (
        <div className="flex flex-col justify-center items-center w-svw h-[75svh] overflow-hidden">
          <Link to="/signin" className="text-black font-bold text-2xl ">
          <h1 className="text-black font-bold text-5xl hover:text-gray-500 active:scale-95">Please Sign In</h1>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col justify-start items-center w-svw min-h-screen">
          <h1 className="font-bold text-black text-[64px]">Add Pet</h1>
          <h1 className="text-black text-2xl">
            List pets in need of a loving home! Share details about the animal’s
            personality, age, and special needs to help them find the perfect
            family. Make a difference by helping pets find their forever homes.
          </h1>
          {/* Body */}
          <div className="flex flex-row items-start justify-center space-x-10 p-20 w-[60%]">
            {/* Image */}
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
              <UploadButton
                text="Upload Photo"
                color="bg-primary-orange"
                onFileSelect={handleFileSelect} // Pass file select handler to UploadButton
              />
            </div>
            {/* Right */}
            <div className="flex flex-col justify-center w-full items-start space-y-2">
              <h1 className="text-black font-bold text-xl">Name</h1>
              <CustomTextBox type="text" text="Name" state={setName} />
              <h1 className="text-black font-bold text-xl">Type</h1>
              <select
                className="w-full bg-white border-4 border-green-600 h-12 rounded-xl px-4 py-2 text-black/80"
                onChange={(e) => {
                  setSelectedType(e.currentTarget.value);
                  setType(e.currentTarget.value);
                }}
              >
                <option value="Dogs">Dogs</option>
                <option value="Cats">Cats</option>
                <option value="Rabbits">Rabbits</option>
                <option value="Others">Others</option>
              </select>
              <h1 className="text-black font-bold text-xl">Breed</h1>
              <CustomTextBox type="text" text="Breed" state={setBreed} />
              <h1 className="text-black font-bold text-xl">Color</h1>
              <CustomTextBox type="text" text="Color" state={setColor} />
              <h1 className="text-black font-bold text-xl">Gender</h1>
              <select
                className="w-full bg-white border-4 border-green-600 h-12 rounded-xl px-4 py-2 text-black/80"
                onChange={(e) => {
                  setSelectedGender(e.currentTarget.value);
                  setGender(e.currentTarget.value);
                }}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <h1 className="text-black font-bold text-xl">Age Years</h1>
              <CustomTextBox type="text" text="Age Years" state={setAgeYear} />
              <h1 className="text-black font-bold text-xl">Age Months</h1>
              <CustomTextBox
                type="text"
                text="Age Months"
                state={setAgeMonth}
              />
              <h1 className="text-black font-bold text-xl">Weight</h1>
              <CustomTextBox type="text" text="Weight" state={setWeight} />
              <h1 className="text-black font-bold text-xl">Spayed/Neutered</h1>
              <select
                className="w-full bg-white border-4 border-green-600 h-12 rounded-xl px-4 py-2 text-black/80"
                onChange={(e) => {
                  setSelectedSpayed(e.currentTarget.value);
                  setSpayed(e.currentTarget.value);
                }}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
              <h1 className="text-black font-bold text-xl">Details</h1>
              <CustomTextBox
                type="text"
                text="Details"
                height={100}
                state={setDetail}
              />
              {waiting && <h1 className="text-black font-bold text-3xl">Please wait...</h1>}
              {success && <h1 className="text-green-600 font-bold text-3xl">Create Pet Success</h1>}
              <CustomButton
                text="Add Pet For Adoption"
                destination="/pets"
                color="bg-primary-orange"
                disabled={!isFormValid}
                noRedirect={true}
                click={() => {
                  setWaiting(true);
                  setFetching(true);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
