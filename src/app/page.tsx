"use client";
import React, { useEffect, useState } from "react";
import "./globals.css";
import Navbar from "./components/navbar";
import Search from "./components/search";
import RightNav from "./components/right-nav";
import LeftNav from "./components/left-nav";
import WordsLists from "./components/word-lists";
import Footter from "./components/footter";
import { getData } from "./api/data";

interface Word {
  id: number;
  Word_ID: number;
  Word_Name: string;
  WordType_ID: number;
  WordDescribe_Details: string;
}

export default function Home() {
  const [data, setData] = useState<Word[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: Word[] = await getData();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData: Word[] =
    data.filter((word) => {
      const searchTerm: string = search.toLowerCase();
      return (
        searchTerm === "" || word.Word_Name.toLowerCase().includes(searchTerm)
      );
    }) || [];

  return (
    <main>
      <Navbar />

      <Search search={search} setSearch={setSearch} />

      <hr className="border border-primaryAccent" />

      {/* sm:display */}
      <div className="md:hidden flex flex-col items-center">
        <div className="flex justify-center space-x-5">
          {/* <LeftNav /> */}
          <RightNav />
        </div>
        <div>
          <WordsLists words={filteredData} search={search} />
        </div>
      </div>

      {/* lg:display */}
      <div className="hidden md:block">
        <div className=" flex justify-between py-1 px-4 ">
          <div>
            <LeftNav />
          </div>

          <WordsLists words={filteredData} search={search} />

          <div>
            <RightNav />
          </div>
        </div>
      </div>

      <Footter />
    </main>
  );
}
