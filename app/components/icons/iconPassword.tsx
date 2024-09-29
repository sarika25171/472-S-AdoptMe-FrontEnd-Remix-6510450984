import props from "./icon_props"

export default function IconPassword({ colorCode, width, height }: props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`} aria-labelledby="title"
            aria-describedby="desc" role="img" xmlnsXlink="http://www.w3.org/1999/xlink">
            <title>Lock</title>
            <desc>A line styled icon from Orion Icon Library.</desc>
            <path data-name="layer2"
                d="M19 30V15A13 13 0 0 1 32 2a13 13 0 0 1 13 13v15" fill="none" stroke={colorCode??"#000000"}
                stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
            <path data-name="layer1" fill="none" stroke={colorCode??"#000000"} stroke-miterlimit="10"
                stroke-width="2" d="M32 41v10" stroke-linejoin="round" stroke-linecap="round"></path>
            <rect data-name="layer1" x="10" y="30" 
            width={width} 
            height={height}
            rx="6"
                ry="6" fill="none" stroke={colorCode??"#000000"} stroke-miterlimit="10" stroke-width="2"
                stroke-linejoin="round" stroke-linecap="round"></rect>
        </svg>
    );
}