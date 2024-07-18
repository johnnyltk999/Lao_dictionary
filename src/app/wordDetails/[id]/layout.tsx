"use client";

import { Inter, Noto_Sans_Lao } from "next/font/google";
import "../../globals.css";
import NavBar from "@/app/components/navbar";
import LeftNav from "@/app/components/left-nav";
import RightNav from "@/app/components/right-nav";
import Footter from "@/app/components/footter";
import { IoIosArrowBack, IoIosHome } from "react-icons/io";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Toggle from "@/app/ui/toggle";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar></NavBar>
        <div className="relative flex items-center justify-center py-2 h-15">
          <div className="relative w-6/12">
            <a href="/">
              <IoIosArrowBack className=" text-2xl absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </a>

            <input
              className="w-full pl-10 px-4 py-2 h-15 rounded-lg border bg-primaryAccent focus:border-primaryBg focus:outline-none"
              type="search"
              placeholder="ຫນ້າຫລັກ"
              disabled
            />
          </div>
        </div>
        <div>
          {/* <div className="relative items-center justify-center py-2 h-15 bg-white block w-15">
          {/* <a href="/" className="flex items-center justify-center h-full">
            <IoIosHome className="text-4xl text-white bg-primaryBg rounded-sm hover:bg-primaryBg/80 cursor-pointer" />
          </a> */}
        </div>
        {/* <div className="relative flex items-center justify-center  py-3">
          <a href="/" className="flex items-center justify-center h-full">
            <IoIosHome className="text-4xl text-white bg-primaryBg rounded-sm hover:bg-primaryBg/80 cursor-pointer" />
          </a>
        </div> */}

        <hr className="border border-primaryAccent" />
        {/* sm:display */}
        <div className="md:hidden flex flex-col items-center">
          <div className="flex justify-center space-x-5">
            <Toggle />
            <LeftNav />
            <RightNav />
          </div>
          <div className="">{children}</div>
        </div>

        {/* lg:display */}
        <div className="hidden md:block">
          <div className=" flex justify-between py-1 px-4 ">
            <div className="">
              <LeftNav />
            </div>

            {children}

            <div className="">
              <RightNav />
            </div>
          </div>
        </div>

        {/* <div className=" flex justify-between py-1 px-4 ">
          <div>
            <LeftNav></LeftNav>
          </div>
          {children}

          <div>
            <RightNav></RightNav>
          </div>
        </div> */}

        <Footter></Footter>
      </body>
    </html>
  );
}
