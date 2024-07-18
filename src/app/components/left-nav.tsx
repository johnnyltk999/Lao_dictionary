"use client";
import React from "react";
import { AnimatedTooltip } from "../ui/LeftNav-animated-tooltip";
import Toggle from "../ui/toggle";
import Image from "next/image";
import ChampaLogo from "../../../public/chapa_logo1.png";
import LaoPattern from "../../../public/lao_pattern1.png";

const words = [
  {
    id: 1,
    name: "ກ.",
    description: "ກິລິຍາ = ຄຳກຳມະ (ບອກການກະທຳ)",
  },
  {
    id: 2,
    name: "ສ.",
    description: "ສັບພະນາມ = ຄຳແທນນາມ, ຄຳແທນຊື່",
  },
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

export default function LeftNav() {
  return (
    <>
      {/* <div className="sm:block">
        <Toggle />
      </div> */}

      <div className="hidden lg:block">
        <p className="text-center">ອະທິບາຍອັກສອນຫຍໍ້</p>
        <AnimatedTooltip items={words} />
      </div>
      <div className="relative mt-3">
        <Image
          className="hidden lg:block -ml-4 -mb-4"
          src={LaoPattern}
          alt="Lao Pattern"
          width={200}
          height={200}
        ></Image>
      </div>
    </>
  );
}
