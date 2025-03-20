import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useLoaderData, useFetcher, Link } from "@remix-run/react";
import { useState, useEffect } from "react";
import { ImageAPI, UserAPI } from "~/server/repository";
import UploadButton from "~/components/upload_button";

const Photo = process.env.PHOTO!

const [image, setImage] = useState<File | null>(null); // New state for image file

export async function action({ request }: ActionFunctionArgs) {
  const { currentUserId } = useLoaderData<typeof loader>();
  const formData = await request.formData();
  const action = formData.get("_action");
  if (action === "update") {
    const firstName = formData.get("first_name") as string;
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const lastName = formData.get("last_name") as string;
    const phoneNo = formData.get("phone_number") as string;
    const salary = Number(formData.get("salary") as string);

    // Creating an object with updated data
    const updatedUser = {
        firstName,
        username,
        email,
        lastName,
        phoneNo,
        salary
    };

    UserAPI.updateUser(currentUserId, updatedUser);

    if(image !== null)
      ImageAPI.uploadImage(image, username.trim().replace(" ", "") + "-photo.jpg");

    // return redirect("/profile"); // Redirect after successful update
  }

}

export async function loader({ request }: LoaderFunctionArgs) {
  const username = sessionStorage.getItem("username");
  if (!username) return redirect("/signin");

  const currentUser = UserAPI.getUserByUsername(username);

  if (!currentUser) return redirect("/signin");

  const currentUserId: string = (await currentUser).user_id;
  const userInfo = {
    username : (await currentUser).username,
    email : (await currentUser).email,
    photo : (await currentUser).photo_url,
    phoneNo : (await currentUser).phone_number,
    firstName : (await currentUser).first_name,
    lastName : (await currentUser).last_name,
    salary : (await currentUser).salary
  }

  return { currentUser , userInfo, currentUserId, username };
}

export default function ProfilePage() {
  const { currentUser } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen px-20 py-10 space-y-8">
      {currentUser && 
        (
          <>
          {Body()}
          </>
        )
      }
      
    </div>
  );
}

function Body() {
  const {  userInfo } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const isUpdating = fetcher.state !== "idle";
  const [edit, setEdit] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>(Photo + userInfo.photo); // State for image preview

  const handleFileSelect = (file: File | null) => {
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Generate a URL for image preview
      setImage(file);
    } else {
      setImagePreview(Photo + userInfo.photo); // Clear preview if no file is selected
    }
  };
  <div className="flex flex-col justify-start items-center space-y-4 p-10 w-full min-h-screen">
        <img
          className="rounded-full"
          src={imagePreview}
          alt="Profile"
        />
        {edit && (
          <UploadButton
            text="Upload Photo"
            color="bg-primary-orange"
            onFileSelect={handleFileSelect}
            />
        )}

        {FormPart()}

        {edit ? (
          <></>
        ) : (
          <></>
        )}
      </div>
}

function FormPart() {
  const { userInfo } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  return (
    <fetcher.Form 
      method="patch"
      className="flex flex-row space-x-8 px-24 w-full"
    >
      <div className="flex flex-col space-y-2 w-full">
        <label>
          First Name
          <input type="text" name="first_name" placeholder="First Name" value={userInfo.firstName}/>
        </label>
        <label>Username
        <input type="text" name="username" placeholder="Username" value={userInfo.username}/>
        </label>
        <label>Email
        <input type="text" name="email" placeholder="E-mail" value={userInfo.email}/>
        </label>
      </div>
      <div className="flex flex-col space-y-2 w-full">
        <label>Last Name
        <input type="text" name="last_name" placeholder="Last Name" value={userInfo.lastName}/>
        </label>
        <label>Phone Number
        <input type="text" name="phone_number" placeholder="08xxxxxxxx" value={userInfo.phoneNo}/>
        </label>
        <label>Salary
        <input type="text" name="salary" placeholder="12000" value={userInfo.salary} />
        </label>
      </div>
      <button type="submit" name="_action" value="update">
        Update
      </button>
    </fetcher.Form>
  );
}
