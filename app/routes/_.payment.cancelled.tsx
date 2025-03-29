import { Link } from "@remix-run/react";
import { SquareArrowOutUpRightIcon } from "lucide-react";

export default function PaymentCancelled() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-100 text-red-800 border border-red-300 rounded-lg p-8">
            <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
            <p className="text-lg">Your payment has been cancelled.</p>
            <Link to="/">
                <button className=" flex bg-blue-500 text-white px-4 py-2 rounded-md">
                    <SquareArrowOutUpRightIcon width={20} height={20} />
                    Go to home
                </button>
            </Link>
        </div>
    );
};
