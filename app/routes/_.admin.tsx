import { Outlet } from "@remix-run/react";
import { useState } from "react";
import AdminLink from "~/components/admin_link";

export default function AdminPage() {
  const [select, setSelect] = useState("Dashboard");

  return (
    <div className="flex flex-col justify-start items-center w-svw min-h-screen space-y-4 px-10 py-10" style={{transitionDuration:"1s"}}>
      <div className="flex space-x-4">
        <AdminLink
          text="Dashboard"
          value="Dashboard"
          select={select}
          setSelect={setSelect}
        >
        </AdminLink>
        <AdminLink
          text="Pet Management"
          value="Pet Management"
          select={select}
          setSelect={setSelect}
        >
        </AdminLink>
      </div>
      <Outlet />
    </div>
  );
}
