import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CustomButton from "~/components/custom_button";
import { photoPath } from "~/server/config.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const Photo = photoPath();
  console.log("pathLoaderBase : ", Photo);
  return { Photo };
}

export const meta: MetaFunction = () => {
  return [
    { title: "AdoptMe!" },
    { name: "description", content: "Welcome to AdoptMe!!" },
  ];
};

export default function Index() {
  const { Photo } = useLoaderData<typeof loader>();
  return (
      <div className="grid [&>img]:col-start-1 [&>img]:row-start-1 [&>div]:col-start-1 [&>div]:row-start-1">
        <img
          src={Photo+"blue-adopt.png"}
          className="w-svw object-cover object-center"
        />
        <div className="flex flex-col space-y-2 justify-center items-start px-20">
          <h1 className="text-[64px] text-black">Pet Adoption</h1>
          <h3 className="text-  [32px] text-gray-500">
            Find your new best friend and give a pet a loving home.
          </h3>
          <CustomButton
            destination="/pets"
            text="Find a pet"
            color="bg-primary-orange"
          />

          <div className="grid [&>div]:col-start-1 [&>div]:row-start-1 [&>div]:z-10 [&>div>div>div>div>div>a>button>h1:active]:active:text-blue-400 [&>div>div>div>div>div>a>button:hover]:hover:scale-110 [&>div>div>div>div>div>a>button:hover]:transition-all">
          </div>

        </div>
      </div>
  );
}
