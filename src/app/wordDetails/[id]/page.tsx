"use client";
import React, { useState, useEffect } from "react";
import { getData } from "./data";
import Image from "next/image";

interface PageProps {
  params: {
    id: string;
  };
}

interface DataItem {
  Word_Name: string;
  WordType_Group: string;
  WordDescribe_Detail: string;
  Image?: {
    data: Uint8Array;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const { id } = params;
  const [data, setData] = useState<DataItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // console.log("ກຳລັງໂຫລດຂໍ້ມູນ...");
        const result = await getData(id);
        setData(result);
        // console.log("ຂໍ້ມູນທີ່ໄດ້ຮັບ", result);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) {
    return <p>ກຳລັງໂຫລດຂໍ້ມູນ...</p>;
  }
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {/* ຫນ້າຈໍຄອມ */}
      <div className="hidden md:flex flex-col w-9/12 mx-3">
        <p className="text-center">ລາຍລະອຽດຄຳສັບ</p>
        <div className="container mx-auto bg-primaryAccent rounded-lg h-full">
          {data && data.length > 0 && (
            <div className="p-5 bg-white m-3 rounded-lg h-[70vh] overflow-y-auto">
              {data.map((item, index) => (
                <div key={index}>
                  {index === 0 && (
                    <div className="p-5">
                      <h1 className="text-5xl">{item.Word_Name}</h1>
                    </div>
                  )}

                  <hr className="border" />
                  <div className="pl-5">
                    <p className="font-bold text-primaryBg">
                      {item.WordType_Group}
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <div className="pl-20 pt-2 grid grid-cols-2 mb-2">
                      <p className="flex items-center">
                        {item.WordDescribe_Detail || "ບໍ່ມີຂໍ້ມູນ"}
                      </p>
                      {item.Image && (
                        <div className="mt-3">
                          {item.Image && item.Image.data && (
                            <Image
                              src={`data:image/jpeg;base64,${Buffer.from(
                                item.Image.data
                              ).toString("base64")}`}
                              alt={item.Word_Name || "Word image"}
                              className="rounded-lg object-cover"
                              width={200}
                              height={200}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* // ຫນ້າຈໍໂທລະສັບ */}

      <div className="md:hidden flex flex-col mx-3">
        <p className="text-center">ລາຍລະອຽດຄຳສັບ</p>
        <div className="container mx-auto bg-primaryAccent rounded-lg h-full">
          {data && data.length > 0 && (
            <div className="p-2 bg-white m-3 rounded-lg h-[60vh] overflow-y-auto">
              {data.map((item, index) => (
                <div key={index}>
                  {index === 0 && (
                    <div className="p-5">
                      <h1 className="text-5xl">{item.Word_Name}</h1>
                    </div>
                  )}
                  <hr className="border" />
                  <div className="pl-5">
                    <p className="font-bold text-primaryBg">
                      {item.WordType_Group}
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <div className="pl-5 pt-2 grid grid-cols-2">
                      <p className="flex items-center">
                        {item.WordDescribe_Detail || "ບໍ່ມີຂໍ້ມູນ"}
                      </p>
                      {item.Image && (
                        <div className="flex justify-center mb-2">
                          <Image
                            src={`data:image/jpeg;base64,${Buffer.from(
                              item.Image.data
                            ).toString("base64")}`}
                            alt={item.Word_Name}
                            width={100}
                            height={100}
                            className="rounded-lg object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
