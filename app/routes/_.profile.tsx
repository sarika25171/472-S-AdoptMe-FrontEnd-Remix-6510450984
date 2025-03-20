import { Link, useNavigate } from "@remix-run/react";
import axios from "axios";
import { useEffect, useState } from "react";
import BehaviorAnimal from "~/components/behaviorAnimal";
import CustomButton from "~/components/custom_button";
import CustomTextBox from "~/components/custom_textbox";
import BehaviorCard from "~/components/longCard";
import UploadButton from "~/components/upload_button";
import User from "~/models/user";
import { DOMAIN, PHOTO, PHOTOPOST } from "~/server/domain";

export default function ProfilePage() {
  const [user, setUser] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const [firstFetch, setFirstFetch] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [salary, setSalary] = useState<string>("1");
  const [isDefault, setIsDefault] = useState<boolean>(false);
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [image, setImage] = useState<File | null>(null); // New state for image file
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const navigate = useNavigate();
  const getLastItem = (thePath: string): string => {
    return thePath.substring(thePath.lastIndexOf('/') + 1);
  };

  useEffect(() => {
    const isValid =
      username.trim() !== "" ||
      firstName.trim() !== "" ||
      lastName.trim() !== "" ||
      email.trim() !== "" ||
      phoneNumber.trim() !== "" ||
      salary.trim() !== "" ||
      image != null;
    setIsFormValid(isValid);
    console.log(isValid);
  }, [
    username,
    firstName,
    lastName,
    email,
    phoneNumber,
    salary,
    image,
  ]);

  useEffect(() => {
    async function fetchData(
      user_id : string,
      username: string,
      email: string,
      firstName: string,
      lastName: string,
      phoneNumber: string,
      salary: string,
    ) {
      if(image != null) {
        uploadFile(image!, currentUser!.username.trim().replace(" ", "") + "-photo.jpg");
      }
      const sendData = {
        method: 'PUT',
        url: DOMAIN+'/user/updateUserByID',
        headers: {'Content-Type': 'application/json'},
        data: {
          user_id: user_id,
          username: (username=="" ? currentUser?.username : username),
          email: (email=="" ? currentUser?.email : email),
          first_name: (firstName=="" ? currentUser?.first_name : firstName),
          last_name: (lastName==""? currentUser?.last_name : lastName),
          phone_number: (phoneNumber==""? currentUser?.phone_number : phoneNumber),
          salary: (salary==""? parseInt(""+currentUser?.salary) : parseInt(salary)),
          photo_url : (isDefault ? currentUser?.photo_url : currentUser?.username.trim().replace(" ", "")+ "-photo.jpg"),
        }
      };
      
      try {
        const { data } = await axios.request(sendData);
        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        setEdit(false);
        setSuccess(true);
        setFetching(false);
      }
    }

    if (fetching) {
      fetchData(
        currentUser!.user_id,
        username,
        email,
        firstName,
        lastName,
        phoneNumber,
        salary
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
      setSuccess(true);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    async function fetchUser() {
      const options = {
        method: "GET",
        url: DOMAIN + "/user/getAllUser",
      };

      try {
        const { data } = await axios.request<User[]>(options);
        console.log(data);
        setUser(data);
        const username = await sessionStorage.getItem("username");
        if(!username) navigate("/signin");
        setCurrentUser(data.find((user) => user.username === username));
        setFirstFetch(true);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUser();
  }, []);

  useEffect(()=> {
    if(currentUser != undefined) {
      setFirstName(currentUser.first_name);
      setLastName(currentUser.last_name);
      setUsername(currentUser.username);
      setEmail(currentUser.email);
      setPhoneNumber(currentUser.phone_number);
      setSalary(""+currentUser.salary);
      setPhotoUrl(PHOTO+currentUser.photo_url);
      if(getLastItem(currentUser.photo_url) == "default-profile.png") {
        setIsDefault(true);
      }
    }
  }, [firstFetch]);

  useEffect(()=>{
    if(edit == true) {
      setFirstName("");
      setLastName("");
      setUsername("");
      setEmail("");
      setPhoneNumber("");
      setSalary("");
      setPhotoUrl(photoUrl);
      } else {
      if(currentUser != undefined) {
        setFirstName(currentUser.first_name);
        setLastName(currentUser.last_name);
        setUsername(currentUser.username);
        setEmail(currentUser.email);
        setPhoneNumber(currentUser.phone_number);
        setSalary(""+currentUser.salary);
        setPhotoUrl(PHOTO+currentUser.photo_url);
      }
      window.location.reload
    }
  }, [edit]);

  useEffect(()=> {
    if(imagePreview != null) {
      setPhotoUrl(imagePreview!);
    }
  }, [imagePreview]);
  
  const handleFileSelect = (file: File | null) => {
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Generate a URL for image preview
    } else {
      setImagePreview(null); // Clear preview if no file is selected
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen px-20 py-10 space-y-8">
      {currentUser ? (
        <div className="flex flex-col justify-start items-center space-y-4 p-10 w-svw min-h-screen">
          <img
              className="rounded-full"
              src={
                photoUrl
              }
              alt="Profile"
            />
            {edit && <UploadButton
                text="Upload Photo"
                color="bg-primary-orange"
                onFileSelect={handleFileSelect} // Pass file select handler to UploadButton
              />}
            <div className="flex flex-row space-x-8 px-24 w-full [&>div>h1]:text-black [&>div>h1]:font-bold [&>div>h1]:text-xl">
              <div className="flex flex-col p-0 space-y-2 justify-start w-full">
                <h1>First Name</h1>
                {!edit && <CustomTextBox type="text" text="First Name" value={firstName}/>}
                {edit && <CustomTextBox type="text" text="First Name" state={setFirstName}/>}
                <h1>Username</h1>
                {!edit && <CustomTextBox type="text" text="Username"value={username}/>}
                {edit && <CustomTextBox type="text" text="Username"state={setUsername}/>}
                <h1>E-Mail</h1>
                {!edit && <CustomTextBox type="text" text="example@exam.com" value={email}/>}
                {edit && <CustomTextBox type="text" text="example@exam.com" state={setEmail}/>}
              </div>

              <div className="flex flex-col p-0 space-y-2 justify-start w-full">
                <h1>Last Name</h1>
                {!edit && <CustomTextBox type="text" text="Last Name" value={lastName}/>}
                {edit && <CustomTextBox type="text" text="Last Name" state={setLastName}/>}
                <h1>Phone Number</h1>
                {!edit && <CustomTextBox type="text" text="08x-xxx-xxxx" value={phoneNumber}/>}
                {edit && <CustomTextBox type="text" text="08x-xxx-xxxx" state={setPhoneNumber}/>}
                <h1>Salary</h1>
                {!edit && <CustomTextBox type="text" text="9000" value={salary}/>}
                {edit && <CustomTextBox type="text" text="9000" state={setSalary}/>}
              </div>
            </div>
            {success && <h1 className="text-green-600 font-bold text-3xl">Update Success!</h1>}
            {edit && <CustomButton text="Save" destination="" disabled={!isFormValid} color="bg-primary-orange" click={()=>{setFetching(true)}}/>}
            {!edit && <CustomButton text="Edit" destination="" color="bg-primary-orange" click={()=>{setEdit(true); setSuccess(false);}}/>}
        </div>
      ) : (
        <Link className="text-black font-bold text-5xl hover:text-gray-600 active:scale-95" to="/signin">Please sign in</Link>
      )}
    </div>
  );
}