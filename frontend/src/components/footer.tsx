import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Facebook, Github, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer () {
    return (
        <div className="mt-5 py-10 px-5 sm:px-3">
            <div className="flex justify-center my-10">
                <div>
                    <h1 className=" text-2xl font-bold text-center mb-5">
                        Signup for our Newsletter
                    </h1>
                    <div className="sm:w-[300px] lg:w-[600px] flex sm:flex-col gap-3">
                        <Input className="max-w-[300px]"/>
                        <Button className="w-full">
                            Signup it’s free
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex sm:flex-col md:flex-col justify-start sm:gap-5 md:gap-5 mt-10 items-center sm:items-start">
                <div className="lg:w-[25%] w-full flex justify-between gap-10 items-center lg:flex-col lg:gap-3 p-5">
                    <h1 className="text-4xl sm:xl font-bold">Insync</h1>
                    <Link to='/login'>Log In</Link>
                </div>
                <div className="lg:w-[25%] w-full flex flex-col items-start justify-start px-5">
                    <hr className="w-full border-[1.5px] lg:hidden my-5"/>
                    <h1 className="text-lg font-semibold">About Us</h1>
                    <Link to='#' className="text-[12px]">What’s behind the boards</Link>
                </div>
                <div className="lg:w-[25%] w-full flex flex-col items-start justify-start px-5">
                    <hr className="w-full border-[1.5px] lg:hidden my-5"/>
                    <h1 className="text-lg font-semibold">Jobs</h1>
                    <Link to='#' className="text-[12px]">Learn about open roles on the Insync team</Link>
                </div>
                <div className="lg:w-[25%] w-full flex flex-col items-start justify-start px-5">
                    <hr className="w-full border-[1.5px] lg:hidden my-5"/>
                    <h1 className="text-lg font-semibold">App</h1>
                    <Link to='#' className="text-[12px]">Download the Insync app for desktop and mobile</Link>
                </div>
                <div className="lg:w-[25%] w-full flex flex-col items-start justify-start px-5">
                    <hr className="w-full border-[1.5px] lg:hidden my-5"/>
                    <h1 className="text-lg font-semibold">Contact Us</h1>
                    <Link to='#' className="text-[12px]">Need anything? Get in touch and we can help you</Link>
                </div>
            </div>
            <hr className="border w-full bg-black"/>
            <div className="flex justify-center items-center sm:flex-col md:flex-col my-5">
                <div className="flex sm:flex-col md:flex-col lg:w-50% w-full justify-start items-start gap-3 mt-5">
                    <Link to='#' className="text-[12px] font-[400]">Privacy</Link>
                    <Link to='#' className="text-[12px] font-[400]">Terms</Link>
                    <p className="text-[12px] font-[400]">Copyright © 2024 Boscomunich</p>
                </div>
                <div className="lg:w-[50%] w-full flex gap-10 justify-start mt-5">
                    <Facebook />
                    <Instagram />
                    <Linkedin />
                    <Youtube />
                    <Github  />
                </div>
            </div>
        </div>
    )
}