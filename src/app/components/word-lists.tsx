"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getData } from "../api/data";
interface Word {
  id: number;
  Word_ID: number;
  Word_Name: string;
}

// interface WordsListProps {
//   words: Word[];
//   search: string;
// }

const WordsLists: React.FC<{ search: string }> = ({ search }) => {
  const [data, setData] = useState<Word[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 60;
  const maxPageNumbersToShow: number = 4;

  const filteredWords: Word[] = data.filter((word) =>
    word.Word_Name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages: number = Math.ceil(filteredWords.length / itemsPerPage);

  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
        setCurrentPage(1); // Set total words count
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = (): JSX.Element[] => {
    let pageNumbers: JSX.Element[] = [];
    const startPage: number = Math.max(
      1,
      currentPage - Math.floor(maxPageNumbersToShow / 2)
    );
    const endPage: number = Math.min(
      totalPages,
      startPage + maxPageNumbersToShow - 1
    );

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
              : "bg-gray-300 hover:bg-gray-400 duration-300"
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

  const indexOfLastWord: number = currentPage * itemsPerPage;
  const indexOfFirstWord: number = indexOfLastWord - itemsPerPage;
  const currentWords: Word[] = filteredWords.slice(
    indexOfFirstWord,
    indexOfLastWord
  );

  return (
    <>
      {/* ຫນ້າຈໍໂທລະສັບ */}
      <div className="container flex-col mx-3 md:hidden w-[90vw]">
        <p className="text-center">ລາຍການຄຳສັບ</p>
        <div
          className="bg-primaryAccent rounded-lg h-svh overflow-y-auto"
          style={{ maxHeight: "55vh" }}
        >
          {filteredWords.length > 0 ? (
            <ul className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 p-2">
              {currentWords.map((word) => (
                <li
                  key={word.id}
                  className="py-2 bg-white rounded-lg hover:bg-white/70 truncate"
                >
                  <Link href={`/wordDetails/${word.Word_ID}`}>
                    <div className="text-base text-black text-center block ">
                      {word.Word_Name}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center pt-10 text-orange-500 text-3xl">
              ບໍ່ພົບຄຳສັບ !!! 😓😓😓
            </p>
          )}
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
            <IoIosArrowBack />
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
      <div className="container flex-col w-9/12 mx-3 hidden md:block">
        <p className="text-center">ລາຍການຄຳສັບທັງຫມົດ</p>
        <div className="container bg-primaryAccent rounded-lg h-[66.8vh]">
          {filteredWords.length > 0 ? (
            <ul className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 p-2">
              {currentWords.map((word) => (
                <li
                  key={word.id}
                  className="py-2 bg-white rounded-lg hover:bg-white/50 duration-300 truncate"
                >
                  <Link href={`/wordDetails/${word.Word_ID}`}>
                    <div className="text-base text-black text-center block ">
                      {word.Word_Name}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center pt-10 text-orange-500 text-3xl">
              ບໍ່ພົບຄຳສັບ !!! 😓😓😓
            </p>
          )}
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
            <IoIosArrowForward className="text-xl inline-block " />
          </button>
        </div>
      </div>
    </>
  );
};

export default WordsLists;
