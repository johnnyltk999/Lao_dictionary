"use client";
import React from "react";
import { useState, useEffect } from "react";
import { getData } from "./data";

interface Items {
  Update_Date: string;
  Update_Detail: string;
  word_ID: number;
}

export default function Page() {
  const [items, setItems] = useState<Items[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: Items[] = await getData();
        setItems(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Format the date to local time zone
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // or use toLocaleDateString and toLocaleTimeString as needed
  };
  return (
    <div className="container mx-auto p-4">
      <a href="/admin" className="text-orange-500">
        ຍ້ອນກັບ
      </a>
      <h1 className="text-2xl font-bold mb-4  justify-center flex">
        ປະຫວັດການແກ້ໄຂ
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="p-3 text-left text-sm font-semibold text-gray-600">
                Update Date
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-600">
                Update Detail
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-600">
                Word_ID
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.word_ID} className="border-b border-gray-200">
                <td className="p-3 text-sm text-gray-800">
                  {formatDate(item.Update_Date)}
                </td>
                <td className="p-3 text-sm text-gray-800">
                  {item.Update_Detail}
                </td>
                <td className="p-3 text-sm text-gray-800">{item.word_ID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
