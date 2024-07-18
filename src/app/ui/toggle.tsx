import React, { useState } from "react";
import Link from "next/link";
import { IoIosClose } from "react-icons/io";

const words = [
  { id: 1, name: "ກ.", description: "ກິລິຍາ = ຄຳກຳມະ" },
  { id: 2, name: "ສ.", description: "ສັບພະນາມ = ຄຳແທນນາມ, ຄຳແທນຊື່" },
  { id: 3, name: "ສັນ.", description: "ຄຳຕໍ່, ຄຳເຊື່ອມຄຳ" },
  { id: 4, name: "ນ.", description: "ນາມ = ບອກຊື່, ຄຳນາມ" },
  { id: 5, name: "ບ.", description: "ບຸບພະບົດ = ຄຳນຳໜ້ານາມ" },
  {
    id: 6,
    name: "ວ.",
    description: "ວິເສດ = ຄຳຄຸນນາມ, ຄຳຂະຫຍາຍຄຳກຳມະ ຫຼື ຄຳກິລິຍາ",
  },
  { id: 7, name: "ອຸ.", description: " ອຸທານ = ຄຳອຸທານ" },
  { id: 8, name: "ປ.ສ", description: "ປາລີ ແລະ ສັນສະກິດ" },
  { id: 9, name: "(ຂ.)", description: "ຂະເໝນ" },
  { id: 10, name: "(ຈ.)", description: "ຈີນ" },
  { id: 11, name: "(ສ.)", description: "ສັນສະກິດ" },
  { id: 12, name: "(ທ.)", description: "ໄທ" },
  { id: 13, name: "(ປ.)", description: "ປາລີ" },
  { id: 14, name: "(ຝ.)", description: "ຝຣັ່ງ" },
  { id: 15, name: "(ຫວ.)", description: "ຫວຽດນາມ" },
  { id: 16, name: "(ອ.)", description: "ອັງກິດ" },
  { id: 17, name: "(ຮ.)", description: "ຮິນດູ" },
];

function Toggle() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative ">
      {/* Button for mobile view */}
      <div className="lg:hidden flex justify-center my-2 z-50">
        <button
          onClick={togglePopup}
          className="btn p-2 bg-primaryBg text-white text-lg rounded-sm hover:bg-primaryBg/80"
        >
          ກ ?
        </button>
      </div>

      {/* Popup for mobile view */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-40 p-2 lg:hidden">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={togglePopup}
          ></div>
          <div className="relative bg-white p-4 rounded-sm shadow-lg w-full max-w-sm sm:max-w-md">
            <button
              onClick={togglePopup}
              className="absolute top-2 right-2 text-black hover:text-gray-600"
            >
              <IoIosClose className="text-4xl text-red-500" />
            </button>
            <p className="text-center">ຕົວອັກສອນຫຍໍ້</p>
            <div className="grid grid-cols-2 gap-2 bg-primaryAccent p-2 rounded-sm">
              {words.map((word) => (
                <ul
                  key={word.id}
                  className="p-2 bg-primaryBg text-xs text-white rounded-sm block  hover:bg-primaryBg/80"
                  onClick={togglePopup}
                >
                  <li>
                    <h1 className="text-center text-sm">{word.name}</h1>
                    <p>{word.description}</p>
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Grid view for desktop */}
      {/* <div className="hidden">
        <p className="text-center">ຕົວອັກສອນທັງຫມົດ</p>
        <div className="grid grid-cols-6 gap-2 lg:grid-cols-3 bg-primaryAccent p-2 rounded-sm">
          {words.map((word) => (
            <button
              key={word.id}
              className="px-3.5 py-2 bg-primaryBg text-white rounded-sm block text-center hover:bg-primaryBg/80"
            >
              {word.name}
            </button>
          ))}
        </div>
      </div> */}
    </div>
  );
}

export default Toggle;
