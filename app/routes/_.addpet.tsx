import { useState } from "react";
import CustomTextBox from "~/components/custom_textbox";

export default function AddPetPage() {
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [breed, setBreed] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [age, setAge] = useState<string>("0");
  const [weight, setWeight] = useState<string>("0");
  const [spayed, setSpayed] = useState<string>("false");
  const [detail, setDetail] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedSpayed, setSelectedSpayed] = useState<string>("");

  return (
    <div className="flex flex-col justify-start items-center w-svw min-h-screen">
      <h1 className="font-bold text-black text-[64px]">Add Pet</h1>
      <h1 className="text-black text-2xl">List pets in need of a loving home! Share details about the animal’s personality, age, and special needs to help them find the perfect family. Make a difference by helping pets find their forever homes.</h1>
      {/* Body */}
      <div className="flex flex-row items-start justify-center space-x-10 p-20 w-[60%]">
        {/* Image */}
        <div className="flex flex-col justify-center items-center space-y-4">
            <img src="" alt="" className="w-[400px] h-[400px] border-2 border-black rounded-xl"/>
            <button className="text-black font-bold text-xl rounded-full bg-primary-white-tone border-2 border-primary-orange px-4 py-2 hover:bg-primary-orange hover:text-white">
                Upload Photo
            </button>
        </div>
        {/* Right */}
        <div className="flex flex-col justify-center w-full items-start space-y-2">
            <h1 className="text-black font-bold text-xl">Name</h1>
            <CustomTextBox type="text" text="Name" state={setName}/>
            <h1 className="text-black font-bold text-xl">Type</h1>
            <select className="w-full bg-white border-2 border-green-600 h-12 rounded-xl px-4 py-2 text-black/80"
            onChange={(e)=>{
              setSelectedType(e.currentTarget.value)
              setType(e.currentTarget.value)
              }}>
              <option value="Dogs">Dogs</option>
              <option value="Cats">Cats</option>
              <option value="Rabbits">Rabbits</option>
              <option value="Others">Others</option>
            </select>
            <h1 className="text-black font-bold text-xl">Breed</h1>
            <CustomTextBox type="text" text="Breed" state={setBreed}/>
            <h1 className="text-black font-bold text-xl">Color</h1>
            <CustomTextBox type="text" text="Color" state={setColor}/>
            <h1 className="text-black font-bold text-xl">Gender</h1>
            <select className="w-full bg-white border-2 border-green-600 h-12 rounded-xl px-4 py-2 text-black/80"
            onChange={(e)=>{
              setSelectedGender(e.currentTarget.value)
              setGender(e.currentTarget.value)
              }}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <h1 className="text-black font-bold text-xl">Age</h1>
            <CustomTextBox type="text" text="Age" state={setAge}/>
            <h1 className="text-black font-bold text-xl">Weight</h1>
            <CustomTextBox type="text" text="Weight" state={setWeight}/>
            <h1 className="text-black font-bold text-xl">Spayed/Neutered</h1>
            <select className="w-full bg-white border-2 border-green-600 h-12 rounded-xl px-4 py-2 text-black/80"
            onChange={(e)=>{
              setSelectedGender(e.currentTarget.value)
              setGender(e.currentTarget.value)
              }}>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
            <h1 className="text-black font-bold text-xl">Details</h1>
            <CustomTextBox type="text" text="Details" height={100} state={setDetail}/>
        </div>
      </div>
    </div>
  );
}