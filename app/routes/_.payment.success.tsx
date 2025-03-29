import { Link } from "@remix-run/react";
import { SquareArrowOutUpRightIcon } from "lucide-react";

export default function PaymentSuccess() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold text-black">Payment Successful</h1>
            <p className="text-lg text-gray-700">Thank you for your payment! Your transaction has been completed.</p>
            <p className="text-lg text-gray-700">Have a good day!</p>
            <Link to="/history">
                <button className=" flex bg-blue-500 text-white px-4 py-2 rounded-md">
                    <SquareArrowOutUpRightIcon width={20} height={20} />
                    Go to history
                </button>
            </Link>
        </div>
    );
};
