import { ModeToggle } from "./modetoggle";

export default function NavBar () {
    return (
        <div className="flex justify-center sm:justify-between items-center md:justify-between h-[77px] gap-4 w-screen pl-4 py-3 bg-transparent fixed top-0 backdrop-blur-3xl z-20">
            <div className="">
                <h1 className="text-2xl sm:xl font-bold">Insync</h1>
            </div>
            <ModeToggle/>
        </div>
    )
}