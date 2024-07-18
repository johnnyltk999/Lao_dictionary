// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { getData } from "./data";
// import { IoIosArrowBack } from "react-icons/io";
// import Image from "next/image";
// interface WordDescription {
//   detail: string;
//   type: string;
//   wordDescribeId?: number;
//   Image?: {
//     data: Uint8Array;
//   }; // Optional for new descriptions
// }

// const EditWordForm: React.FC<{ params: { id: string } }> = ({ params }) => {
//   const { id } = params;
//   const [wordName, setWordName] = useState<string>("");
//   const [wordGroup, setWordGroup] = useState<string>("");
//   const [wordDescriptions, setWordDescriptions] = useState<WordDescription[]>([
//     { detail: "", type: "ຄຳນາມ", wordDescribeId: 0 },
//   ]);
//   const router = useRouter();
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const result = await getData(id);
//         if (result.length > 0) {
//           setWordName(result[0].Word_Name);
//           setWordGroup(result[0].Word_Group);
//           setWordDescriptions(
//             result.map((item: any) => ({
//               detail: item.WordDescribe_Detail,
//               type: item.WordType_Group,
//               wordDescribeId: item.ID,
//               Image: { data: item.Image }, // Assuming this is the ID field
//             }))
//           );
//         }
//         console.log(result); // Debugging
//       } catch (error) {
//         setError(error as Error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, [id]);

//   const handleDescriptionChange = (
//     index: number,
//     field: keyof WordDescription,
//     value: string
//   ) => {
//     const newDescriptions: WordDescription[] = [...wordDescriptions];
//     newDescriptions[index][field] = value as never; // Use type assertion
//     setWordDescriptions(newDescriptions);
//   };

//   const addDescription = () => {
//     setWordDescriptions([...wordDescriptions, { detail: "", type: "ຄຳນາມ" }]);
//   };

//   const deleteWordDescribe = async (wordDescribeId: number) => {
//     const confirmDelete = window.confirm("ທ່ານແນ່ໃຈບໍ ຈະລົບຄຳອະທິບາຍນີ້ ?");
//     if (!confirmDelete) {
//       return; // User canceled the deletion
//     }
//     // console.log(wordDescribeId);
//     try {
//       const response = await fetch(`/admin/describeDel/${wordDescribeId}/api`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({}),
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || "Failed to delete word description");
//       }

//       // Remove the deleted description from the state
//       setWordDescriptions((prev) =>
//         prev.filter((desc) => desc.wordDescribeId !== wordDescribeId)
//       );

//       alert("ລົບຄຳອະທິບາຍສຳເລັດແລ້ວ !");
//     } catch (error) {
//       console.error("Error deleting word description:", error);
//       alert(`Error: ${error}`);
//     }
//   };

//   const removeDescription = (index: number) => {
//     const wordDescribeId = wordDescriptions[index].wordDescribeId;

//     if (wordDescribeId) {
//       // Call the delete API if the description has an ID
//       deleteWordDescribe(wordDescribeId);
//     } else {
//       // Remove the description locally if it has no ID (new description)
//       setWordDescriptions((prev) => prev.filter((_, i) => i !== index));
//     }
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     try {
//       const response = await fetch(`/admin/edit/${id}/api`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           Word_ID: id,
//           word_Name: wordName,
//           word_Group: wordGroup,
//           wordDescriptions,
//         }),
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || "Failed to update word");
//       }

//       const result = await response.json();
//       alert(`ອັບເດດຄຳສັບສຳເລັດ : ${wordName}`);
//       router.push(`/admin/wordsDetails/${id}`);
//       // Reset the form or navigate away
//     } catch (error) {
//       console.error("Error updating word:", error);
//       alert(`Error: ${error}`);
//     }
//   };

//   if (loading) {
//     return <p className="text-center mt-5">Loading...</p>;
//   }

//   if (error) {
//     return <p className="text-center mt-5 text-red-500">Error loading data</p>;
//   }

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
//     <div className="mx-auto p-4">
//       <div>
//         <a href={`/admin/wordsDetails/${id}`} className="text-orange-500 flex">
//           <IoIosArrowBack className="text-xl" />
//           ຍ້ອນກັບ
//         </a>
//         <h1 className="text-2xl font-bold mb-2 text-center">ແກ້ໄຂຄຳສັບ</h1>
//       </div>
//       <p>{params.id}</p>

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
//               className="mt-2 p-2 border-2 border-blue-300 rounded-md"
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
//           {wordDescriptions &&
//             wordDescriptions.map((desc, index) => (
//               <div
//                 key={index}
//                 className="p-2 border border-black rounded-md shadow-sm relative"
//               >
//                 <label className="block text-sm font-medium text-gray-700">
//                   ອະທິບາຍຄຳສັບ
//                 </label>
//                 <textarea
//                   value={desc.detail}
//                   onChange={(e) =>
//                     handleDescriptionChange(index, "detail", e.target.value)
//                   }
//                   rows={4}
//                   required
//                   className="mt-2 p-2 w-full border border-gray-300 rounded-md"
//                 />
//                 <label className="block text-sm font-medium text-gray-700 mt-4">
//                   ປະເພດຄຳ
//                 </label>
//                 <select
//                   value={desc.type}
//                   onChange={(e) =>
//                     handleDescriptionChange(index, "type", e.target.value)
//                   }
//                   required
//                   className="mt-2 p-2 w-full border border-gray-300 rounded-md"
//                 >
//                   <option value=""></option>
//                   <option value="ຄຳນາມ">ຄຳນາມ</option>
//                   <option value="ຄຳແທນນາມ">ຄຳແທນນາມ</option>
//                   <option value="ຄຳກຳມະ">ຄຳກຳມະ</option>
//                   <option value="ຄຳຄຸນນາມ">ຄຳຄຸນນາມ</option>
//                   <option value="ຄຳເຊື່ອມ">ຄຳເຊື່ອມ</option>
//                   <option value="ຄຳຕໍ່">ຄຳຕໍ່</option>
//                   <option value="ຄຳອຸທານ">ຄຳອຸທານ</option>
//                 </select>
//                 {/* <div className="flex m-2 justify-center">
//                   {desc.Image && (
//                     <Image
//                       src={`data:image/jpeg;base64,${Buffer.from(
//                         desc.Image!.data
//                       ).toString("base64")}`}
//                       alt={wordName}
//                       width={100}
//                       height={100}
//                       className="object-cover"
//                     />
//                   )}
//                 </div> */}

//                 {/* <div>
//                   <button
//                     type="button"
//                     onClick={() => deleteWordDescribe(desc.wordDescribeId ?? 0)}
//                     className="absolute top-2 right-2 text-red-500 font-bold"
//                   >
//                     ລົບ
//                   </button>
//                   {error && <p>{error}</p>}
//                 </div> */}

//                 <div>
//                   <button
//                     type="button"
//                     onClick={() => removeDescription(index)}
//                     className="absolute top-2 right-2 text-red-500 font-bold"
//                   >
//                     ລົບ
//                   </button>
//                   {error && <p>{error}</p>}
//                 </div>
//                 <form id="uploadForm" encType="multipart/form-data">
//                   <input
//                     type="hidden"
//                     name="wordDescribeId"
//                     value={desc.wordDescribeId}
//                   />
//                   <label htmlFor="">
//                     ເລືອກຮູບ
//                     <input type="file" />
//                   </label>
//                 </form>
//               </div>
//             ))}
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
//             ບັນທຶກ
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditWordForm;

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getData } from "./data";
import Image from "next/image";

interface WordDescription {
  detail: string;
  type: string;
  wordDescribeId?: number;
  Image: string;
}

const EditWordForm: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { id } = params;
  const [wordName, setWordName] = useState<string>("");
  const [wordGroup, setWordGroup] = useState<string>("");
  const [wordDescriptions, setWordDescriptions] = useState<WordDescription[]>([
    { detail: "", type: "ຄຳນາມ", wordDescribeId: 0, Image: "" },
  ]);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [base64, setBase64] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData(id);
        if (result.length > 0) {
          setWordName(result[0].Word_Name);
          setWordGroup(result[0].Word_Group);
          setWordDescriptions(
            result.map((item: any) => ({
              detail: item.WordDescribe_Detail,
              type: item.WordType_Group,
              wordDescribeId: item.ID,
              Image: item.Image, // Assuming this is base64 encoded string
            }))
          );
        }
        console.log(result); // Debugging
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleDescriptionChange = (
    index: number,
    field: keyof WordDescription,
    value: string
  ) => {
    const newDescriptions: WordDescription[] = [...wordDescriptions];
    newDescriptions[index][field] = value as never; // Use type assertion
    setWordDescriptions(newDescriptions);
  };

  const addDescription = () => {
    setWordDescriptions([
      ...wordDescriptions,
      { detail: "", type: "ຄຳນາມ", Image: "" },
    ]);
  };

  const deleteWordDescribe = async (wordDescribeId: number) => {
    const confirmDelete = window.confirm("ທ່ານແນ່ໃຈບໍ ຈະລົບຄຳອະທິບາຍນີ້ ?");
    if (!confirmDelete) {
      return; // User canceled the deletion
    }
    // console.log(wordDescribeId);
    try {
      const response = await fetch(`/admin/describeDel/${wordDescribeId}/api`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete word description");
      }

      // Remove the deleted description from the state
      setWordDescriptions((prev) =>
        prev.filter((desc) => desc.wordDescribeId !== wordDescribeId)
      );

      alert("ລົບຄຳອະທິບາຍສຳເລັດແລ້ວ !");
    } catch (error) {
      console.error("Error deleting word description:", error);
      alert(`Error: ${error}`);
    }
  };

  const removeDescription = (index: number) => {
    const wordDescribeId = wordDescriptions[index].wordDescribeId;

    if (wordDescribeId) {
      // Call the delete API if the description has an ID
      deleteWordDescribe(wordDescribeId);
    } else {
      // Remove the description locally if it has no ID (new description)
      setWordDescriptions((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`/admin/edit/${id}/api`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Word_ID: id,
          word_Name: wordName,
          word_Group: wordGroup,
          wordDescriptions,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update word");
      }

      const result = await response.json();
      alert(`ອັບເດດຄຳສັບສຳເລັດ : ${wordName}`);
      router.push(`/admin/wordsDetails/${id}`);
      // Reset the form or navigate away
    } catch (error) {
      console.error("Error updating word:", error);
      alert(`Error: ${error}`);
    }
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

  // const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
  //   e.currentTarget.value = "";
  // };

  if (loading) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-5 text-red-500">Error loading data</p>;
  }

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
        <a href={`/admin/wordsDetails/${id}`} className="text-orange-500 flex">
          ຍ້ອນກັບ
        </a>
        <h1 className="text-2xl font-bold mb-2 text-center">ແກ້ໄຂຄຳສັບ</h1>
      </div>
      <p>ໄອດີ : {params.id}</p>

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
          {wordDescriptions &&
            wordDescriptions.map((desc, index) => (
              <div
                key={index}
                className="p-2 border border-black rounded-md shadow-sm relative"
              >
                <label className="block text-sm font-medium text-gray-700">
                  ຄຳອະທິບາຍ : {index + 1}
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
                <label className="block text-sm font-medium text-gray-700">
                  ປະເພດຄຳສັບ
                </label>
                <select
                  value={desc.type}
                  onChange={(e) =>
                    handleDescriptionChange(index, "type", e.target.value)
                  }
                  required
                  className="mt-2 p-2 w-full border-2 border-blue-300 rounded-md"
                >
                  <option value=""></option>
                  <option value="ຄຳນາມ">ຄຳນາມ</option>
                  <option value="ຄຳແທນນາມ">ຄຳແທນນາມ</option>
                  <option value="ຄຳກຳມະ">ຄຳກຳມະ</option>
                  <option value="ຄຳຄຸນນາມ">ຄຳຄຸນນາມ</option>
                  <option value="ຄຳເຊື່ອມ">ຄຳເຊື່ອມ</option>
                  <option value="ຄຳຕໍ່">ຄຳຕໍ່</option>
                  <option value="ຄຳອຸທານ">ຄຳອຸທານ</option>
                </select>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700">
                    ເລືອກຮູບພາບ :
                  </label>
                  <input
                    type="file"
                    name="Image"
                    accept="image/*"
                    onChange={(e) => handleFileChange(index, e)}
                    // onClick={onClick}
                    className="mt-2"
                  />

                  {desc.Image && desc.Image && (
                    <Image
                      src={
                        typeof desc.Image === "string"
                          ? desc.Image
                          : `data:image/png;base64,${Buffer.from(
                              desc.Image
                            ).toString("base64")}`
                      }
                      alt={wordName}
                      width={100}
                      height={100}
                      className="mt-2"
                    />
                  )}
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => removeDescription(index)}
                    className="absolute top-2 right-2 text-red-500 font-bold"
                  >
                    ລົບ
                  </button>
                  {error && <p>{error}</p>}
                </div>
              </div>
            ))}
        </div>
        <div className="flex justify-center space-x-5 items-center">
          <button
            type="button"
            onClick={addDescription}
            className="border-2 border-blue-500 text-black px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white"
          >
            + ເພີ່ມຄຳອະທິບາຍ
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            ບັນທຶກ
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

export default EditWordForm;
