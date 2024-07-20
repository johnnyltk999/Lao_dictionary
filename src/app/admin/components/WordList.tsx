import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getData } from "../api/data";

interface Word {
  Word_ID: number;
  Word_Name: string;
  Word_Group: string;
}

const Page: React.FC<{ search: string }> = ({ search }) => {
  const [data, setData] = useState<Word[]>([]);
  const [totalWords, setTotalWords] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
        setTotalWords(result.length); // Set total words count
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter words based on search criteria
  const filteredWords: Word[] = data.filter(
    (word) =>
      word.Word_Name.toLowerCase().includes(search.toLowerCase()) ||
      word.Word_ID.toString().includes(search)
  );

  return (
    <div className="container mx-auto">
      <h1 className="font-bold text-center underline underline-offset-2">
        ລາຍການຄຳສັບ
      </h1>
      <div className="mt-4 p-4 h-[65vh] overflow-y-auto border-2 border-black">
        <ul className="grid grid-cols-8 gap-4">
          {filteredWords.map((word) => (
            <li key={word.Word_ID} className="hover:text-primaryBg text-center">
              <Link href={`/admin/wordsDetails/${word.Word_ID}`}>
                <div className="border-2 border-black w-auto">
                  {word.Word_ID} : {word.Word_Name}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-end">
        <p>ຄຳສັບທັງຫມົດ : {totalWords} </p>
      </div>
    </div>
  );
};

export default Page;
