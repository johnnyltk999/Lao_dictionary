"use client";

import NavBar from "../../components/navbar";
import LeftNav from "../../components/left-nav";
import RightNav from "../../components/right-nav";

import Footter from "../../components/footter";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />

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

        <hr className="border border-primaryAccent" />

        {/* sm:display */}
        <div className="md:hidden flex flex-col items-center">
          <div className="flex justify-center space-x-5">
            {/* <Toggle /> */}
            <LeftNav />
            <RightNav />
          </div>
          <div>{children}</div>
        </div>

        {/* lg:display */}
        <div className="hidden md:block">
          <div className=" flex justify-between py-1 px-4 ">
            <div>
              <LeftNav />
            </div>

            {children}

            <div>
              <RightNav />
            </div>
          </div>
        </div>

        <Footter />
      </body>
    </html>
  );
}
