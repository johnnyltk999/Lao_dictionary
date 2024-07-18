// "use client";
// import React, { useState, useEffect } from "react";
// import { getData } from "./api/data";
// import Link from "next/link";
// import WordLists from "./components/WordList";
// import Search from "./components/search";

// import { useSession, signIn, signOut } from "next-auth/react";

// //icon
// import { FaUserFriends, FaBook } from "react-icons/fa";

// interface Word {
//   id: number;
//   Word_ID: number;
//   Word_Name: string;
//   WordType_ID: number;
//   WordDescribe_Details: string;
//   Word_Group: string; // Ensure Word_Group is included
// }

// export default function Page() {
//   const [data, setData] = useState<Word[]>([]);
//   const [search, setSearch] = useState<string>("");

//   const { data: session } = useSession();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result: Word[] = await getData();
//         setData(result);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Filter data based on search input
//   const filteredData: Word[] = data.filter((word) =>
//     word.Word_Name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <>
//       <nav className="bg-primaryBg p-4 mb-2">
//         <div className="container mx-auto flex justify-between items-center">
//           <div className="text-white text-xl">ລາວລາວ</div>
//           <div className="flex items-center space-x-4">
//             {session ? (
//               <>
//                 <p className="text-white">{session.user?.email} |</p>
//                 <p className="text-white">{session.user?.name}</p>
//                 <button
//                   onClick={() => signOut()}
//                   className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                 >
//                   Sign Out
//                 </button>
//               </>
//             ) : (
//               <>
//                 <p className="text-gray-300">Not signed in</p>
//                 <button
//                   onClick={() => signIn()}
//                   className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                 >
//                   Sign In
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </nav>
//       <div className="flex space-x-5">
//         <Link
//           href="/admin/createWords"
//           className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-700"
//         >
//           <div className="flex">
//             + <FaBook className="text-2xl" /> ເພີ່ມຄຳສັບ
//           </div>
//         </Link>
//         <Link
//           href="/admin/AdminList"
//           className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-700"
//         >
//           <span className="flex">
//             + <FaUserFriends className="text-2xl" />
//             ແອັດມິນ
//           </span>
//         </Link>
//       </div>

//       <Search search={search} setSearch={setSearch} />
//       {/* Pass filteredData to WordLists component */}
//       {/* <WordLists words={filteredData} search={search} /> */}
//       <WordLists search={search} />
//     </>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import { getData } from "./api/data";
import Link from "next/link";
import WordLists from "./components/WordList";
import Search from "./components/search";

import { useSession, signIn, signOut } from "next-auth/react";

//icon
import { FaUserFriends, FaBook } from "react-icons/fa";

interface Word {
  id: number;
  Word_ID: number;
  Word_Name: string;
  WordType_ID: number;
  WordDescribe_Details: string;
  Word_Group: string; // Ensure Word_Group is included
}

export default function Page() {
  const [data, setData] = useState<Word[]>([]);
  const [search, setSearch] = useState<string>("");

  const { data: session } = useSession();

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

  // Filter data based on search input
  const filteredData: Word[] = data.filter((word) =>
    word.Word_Name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {session ? (
        <>
          <nav className="bg-primaryBg p-2 mb-2">
            <div className="container mx-auto flex justify-between items-center">
              <div className="text-white text-xl">ລາວລາວ | ຜູ້ດູແລ</div>
              <div className="flex items-center space-x-4">
                <p className="text-white">{session.user?.email} |</p>
                <p className="text-white">{session.user?.name}</p>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  ອອກຈາກລະບົບ
                </button>
              </div>
            </div>
          </nav>
          <div className="flex space-x-5 mx-5">
            <Link
              href="/admin/createWords"
              className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-700"
            >
              <div className="flex">
                + <FaBook className="text-2xl" /> ເພີ່ມຄຳສັບ
              </div>
            </Link>
            <Link
              href="/admin/AdminList"
              className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-700"
            >
              <span className="flex">
                + <FaUserFriends className="text-2xl" />
                ແອັດມິນ
              </span>
            </Link>
          </div>
          <Search search={search} setSearch={setSearch} />
          {/* Pass filteredData to WordLists component */}
          {/* <WordLists words={filteredData} search={search} /> */}
          <WordLists search={search} />
        </>
      ) : (
        <>
          <nav className="bg-primaryBg p-2 mb-2 items-center">
            <div className="flex items-center space-x-4 justify-end">
              <p className="text-white">ກາລຸນາເຂົ້າສູ່ລະບົບ</p>
              <button
                onClick={() => signIn()}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
              >
                ລັອກອິນ
              </button>
            </div>
          </nav>
          <div className="flex  justify-center mt-72">
            <h1 className="text-3xl">ກາລຸນາເຂົ້າສູ່ລະບົບ !🫡</h1>
          </div>
          <a
            href="/"
            className="text-orange-300 justify-center flex mt-5 underline"
          >
            ກັບໄປຫນ້າທຳອິດ
          </a>
        </>
      )}
    </>
  );
}
