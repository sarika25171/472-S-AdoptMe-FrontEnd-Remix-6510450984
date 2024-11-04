import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";

interface props {
  colorCode?: string;
  width: string;
  height: string;
  OnClick?: () => void;
}
export default function IconSearch({ colorCode, width, height, OnClick}: props) {
  const [clear, setClear] = useState(false);

  useEffect(() => {
    if (clear) {
      sessionStorage.clear();
    }
  }, [clear]);

  return (
    <Link
      to="/"
      onClick={() => {
        setClear(true);
        if(OnClick) OnClick();
      }}
      prefetch="intent"
    >
      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`} fill={colorCode??"#000000"} style={{width:width, height:height}}>
            <path fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd" />
        </svg> */}
      <svg
        style={{ width: width, height: height }}
        fill={colorCode ?? "#000000"}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M4,12a1,1,0,0,0,1,1h7.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4a1,1,0,1,0-1.42,1.42L12.59,11H5A1,1,0,0,0,4,12ZM17,2H7A3,3,0,0,0,4,5V8A1,1,0,0,0,6,8V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v3a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V5A3,3,0,0,0,17,2Z"></path>
        </g>
      </svg>
    </Link>
  );
}
