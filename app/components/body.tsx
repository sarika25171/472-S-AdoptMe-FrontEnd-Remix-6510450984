export default function Body({...props}) {
    return(
        // <div className="bg-white w-svw h-svh justify-center items-center overflow-auto">
        <div className="bg-[url('https://cdn.prakasitj.com/proxy/get/bg-adoptme.png')] w-svw h-svh justify-center items-center overflow-auto">
            {props.children}
        </div>
    );
}