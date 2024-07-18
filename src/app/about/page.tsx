/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Image from "next/image";
import React from "react";

// Image imports
import Logo from "../../../public/pankham_logo.png";
import Santisouk from "../../../public/santisouk.jpg";
import Bounpheang from "../../../public/bounphaeng.jpg";
import Xaysomebath from "../../../public/xaysomebath.jpg";
import Logo_lao from "../../../public/logo.png";
import Teacher from "../../../public/teacher.jpg";

export const metadata: Metadata = {
  title: "ລາວລາວ | ກ່ຽວກັບພວກເຮົາ",
  description: "ວັດຈະນານຸກົມມ, ພາສາລາວ, ຄຳສັບລາວ, ລາວ, ຄວາມຫມາຍພາສາລາວ",
};

const AboutPage: React.FC = () => {
  return (
    <main className="flex flex-col h-auto p-4 bg-white ">
      <div className="container max-w-4xl mx-auto flex-grow">
        <h1 className="text-3xl font-bold mb-6 text-center text-primaryBg">
          ກ່ຽວກັບພວກເຮົາ
        </h1>
        <hr className="border border-primaryAccent mb-4" />
        <section className="mb-8 text-center">
          <div className="my-8">
            <Image
              className="mx-auto "
              src={Logo_lao}
              alt="Logo_lao"
              width={250}
              height={250}
            ></Image>
          </div>

          <h2 className="text-xl font-bold mb-2">ປະຫວັດຄວາມເປັນມາ</h2>
          <p className="text-justify">
            ໂຄງການນີ້ຖືກພັດທະນາຂຶ້ນມາເພື່ອເປັນບົດວິທະຍານິພົນເພື່ອຈົບການສຶກສາຢູ່
            ມະຫາວິທະຍາໄລແຫ່ງຊາດ ຄະນະວິສະວະກຳສາດ ພາກວິຊາ ວິສະວະກຳຄອມພິວເຕີ ແລະ
            ເຕັກໂນໂລຊີຂໍ້ມູນຂ່າວສານ, ຈຸດປະສົງເພື່ອຊ່ວຍໃຫ້ຜູ້ທີ່ນຳໃຊ້ພາສາລາວ
            ສາມາດເຂົ້າເຖິງວັດຈະນານຸກົມພາສາລາວ ຜ່ານທາງເວັບໄຊ ສາມາດຄົ້ນຫາຄຳສັບ ແລະ
            ເບິ່ງລາຍລະອຽດຂອງຄຳສັບ ໄດ້ຢ່າງສະດວກ ພ້ອມທັງມີຮູບພາບປະກອບບາງຄຳສັບ
            ເພື່ອຊ່ວຍສ້າງຄວາມເຂົ້າໃຈໄດ້ດີຂຶ້ນ. ສະນັ້ນ, ພວກເຮົາຈຶ່ງຫວັງວ່າ
            ເວັບໄຊນີ້ ຈະເປັນປະໂຫຍດໃຫ້ແກ່ຜູ້ໃຊ້ທຸກທ່ານ ແລະ
            ຫວັງອີກວ່າຈະນຳໃຊ້ພາສາລາວ ໄດ້ຖືກຕ້ອງ ແລະ ເຂົ້າໃຈຫລາຍຍິ່ງຂຶ້ນ.
          </p>
        </section>

        <section className="text-center mb-8">
          <h2 className="text-xl font-bold mb-2">ວິໄສທັດ</h2>
          <p>
            "ເພື່ອສົ່ງເສີມການນຳໃຊ້ພາສາລາວຢ່າງຖືກຕ້ອງ ເສິມສ້າງຄວາມເຂົ້າໃຈ ແລະ
            ປົກປັກຮັກສາ ຄຳສັບພາສາລາວ."
          </p>
        </section>

        <section className="mb-8 text-center">
          <h2 className="text-xl font-semibold mb-4">ສະໜັບສະໜູນໂດຍ</h2>
          <a href="https://www.pankham.com/?lang=lo" target="_blank">
            <Image
              src={Logo}
              width={100}
              height={100}
              alt="logo"
              className="mx-auto mb-4"
            />
          </a>

          <ul className="list-none text-lg leading-relaxed">
            <a href="https://www.pankham.com/?lang=lo" target="_blank">
              <li className=" underline underline-offset-2 hover:text-blue-800 hover:underline">
                ປານຄຳ ຈຳປາ ຈຳກັດ
              </li>
            </a>

            <li>218 ຖະໜົນດົງປ່າລານ, ບ້ານ ດົງປ່າລານທົ່ງ</li>
            <li>ເມືອງ ສີສັດຕະນາກ, ນະຄອນຫລວງວຽງຈັນ</li>
            <li>ໂທ: +(856 21) 412 636 +(856 21) 452 924-6</li>
            <li>Email: pankham_jp@yahoo.com</li>
          </ul>
        </section>

        <section className="text-center">
          <h2 className="text-xl font-semibold mb-4">
            ພັດທະນາເວບແອັບພລິເຄຊັ່ນໂດຍ
          </h2>
          <p className="text-lg leading-relaxed mb-8">
            ນັກສຶກສາຈາກ ມະຫາວິທະຍາໄລແຫ່ງຊາດ, ຄະນະວິສະວະກຳສາດ, ພາກວິຊາ
            ວິສະວະກຳຄອມພິວເຕີ ແລະ ເຕັກໂນໂລຊີຂໍ້ມູນຂ່າວສານ
          </p>

          <div className=" justify-center">
            <div className="flex justify-center">
              <div className="max-w-xs bg-white shadow-lg rounded-sm m-10">
                <Image
                  src={Teacher}
                  alt="ທ້າວ ສັນຕິສຸກ ລາຕີກຸນ"
                  width={100}
                  height={100}
                  className="mx-auto mt-4 rounded-sm"
                />
                <div className="p-6">
                  <p className="text-center text-lg font-semibold">
                    ອຈ.ປທ. ແສງລັດສະໝີ ຈັນທະມີນາວົງ
                  </p>
                  <p className="text-center text-xs">ອາຈານທີ່ປຶກສາ</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-8 flex-wrap">
            <div className="max-w-xs bg-white shadow-lg rounded-sm overflow-hidden">
              <Image
                src={Santisouk}
                alt="ທ້າວ ສັນຕິສຸກ ລາຕີກຸນ"
                width={100}
                height={100}
                className="mx-auto mt-4 rounded-sm"
              />
              <div className="p-6">
                <p className="text-center text-lg font-semibold">
                  ທ້າວ ສັນຕິສຸກ ລາຕີກຸນ
                </p>
                <p className="text-center text-xs">
                  Email: johnnyltk999@gmail.com
                </p>
              </div>
            </div>
            <div className="max-w-xs bg-white shadow-lg rounded-sm overflow-hidden">
              <Image
                src={Bounpheang}
                alt="ທ້າວ ບຸນແພງ ຄຳວົງເພັດ"
                width={100}
                height={100}
                className="mx-auto mt-4 rounded-sm"
              />
              <div className="p-6">
                <p className="text-center text-lg font-semibold">
                  ທ້າວ ບຸນແພງ ຄຳວົງເພັດ
                </p>
                <p className="text-center text-xs">
                  Email: bboun1043@gmail.com
                </p>
              </div>
            </div>
            <div className="max-w-xs bg-white shadow-lg rounded-sm overflow-hidden">
              <Image
                src={Xaysomebath}
                alt="ທ້າວ ໄຊສົມບັດ ສີສຸພັນທະວົງ"
                width={100}
                height={100}
                className="mx-auto mt-4 rounded-sm"
              />
              <div className="p-6">
                <p className="text-center text-lg font-semibold">
                  ທ້າວ ໄຊສົມບັດ ສີສຸພັນທະວົງ
                </p>
                <p className="text-center text-xs">
                  Email: Hh75789ui@gmail.com
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="flex justify-center  m-5">
          <a
            href="/admin"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            target="_blank"
          >
            ເຂົ້າສູ່ລະບົບ
          </a>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
