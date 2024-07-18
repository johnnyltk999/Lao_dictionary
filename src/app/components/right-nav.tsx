"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IoIosClose } from "react-icons/io";

const Links = [
  { name: "ກ", href: "/words/ກ" },
  { name: "ຂ", href: "/words/ຂ" },
  { name: "ຄ", href: "/words/ຄ" },
  { name: "ງ", href: "/words/ງ" },
  { name: "ຈ", href: "/words/ຈ" },
  { name: "ສ", href: "/words/ສ" },
  { name: "ຊ", href: "/words/ຊ" },
  { name: "ຍ", href: "/words/ຍ" },
  { name: "ດ", href: "/words/ດ" },
  { name: "ຕ", href: "/words/ຕ" },
  { name: "ຖ", href: "/words/ຖ" },
  { name: "ທ", href: "/words/ທ" },
  { name: "ນ", href: "/words/ນ" },
  { name: "ບ", href: "/words/ບ" },
  { name: "ປ", href: "/words/ປ" },
  { name: "ຜ", href: "/words/ຜ" },
  { name: "ຝ", href: "/words/ຝ" },
  { name: "ພ", href: "/words/ພ" },
  { name: "ຟ", href: "/words/ຟ" },
  { name: "ມ", href: "/words/ມ" },
  { name: "ຢ", href: "/words/ຢ" },
  { name: "ຣ", href: "/words/ຣ" },
  { name: "ລ", href: "/words/ລ" },
  { name: "ວ", href: "/words/ວ" },
  { name: "ຫ", href: "/words/ຫ" },
  { name: "ຫງ", href: "/words/ຫງ" },
  { name: "ໜ", href: "/words/ໜ" },
  { name: "ໝ", href: "/words/ໝ" },
  { name: "ຫຼ", href: "/words/ຫຼ" },
  { name: "ຫວ", href: "/words/ຫວ" },
  { name: "ອ", href: "/words/ອ" },
  { name: "ຮ", href: "/words/ຮ" },
];

function RightNav() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Button for mobile view */}
      <div className="lg:hidden flex justify-center my-2">
        <button
          onClick={togglePopup}
          className="btn p-2 bg-primaryBg text-white text-lg rounded-lg hover:bg-primaryBg/80 "
        >
          ກ-ຮ
        </button>
      </div>

      {/* Popup for mobile view */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-0 p-4 lg:hidden ">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={togglePopup}
          ></div>
          <div className="relative bg-white p-4 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md">
            <button
              onClick={togglePopup}
              className="absolute top-2 right-2 text-black hover:text-gray-600"
            >
              <IoIosClose className="text-4xl text-red-500" />
            </button>
            <p className="text-center mb-4">ຕົວອັກສອນທັງຫມົດ</p>
            <div className="grid grid-cols-6 sm:grid-cols-3 gap-2 bg-primaryAccent p-2 rounded-lg">
              {Links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="px-3.5 py-2 bg-primaryBg text-white rounded-lg block text-center hover:bg-primaryBg/80 "
                  onClick={togglePopup}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Grid view for desktop */}
      <div className="hidden lg:block">
        <p className="text-center">ຕົວອັກສອນທັງຫມົດ</p>
        <div className="grid grid-cols-6 gap-2 lg:grid-cols-3 bg-primaryAccent p-2 rounded-lg">
          {Links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="px-3.5 py-2 bg-primaryBg text-white rounded-lg block text-center hover:bg-primaryBg/70 duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RightNav;
