"use client";
import React, { useRef } from "react";
import { signIn } from "next-auth/react";

const Page: React.FC = () => {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const handleLogin = () => {
    signIn("credentials", {
      username: username.current?.value,
      password: password.current?.value,
      redirect: true,
      callbackUrl: "/admin",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primaryBg">
      <h1 className="text-white text-5xl font-semibold mb-6 text-center">
        ວັດຈະນານຸກົມພາສາລາວ
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          ເຂົ້າສູ່ລະບົບ
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ຊື່ຜູ້ໃຊ້
          </label>
          <input
            type="text"
            name="username"
            ref={username}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primaryBg"
            placeholder="ປ້ອນຊື່ຜູ້ໃຊ້"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ລະຫັດຜ່ານ
          </label>
          <input
            type="password"
            name="password"
            ref={password}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primaryBg"
            placeholder="ປ້ອນລະຫັດຜ່ານ"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleLogin}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            ລັອກອິນ
          </button>
          <a href="/">
            <button
              type="button"
              className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              ຫນ້າຫຼັກ
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
