"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "../../../../public/logo.png";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="mx-auto bg-primaryBg p-2">
        <div className="px-10 flex justify-between items-center text-white">
          <div className="flex justify-between items-center space-x-4">
            <a href="/admin">
              <h1 className="text-3xl">ຜູ້ດູແລ</h1>
            </a>

            <a href="/admin">
              <Image src={Logo} alt="Logo" width={100} height={100}></Image>
            </a>
          </div>
          <div className="">
            <ul className="hidden md:flex space-x-4">
              <li
                className={`hover:text-gray-500 duration-300 ${
                  pathname === "/admin" ? "text-gray-500 font-bold" : ""
                }`}
              >
                <Link href="/admin">ຫນ້າຫລັກ</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
