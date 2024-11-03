// import { useState } from "react";
// import CustomButton from "~/components/custom_button";
// import CustomTextBox from "~/components/custom_textbox";
// import UploadButton from "~/components/upload_button";

// export default function AddPetPage() {
//   const [name, setName] = useState<string>("");
//   const [type, setType] = useState<string>("");
//   const [breed, setBreed] = useState<string>("");
//   const [color, setColor] = useState<string>("");
//   const [gender, setGender] = useState<string>("");
//   const [age, setAge] = useState<string>("0");
//   const [weight, setWeight] = useState<string>("0");
//   const [spayed, setSpayed] = useState<string>("false");
//   const [detail, setDetail] = useState<string>("");
//   const [selectedType, setSelectedType] = useState<string>("");
//   const [selectedGender, setSelectedGender] = useState<string>("");
//   const [selectedSpayed, setSelectedSpayed] = useState<string>("");

//   return (
//     <div className="flex flex-col justify-start items-center w-svw min-h-screen">
//       <h1 className="font-bold text-black text-[64px]">Add Pet</h1>
//       <h1 className="text-black text-2xl">
//         List pets in need of a loving home! Share details about the animal’s
//         personality, age, and special needs to help them find the perfect
//         family. Make a difference by helping pets find their forever homes.
//       </h1>
//       {/* Body */}
//       <div className="flex flex-row items-start justify-center space-x-10 p-20 w-[60%]">
//         {/* Image */}
//         <div className="flex flex-col justify-center items-center space-y-4">
//           <img
//             src=""
//             alt=""
//             className="w-[400px] h-[400px] border-2 border-black rounded-xl"
//           />
//           <UploadButton
//             text="Upload Photo"
//             color="bg-primary-orange"
//           />
//         </div>
//         {/* Right */}
//         <div className="flex flex-col justify-center w-full items-start space-y-2">
//           <h1 className="text-black font-bold text-xl">Name</h1>
//           <CustomTextBox type="text" text="Name" state={setName} />
//           <h1 className="text-black font-bold text-xl">Type</h1>
//           <select
//             className="w-full bg-white border-4 border-green-600 h-12 rounded-xl px-4 py-2 text-black/80"
//             onChange={(e) => {
//               setSelectedType(e.currentTarget.value);
//               setType(e.currentTarget.value);
//             }}
//           >
//             <option value="Dogs">Dogs</option>
//             <option value="Cats">Cats</option>
//             <option value="Rabbits">Rabbits</option>
//             <option value="Others">Others</option>
//           </select>
//           <h1 className="text-black font-bold text-xl">Breed</h1>
//           <CustomTextBox type="text" text="Breed" state={setBreed} />
//           <h1 className="text-black font-bold text-xl">Color</h1>
//           <CustomTextBox type="text" text="Color" state={setColor} />
//           <h1 className="text-black font-bold text-xl">Gender</h1>
//           <select
//             className="w-full bg-white border-4 border-green-600 h-12 rounded-xl px-4 py-2 text-black/80"
//             onChange={(e) => {
//               setSelectedGender(e.currentTarget.value);
//               setGender(e.currentTarget.value);
//             }}
//           >
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//           <h1 className="text-black font-bold text-xl">Age</h1>
//           <CustomTextBox type="text" text="Age" state={setAge} />
//           <h1 className="text-black font-bold text-xl">Weight</h1>
//           <CustomTextBox type="text" text="Weight" state={setWeight} />
//           <h1 className="text-black font-bold text-xl">Spayed/Neutered</h1>
//           <select
//             className="w-full bg-white border-4 border-green-600 h-12 rounded-xl px-4 py-2 text-black/80"
//             onChange={(e) => {
//               setSelectedGender(e.currentTarget.value);
//               setGender(e.currentTarget.value);
//             }}
//           >
//             <option value="false">No</option>
//             <option value="true">Yes</option>
//           </select>
//           <h1 className="text-black font-bold text-xl">Details</h1>
//           <CustomTextBox
//             type="text"
//             text="Details"
//             height={100}
//             state={setDetail}
//           />
//           <button
//             type="button"
//             className="flex flex-row hover:scale-110 duration-200 space-x-2 text-white font-bold shadow-lg bg-primary-orange rounded-3xl text-2xl justify-center items-center w-fit h-fit px-6 py-2"
//           >
//             <h1>Add Pet For Adoption</h1>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import axios from "axios";
import { useEffect, useState } from "react";
import CustomButton from "~/components/custom_button";
import CustomTextBox from "~/components/custom_textbox";
import UploadButton from "~/components/upload_button";
import { DOMAIN } from "~/server/domain";

export default function AddPetPage() {
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [breed, setBreed] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [ageYear, setAgeYear] = useState<string>("0");
  const [ageMonth, setAgeMonth] = useState<string>("0");
  const [weight, setWeight] = useState<string>("0");
  const [spayed, setSpayed] = useState<string>("false");
  const [detail, setDetail] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedSpayed, setSelectedSpayed] = useState<string>("");
  const [image, setImage] = useState<File | null>(null); // New state for image file
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);

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
  }, [name, type, breed, color, gender, ageYear, ageMonth, weight, spayed, detail, selectedGender, selectedType, selectedSpayed]);

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
      detail: string, 
    ) {
      uploadFile(image!, name.trim()+"-photo.jpg");
      console.log(DOMAIN+"/pet/post");
      const sendData = {
        method: "POST",
        url: DOMAIN+"/pet/post",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({
          pet_name: name,
          age_years: parseInt(ageYear),
          age_months: parseInt(ageMonth),
          species: type,
          breed: breed,
          photo_url: "https://cdn.prakasitj.com/proxy/get/"+name.trim()+"-photo.jpg",
          weight: parseInt(weight),
          adopted: false,
          spayed: false,
          description: detail,
          color: color,
          sex: gender
        }),
      };

      try {
        const { data } = await axios.request(sendData);
      } catch (error) {
        console.error(error);
      } finally {
        setFetching(false);
      }
    }

    if (fetching) {
      fetchData(name, type, breed, color, gender, ageYear, ageMonth, weight, spayed, detail);
    }
  }, [fetching]);

  async function uploadFile(file: File, fileName: string) {
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("filename", fileName);
    formdata.append("key", "T6qom9erqaYUpddmnWlo");

    const sendData = {
      method: "POST",
      url: "https://cdn.prakasitj.com/proxy/post",
      headers: { "Content-Type": "multipart/form-data" },
      data: formdata,
    };

    try {
      const { data } = await axios.request(sendData);
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
          <CustomTextBox type="text" text="Age Months" state={setAgeMonth} />
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
          <CustomButton text="Add Pet For Adoption" destination="" color="bg-primary-orange" disabled={false} click={() => {setFetching(true);}}/>
        </div>
      </div>
    </div>
  );
}
