"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getData } from "./data";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface Word {
  id: number;
  Word_ID: number;
  Word_Name: string;
  Word_Group: string;
}

const Page: React.FC = () => {
  const params = useParams();
  // const id = params?.id;
  let id = params?.id;

  // Handle id if it's an array (which can happen with Next.js dynamic routes)
  if (Array.isArray(id)) {
    id = id[0];
  }

  id = decodeURIComponent(id || "");

  const [data, setData] = useState<Word[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 60; // Number of words to display per page
  const maxPageNumbersToShow = 5; // Max number of page numbers to show at a time

  useEffect(() => {
    if (!id) return; // Wait until the id is available
    const fetchData = async () => {
      try {
        const result = await getData(`${id}`);
        setData(result);
        console.log("ຂໍ້ມູນທີ່ໄດ້ຮັບ:", result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const indexOfLastWord = currentPage * itemsPerPage;
  const indexOfFirstWord = indexOfLastWord - itemsPerPage;
  const currentWords = data.slice(indexOfFirstWord, indexOfLastWord);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxPageNumbersToShow / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageClick(1)}
          className={`px-2 py-1 rounded ${
            currentPage === 1
              ? "bg-primaryBg text-white"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <span key="start-ellipsis" className="px-2">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-2 py-1 rounded ${
            currentPage === i
              ? "bg-primaryBg text-white"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span key="end-ellipsis" className="px-2">
            ...
          </span>
        );
      }
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
          className={`px-2 py-1 rounded ${
            currentPage === totalPages
              ? "bg-primaryBg text-white"
              : "bg-gray-300 hover:bg-gray-400 duration-300"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  // if (loading) {
  //   return <p>ກຳລັງໂຫລດຂໍ້ມູນ...</p>;
  // }

  return (
    <>
      {/* ຫນ້າຈໍໂທລະສັບ */}
      <div className=" container flex-col mx-3 md:hidden w-[90vw]">
        <p className="text-center">
          ລາຍການຄຳສັບ :{" "}
          <span className="text-primaryBg font-bold ">[ {id} ]</span>
        </p>
        <div className="container bg-primaryAccent rounded-lg h-[55vh] overflow-y-auto">
          <ul className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 p-2">
            {currentWords.map((item) => (
              <li
                key={item.id}
                className="py-2 bg-white rounded-lg hover:bg-white/70 "
              >
                <a href={`/wordDetails/${item.Word_ID}`}>
                  <div className="text-base text-black text-center block">
                    {item.Word_Name}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between mt-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-3 py-2 bg-gray-300 rounded-full ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-400"
            }`}
          >
            <IoIosArrowBack className="text-xl inline-block " />
          </button>
          <div className="flex space-x-2">{renderPageNumbers()}</div>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 bg-gray-300 rounded-full ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-400"
            }`}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>

      {/* ຫນ້າຈໍຄອມ */}
      <div className=" flex-col mx-3 w-9/12 hidden md:block">
        <p className="text-center">
          ລາຍການຄຳສັບ :{" "}
          <span className="text-primaryBg font-bold ">[ {id} ]</span>
        </p>
        <div className="container bg-primaryAccent rounded-lg h-[66.8vh]">
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 p-2">
            {currentWords.map((item) => (
              <li
                key={item.id}
                className="py-2 bg-white rounded-lg hover:bg-white/50 duration-300"
              >
                <a href={`/wordDetails/${item.Word_ID}`}>
                  <div className="text-base text-black text-center block">
                    {item.Word_Name}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between mt-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-3 py-2 bg-gray-300 rounded-full ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-400 duration-300"
            }`}
          >
            <IoIosArrowBack className="text-xl inline-block " />
          </button>
          <div className="flex space-x-2">{renderPageNumbers()}</div>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 bg-gray-300 rounded-full ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-400 duration-300"
            }`}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
