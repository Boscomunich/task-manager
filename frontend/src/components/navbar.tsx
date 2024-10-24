import { ModeToggle } from "./modetoggle";
import { Button } from "./ui/button";
import { SquareMenu } from 'lucide-react';
import { Link } from "react-router-dom";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"


export default function NavBar () {
    return (
        <div className="flex justify-between items-center h-[77px] gap-4 w-screen pl-4 py-3 bg-transparent fixed top-0 backdrop-blur-3xl z-20">
            <div className="w-[50%] flex lg:justify-center item-center">
                <div>
                    <img src='/logo.png' className="h-20 w-20"/>
                </div>
                <h1 className="text-4xl sm:xl font-bold pt-4">
                    Insync
                </h1>
            </div>
            <div className="w-[50%] flex gap-2 justify-center md:hidden sm:hidden">
                <Link to='/login'>
                    <Button variant='outline'>
                        Signin
                    </Button>
                </Link>
                <Link to='/register'>
                    <Button variant='outline'>
                        Signup
                    </Button>
                </Link>
                <ModeToggle/>
            </div>
            <div className="lg:hidden px-3 mr-5">
                <Sheet>
                    <SheetTrigger>
                        <SquareMenu />
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                        <SheetTitle></SheetTitle>
                        <SheetDescription>
                            <div className="w-[50%] flex flex-col gap-2 items-center justify-center pt-5">
                                <Link to='/login' className="text-[16px] font-medium hover:text-blue-500">
                                    Signin
                                </Link>
                                <Link to='/register' className="text-[16px] font-medium hover:text-blue-500">
                                    Signup
                                </Link>
                                <ModeToggle/>
                            </div>
                        </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}