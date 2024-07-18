"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Logo from "../../../public/logo.png";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const pathname = usePathname();

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <>
      <div className="mx-auto bg-primaryBg p-2">
        <div className="px-10 flex justify-between items-center text-white">
          <div>
            <a href="/">
              <Image src={Logo} alt="Logo" width={100} height={100}></Image>
            </a>
          </div>
          <div className="">
            <ul className="hidden md:flex space-x-4">
              <li
                className={`hover:text-gray-500 duration-300 ${
                  pathname === "/" ? "text-gray-500 font-bold" : ""
                }`}
              >
                <Link href="/">ຫນ້າຫລັກ</Link>
              </li>
              <li
                className={`hover:text-gray-500 duration-300 ${
                  pathname === "/more" ? "text-gray-500 font-bold" : ""
                }`}
              >
                <Link href="/more">ຄວາມຮູ້ເພີ່ມເຕີມ</Link>
              </li>
              <li
                className={`hover:text-gray-500 duration-300 ${
                  pathname === "/reference-infomation"
                    ? "text-gray-500 font-bold"
                    : ""
                }`}
              >
                <Link href="/reference-infomation">ຂໍ້ມູນອ້າງອີງ</Link>
              </li>
              <li
                className={`hover:text-gray-500 duration-300 ${
                  pathname === "/about" ? "text-gray-500 font-bold" : ""
                }`}
              >
                <Link href="/about">ກ່ຽວກັບ</Link>
              </li>
            </ul>
          </div>

          <div onClick={handleNav} className="block md:hidden">
            {nav ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </div>
        </div>

        {/*mobile menu */}
        {nav && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={handleNav}
          ></div>
        )}

        <ul
          className={
            nav
              ? "fixed left-0 top-0 w-[65%] h-full border-r border-r-gray-900 bg-[#ffff] ease-in-out duration-500 z-50"
              : "fixed top-0 w-[65%] h-full border-r border-r-gray-900 bg-[#ffff] ease-in-out duration-500 left-[-100%] z-50"
          }
        >
          <h1 className="w-full text-xl font-bold text-primaryBg m-4">
            ຄຳລາວລາວ
          </h1>
          <li
            className={`p-4 border-b border-gray-600 ${
              pathname === "/" ? "text-gray-500 font-bold" : ""
            }`}
          >
            <Link href="/">ຫນ້າຫລັກ</Link>
          </li>
          <li
            className={`p-4 border-b border-gray-600 ${
              pathname === "/more" ? "text-gray-500 font-bold" : ""
            }`}
          >
            <Link href="/more">ຄວາມຮູ້ເພີ່ມເຕີມ</Link>
          </li>
          <li
            className={`p-4 border-b border-gray-600 ${
              pathname === "/reference-infomation"
                ? "text-gray-500 font-bold"
                : ""
            }`}
          >
            <Link href="/reference-infomation">ຂໍ້ມູນອ້າງອີງ</Link>
          </li>
          <li
            className={`p-4 border-b border-gray-600 ${
              pathname === "/about" ? "text-gray-500 font-bold" : ""
            }`}
          >
            <Link href="/about">ກ່ຽວກັບ</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
