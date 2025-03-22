import { LoaderFunctionArgs } from "@remix-run/node";

interface Props {
    id : number;
}

export async function loader({ params }: LoaderFunctionArgs) {
    
}

export default function ProductCard({ id }: Props) {
    return (
        <div>
            <div className="flex flex-col items-center justify-center rounded-3xl bg-white shadow-md">
                <img src="" alt="" />
            </div>
        </div>
    )
}   