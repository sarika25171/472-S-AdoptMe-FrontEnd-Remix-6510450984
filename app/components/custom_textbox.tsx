// import { ReactNode } from "react";

// interface props {
//     placeholder: string;
//     children: ReactNode;   
// }

// export default function CustomTextbox({placeholder, children} : props) {
//     return(
//         <div className="flex flex-row rounded-xl bg-primary-cream drop-shadow-lg text-black/80 items-center pl-4">
//             {/* Icon */}
//             {children}
            
//             {/* Text */}
//             <input 
//                 type="text" 
//                 placeholder={placeholder}
//                 className="w-full border-none bg-transparent px-4 py-2 text-black/80 focus:rounded-xl" 
//             />
//         </div>
        
//     );
// }

import { ChangeEventHandler, Dispatch, LegacyRef, SetStateAction, useEffect, useRef, useState} from "react";

interface props {
    type : string,
    text : string,
    value? : string;
    state? : Dispatch<SetStateAction<string>>;
    onChange? : ChangeEventHandler<HTMLInputElement>;
    height? : number;
}

export default function CustomTextBox({type, text, value, state, onChange, height} : props) {
    const [color, setColor] = useState<string>("");
    const inputRef = useRef<LegacyRef<HTMLInputElement> | undefined>();

    function onBlur(e:React.FocusEvent<HTMLInputElement, Element>) {
        if(e.target.value === "") {
            setColor("border-red-600");
        } else {
            setColor("border-green-600");
        }
        if(state) {
            state(e.target.value);
        }
    }

    return(
        <input
            id="input"
            onBlur={(e)=>{onBlur(e)}}
            onChange={onChange}
            type={type}
            placeholder={text}
            className={`w-full bg-white border-4 ${color} h-[${height || 12}px] rounded-xl px-4 py-2 text-black/80 focus:outline-none focus:border-blue-600`}
            value={value}
        />
    );
}