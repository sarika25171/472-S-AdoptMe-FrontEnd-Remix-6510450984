import LongCardCol from "~/components/longCardCol";

export default function PetHelpPage() {
    return(
        <div className="flex flex-col justify-start items-center w-full min-h-screen p-10 space-y-8">
            <h1 className="font-bold text-black text-[64px]">General Pet Care</h1>
            <h1 className="text-black text-2xl">Are you a new pet parent, or looking for answers to a pet care-related question? Our Pet Care section provides a wealth of health and behavior information to help pet parents provide the best possible care for their furry friends.</h1>
            <LongCardCol type="PetHelp"/>
        </div>
    );
}
