import { ReactNode } from "react";

interface props {
    placeholder: string;
    children: ReactNode;   
}

export default function CustomTextbox({placeholder, children} : props) {
    return(
        <div className="flex flex-row rounded-xl bg-primary-cream drop-shadow-lg text-black/80">
            {/* Icon */}
            {children}
            
            {/* Text */}
            <input 
                type="text" 
                placeholder={placeholder}
                className="w-full border-none bg-transparent px-4 py-2 text-black/80 focus:rounded-xl" 
            />
        </div>
        
    );
}