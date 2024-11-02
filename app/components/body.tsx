export default function Body({...props}) {
    return(
        <div className="bg-white w-svw h-svh justify-center items-center overflow-auto">
            {props.children}
        </div>
    );
}