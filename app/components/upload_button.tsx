// import { Link } from "@remix-run/react";
// import { Children, Dispatch, ReactNode, SetStateAction } from "react";

// interface props {
//     text: string;
//     color: string
// }

// export default function UploadButton({text, color} : props) {
//     return(
//         <button type="button" 
//         className={`flex flex-row hover:scale-110 duration-200 space-x-2 text-white font-bold shadow-lg 
//         ${color} rounded-3xl text-2xl justify-center items-center w-fit h-fit px-6 py-2`}>
//             <h1>{text}</h1>
//         </button>
//     );
// }

import { useRef } from "react";

interface Props {
  text: string;
  color: string;
  onFileSelect: (file: File | null) => void;
}

export default function UploadButton({ text, color, onFileSelect }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click(); // Trigger file input click
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    onFileSelect(file); // Pass the selected file to the parent component
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className={`flex flex-row hover:scale-110 duration-200 space-x-2 text-white font-bold shadow-lg ${color} rounded-3xl text-2xl justify-center items-center w-fit h-fit px-6 py-2`}
      >
        <h1>{text}</h1>
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }} // Hide the file input
      />
    </div>
  );
}
