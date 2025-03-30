import { Link } from "@remix-run/react";
import { SquareArrowOutUpRightIcon } from "lucide-react";

export default function PaymentSuccess() {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen space-y-12 bg-white">
            <h1 className="text-6xl font-bold text-blue-500">Payment Successful</h1>
            <p className="text-4xl text-gray-700">Thank you for your payment! Your transaction has been completed.</p>
            <p className="text-4xl text-gray-700">Have a good day!</p>
            
            <Link to="/history/list" className="inline-flex items-center bg-blue-500 text-white px-6 py-3 rounded-md text-xl shadow-lg hover:bg-blue-600 transition">
                <SquareArrowOutUpRightIcon className="mr-2" width={24} height={24} />
                Go to History
            </Link>
        </div>
    );
}
