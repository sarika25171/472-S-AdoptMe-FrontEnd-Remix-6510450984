import { Link, useNavigate } from "@remix-run/react";
import axios from "axios";
import { useEffect, useState } from "react";
import BehaviorAnimal from "~/components/behaviorAnimal";
import BehaviorCard from "~/components/longCard";
import User from "~/models/user";
import { DOMAIN } from "~/server/domain";

export default function ProfilePage() {
  const [user, setUser] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const navigate = useNavigate();
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
      } catch (error) {
        console.error(error);
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen px-20 py-10 space-y-8">
      {currentUser ? (
        <ul className="[&>li>h1]:text-black [&>li>h1]:font-bold [&>li>h1]:text-5xl flex flex-col gap-2 justify-center items-center">
          <li>
            <img
              className="rounded-full"
              src={
                "https://cdn.prakasitj.com/proxy/get/" + currentUser.photo_url
              }
              alt="Profile"
            />
          </li>
          <li>
            <h1>User ID: {currentUser.user_id}</h1>
          </li>
          <li>
            <h1>Username: {currentUser.username}</h1>
          </li>
          <li>
            <h1>Email: {currentUser.email}</h1>
          </li>
          <li>
            <h1>First Name: {currentUser.first_name}</h1>
          </li>
          <li>
            <h1>Last Name: {currentUser.last_name}</h1>
          </li>
          <li>
            <h1>Phone Number: {currentUser.phone_number}</h1>
          </li>
          <li>
            <h1>Salary: {currentUser.salary}</h1>
          </li>
          <li>
            <h1>Priority: {currentUser.priority}</h1>
          </li>
        </ul>
      ) : (
        <Link className="text-black font-bold text-5xl hover:text-gray-600 active:scale-95" to="/signin">Please sign in</Link>
      )}
    </div>
  );
}
