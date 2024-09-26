export default function Body({...props}) {
    return(
        <div className="bg-white h-svh justify-center items-center">
            {props.children}
        </div>
    );
}