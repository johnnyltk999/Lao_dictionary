"use client";

import React, { useState, useEffect } from "react";
import { getData } from "../data";
import Image from "next/image";

//icon
import { FaTrash, FaEdit } from "react-icons/fa";

interface PageProps {
  params: {
    id: string;
  };
}

interface DataItem {
  Word_Name: string;
  Word_Group: string;
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
        // console.log("Loading data...");
        const result = await getData(id);
        setData(result);
        // console.log("Data received", result);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("ທ່ານແນ່ໃຈບໍ ຈະລົບຄຳສັບນີ້?");
    if (!confirmDelete) {
      return; // User canceled the deletion
    }
    try {
      const response = await fetch(`/admin/wordDelete/${id}/api`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      const result = await response.json();
      alert(result.message);

      // Redirect to the home page after deletion
      window.location.href = "/admin";
    } catch (error) {
      console.error("Error deleting word:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data</p>;
  }

  return (
    <>
      <div className="flex items-center">
        <a href="/admin" className="text-xl text-orange-300 pl-2">
          ຍ້ອນກັບ
        </a>
      </div>

      <div className="flex flex-col w-9/12 mx-auto my-5">
        <p className="text-center text-3xl font-bold mb-5">ລາຍລະອຽດຄຳສັບ</p>
        <div className="bg-gray-200 rounded-lg overflow-hidden">
          {data && data.length > 0 && (
            <div className="p-5 bg-white m-3 h-[70vh] overflow-y-auto">
              {data.map((item, index) => (
                <div key={index} className="mb-5">
                  {index === 0 && (
                    <div className="p-5 ">
                      <p className="text-lg">ໄອດີ : {id}</p>
                      <h1 className="text-5xl font-bold text-primaryBg">
                        {item.Word_Name}
                      </h1>
                    </div>
                  )}
                  {index === 0 && (
                    <div className="flex items-center">
                      <span className="text-xl font-bold mr-3">ກຸ່ມ :</span>
                      <p className="text-xl font-bold text-primaryBg">
                        {item.Word_Group}
                      </p>
                    </div>
                  )}
                  <hr />
                  <div className="p-5">
                    <p className="text-lg  mb-3">ຄວາມໝາຍຄຳສັບ : {index + 1}</p>
                    <p>{item.WordDescribe_Detail || "No details"}</p>
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
                  <div className="p-5">
                    <div className="flex items-center mb-3">
                      <span className="text-lg font-bold mr-3">ປະເພດຄຳ :</span>
                      <p className="text-lg font-bold text-primaryBg">
                        {item.WordType_Group}
                      </p>
                    </div>
                  </div>
                  <hr className=" border-2" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center space-x-5 m-5">
        <div>
          <a
            // href={`/admin/edit/${id}`}
            href={`/admin/edit/${id}`}
            className="text-orange-300 text-xl hover:text-white"
          >
            <span className="flex items-center border-2 border-orange-300 px-4 py-2 rounded-lg hover:bg-orange-300">
              <FaEdit className="mr-2" />
              ແກ້ໄຂຄຳສັບ
            </span>
          </a>
        </div>

        <div>
          <button
            className="text-white text-xl border-2 bg-red-500 px-4 hover:bg-red-600 py-2 rounded-lg"
            onClick={() => handleDelete(id)}
          >
            <span className="flex items-center">
              <FaTrash className="mr-2" />
              ລົບຄຳສັບ
            </span>
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default Page;
