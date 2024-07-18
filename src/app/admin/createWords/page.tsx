// "use client";
// import { useState } from "react";
// import { IoIosArrowBack } from "react-icons/io";
// interface WordDescription {
//   detail: string;
//   type: string;
// }

// const InsertWordForm: React.FC = () => {
//   const [wordName, setWordName] = useState<string>("");
//   const [wordGroup, setWordGroup] = useState<string>("");
//   const [wordDescriptions, setWordDescriptions] = useState<WordDescription[]>([
//     { detail: "", type: "ຄຳນາມ" },
//   ]);

//   const handleDescriptionChange = (
//     index: number,
//     field: keyof WordDescription,
//     value: string
//   ) => {
//     const newDescriptions = [...wordDescriptions];
//     newDescriptions[index][field] = value;
//     setWordDescriptions(newDescriptions);
//   };

//   const addDescription = () => {
//     setWordDescriptions([...wordDescriptions, { detail: "", type: "ຄຳນາມ" }]);
//   };

//   const removeDescription = (index: number) => {
//     const newDescriptions = wordDescriptions.filter((_, i) => i !== index);
//     setWordDescriptions(newDescriptions);
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     try {
//       const response = await fetch("/admin/createWords/api", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           word_Name: wordName,
//           word_Group: wordGroup,
//           wordDescriptions,
//         }),
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || "Failed to insert word");
//       }

//       const result = await response.json();
//       alert(`ເພີ່ມຄຳສັບ ສຳເລັດ : ${wordName}`);
//       setWordName("");
//       setWordGroup("");
//       setWordDescriptions([{ detail: "", type: "ຄຳນາມ" }]);
//     } catch (error) {
//       console.error("Error inserting word:", error);
//       alert(`Error: ${error}`);
//     }
//   };
//   const wordGroupOptions = [
//     "",
//     "ກ",
//     "ຂ",
//     "ຄ",
//     "ງ",
//     "ຈ",
//     "ສ",
//     "ຊ",
//     "ຍ",
//     "ດ",
//     "ຕ",
//     "ຖ",
//     "ທ",
//     "ນ",
//     "ບ",
//     "ປ",
//     "ຜ",
//     "ຝ",
//     "ພ",
//     "ຟ",
//     "ມ",
//     "ຢ",
//     "ຣ",
//     "ລ",
//     "ວ",
//     "ຫ",
//     "ຫງ",
//     "ໜ",
//     "ໝ",
//     "ຫຼ",
//     "ຫວ",
//     "ອ",
//     "ຮ",
//   ];
//   return (
//     <div className=" mx-auto p-4">
//       <div>
//         <a href="/admin" className="text-orange-500 flex ">
//           <IoIosArrowBack className="text-xl" />
//           ຍ້ອນກັບ
//         </a>
//         <h1 className="text-2xl font-bold mb-2 text-center">ຟອມເພີ່ມຄຳສັບ</h1>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-2">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               ຄຳສັບ
//             </label>
//             <input
//               type="text"
//               value={wordName}
//               onChange={(e) => setWordName(e.target.value)}
//               required
//               className="mt-2 p-2 w-full border border-gray-300 rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               ກຸ່ມຄຳສັບ
//             </label>
//             <select
//               value={wordGroup}
//               onChange={(e) => setWordGroup(e.target.value)}
//               required
//               className="mt-2 p-2  border-2 border-blue-300 rounded-md"
//             >
//               {wordGroupOptions.map((option) => (
//                 <option key={option} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
//           {wordDescriptions.map((desc, index) => (
//             <div
//               key={index}
//               className="p-2 border border-black rounded-md shadow-sm relative"
//             >
//               <label className="block text-sm font-medium text-gray-700">
//                 ອະທິບາຍຄຳສັບ {index + 1}
//               </label>
//               <textarea
//                 value={desc.detail}
//                 onChange={(e) =>
//                   handleDescriptionChange(index, "detail", e.target.value)
//                 }
//                 rows={4}
//                 required
//                 className="mt-2 p-2 w-full border border-gray-300 rounded-md"
//               />
//               <label className="block text-sm font-medium text-gray-700 mt-4">
//                 ປະເພດຄຳ
//               </label>
//               <select
//                 value={desc.type}
//                 onChange={(e) =>
//                   handleDescriptionChange(index, "type", e.target.value)
//                 }
//                 required
//                 className="mt-2 p-2 w-full border border-gray-300 rounded-md"
//               >
//                 <option value="ຄຳນາມ">ຄຳນາມ</option>
//                 <option value="ຄຳແທນນາມ">ຄຳແທນນາມ</option>
//                 <option value="ຄຳກຳມະ">ຄຳກຳມະ</option>
//                 <option value="ຄຳຄຸນນາມ">ຄຳຄຸນນາມ</option>
//                 <option value="ຄຳເຊື່ອມ">ຄຳເຊື່ອມ</option>
//                 <option value="ຄຳຕໍ່">ຄຳຕໍ່</option>
//                 <option value="ຄຳອຸທານ">ຄຳອຸທານ</option>
//               </select>
//               {index > 0 && (
//                 <button
//                   type="button"
//                   onClick={() => removeDescription(index)}
//                   className="absolute top-2 right-2 text-red-500 font-bold"
//                 >
//                   X
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-center space-x-5 items-center">
//           <button
//             type="button"
//             onClick={addDescription}
//             className="border-2 border-blue-500 text-black px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white"
//           >
//             + ເພີ່ມຄຳອະທິບາຍ
//           </button>
//           <button
//             type="submit"
//             className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
//           >
//             + ເພີ່ມຄຳສັບ
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default InsertWordForm;
"use client";
import { useState } from "react";
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";

interface WordDescription {
  detail: string;
  type: string;
  Image: string;
}

const InsertWordForm: React.FC = () => {
  const [wordName, setWordName] = useState<string>("");
  const [wordGroup, setWordGroup] = useState<string>("");
  const [wordDescriptions, setWordDescriptions] = useState<WordDescription[]>([
    { detail: "", type: "ຄຳນາມ", Image: "" },
  ]);

  const handleDescriptionChange = (
    index: number,
    field: keyof WordDescription,
    value: string
  ) => {
    const newDescriptions = [...wordDescriptions];
    newDescriptions[index][field] = value;
    setWordDescriptions(newDescriptions);
  };

  const addDescription = () => {
    setWordDescriptions([
      ...wordDescriptions,
      { detail: "", type: "ຄຳນາມ", Image: "" },
    ]);
  };

  const removeDescription = (index: number) => {
    const newDescriptions = wordDescriptions.filter((_, i) => i !== index);
    setWordDescriptions(newDescriptions);
  };

  const handleFileChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    toBase64(file).then((base64String) => {
      const newDescriptions = [...wordDescriptions];
      newDescriptions[index].Image = base64String;
      setWordDescriptions(newDescriptions);
    });
  };

  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.value = "";
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("/admin/createWords/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          word_Name: wordName,
          word_Group: wordGroup,
          wordDescriptions,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to insert word");
      }

      const result = await response.json();
      alert(`ເພີ່ມຄຳສັບ ສຳເລັດ : ${wordName}`);
      setWordName("");
      setWordGroup("");
      setWordDescriptions([{ detail: "", type: "ຄຳນາມ", Image: "" }]);
    } catch (error) {
      console.error("Error inserting word:", error);
      alert(`Error: ${error}`);
    }
  };

  const wordGroupOptions = [
    "",
    "ກ",
    "ຂ",
    "ຄ",
    "ງ",
    "ຈ",
    "ສ",
    "ຊ",
    "ຍ",
    "ດ",
    "ຕ",
    "ຖ",
    "ທ",
    "ນ",
    "ບ",
    "ປ",
    "ຜ",
    "ຝ",
    "ພ",
    "ຟ",
    "ມ",
    "ຢ",
    "ຣ",
    "ລ",
    "ວ",
    "ຫ",
    "ຫງ",
    "ໜ",
    "ໝ",
    "ຫຼ",
    "ຫວ",
    "ອ",
    "ຮ",
  ];

  return (
    <div className="mx-auto p-4">
      <div>
        <a href="/admin" className="text-orange-500 flex">
          <IoIosArrowBack className="text-xl" />
          ຍ້ອນກັບ
        </a>
        <h1 className="text-2xl font-bold mb-2 text-center">ຟອມເພີ່ມຄຳສັບ</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-2"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ຄຳສັບ
            </label>
            <input
              type="text"
              value={wordName}
              onChange={(e) => setWordName(e.target.value)}
              required
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ກຸ່ມຄຳສັບ
            </label>
            <select
              value={wordGroup}
              onChange={(e) => setWordGroup(e.target.value)}
              required
              className="mt-2 p-2 border-2 border-blue-300 rounded-md"
            >
              {wordGroupOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {wordDescriptions.map((desc, index) => (
            <div
              key={index}
              className="p-2 border border-black rounded-md shadow-sm relative"
            >
              <label className="block text-sm font-medium text-gray-700">
                ອະທິບາຍຄຳສັບ {index + 1}
              </label>
              <textarea
                value={desc.detail}
                onChange={(e) =>
                  handleDescriptionChange(index, "detail", e.target.value)
                }
                rows={4}
                required
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              />
              <label className="block text-sm font-medium text-gray-700 mt-4">
                ປະເພດຄຳ
              </label>
              <select
                value={desc.type}
                onChange={(e) =>
                  handleDescriptionChange(index, "type", e.target.value)
                }
                required
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              >
                <option value="ຄຳນາມ">ຄຳນາມ</option>
                <option value="ຄຳແທນນາມ">ຄຳແທນນາມ</option>
                <option value="ຄຳກຳມະ">ຄຳກຳມະ</option>
                <option value="ຄຳຄຸນນາມ">ຄຳຄຸນນາມ</option>
                <option value="ຄຳເຊື່ອມ">ຄຳເຊື່ອມ</option>
                <option value="ຄຳຕໍ່">ຄຳຕໍ່</option>
                <option value="ຄຳອຸທານ">ຄຳອຸທານ</option>
              </select>

              <label className="block text-sm font-medium text-gray-700 mt-4">
                ຮູບພາບ :
              </label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={(e) => handleFileChange(index, e)}
                onClick={onClick}
                className="mt-2"
              />
              {desc.Image && (
                <Image
                  src={desc.Image}
                  alt={`ຮູບພາບ ${index + 1}`}
                  className="mt-2 w-full h-auto"
                  width={150}
                  height={150}
                />
              )}
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeDescription(index)}
                  className="absolute top-2 right-2 text-red-500 font-bold"
                >
                  X
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-5 items-center">
          <button
            type="button"
            onClick={addDescription}
            className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-700 hover:text-white"
          >
            + ເພີ່ມຄຳອະທິບາຍ
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            + ເພີ່ມຄຳສັບ
          </button>
        </div>
      </form>
    </div>
  );
};

const toBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result as string);
    fileReader.onerror = (error) => reject(error);
  });
};

export default InsertWordForm;
