import { Outlet } from "@remix-run/react";

export default function History() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-24">
      <Outlet />
    </div>
  );
}
