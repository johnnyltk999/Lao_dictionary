"use client";
import React, { useEffect, useState } from "react";
import { getData } from "./data";

interface Word {
  id: number;
  Word_ID: number;
  Word_Name: string;
}

function Page() {
  const [data, setData] = useState<Word[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result: Word[] = await getData();
      setData(result);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Word Details</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {data.map((item) => (
          <li key={item.id} className="p-4 border rounded-lg shadow">
            <a
              href={`/wordDetails/${item.Word_ID}`}
              className="text-blue-600 hover:underline"
            >
              {item.Word_Name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Page;
