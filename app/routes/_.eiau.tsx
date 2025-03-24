import { Link } from "@remix-run/react";

export default function EIAU() {
    return (
        <div>
            {/* <button onClick={() => {alert("EI AU")}}>Click me</button> */}
            <Link to="/pets">
                GO TO PETS
            </Link>
        </div>
    );
}
