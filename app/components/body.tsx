export default function Body({...props}) {
    return(
        <div className="bg-white w-auto h-auto justify-center items-center overflow-hidden">
            {props.children}
        </div>
    );
}