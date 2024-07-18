"use client";

import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getData } from "../../wordsDetails/data";
import Image from "next/image";

interface WordDescription {
  detail: string;
  type: string;
  wordDescribeId?: number;
  Image?: {
    data: Uint8Array | string; // Added string type for base64 encoded strings
  };
}

const UploadFileForm: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { id } = params;
  const [wordName, setWordName] = useState<string>("");
  const [wordGroup, setWordGroup] = useState<string>("");
  const [wordDescriptions, setWordDescriptions] = useState<WordDescription[]>([
    { detail: "", type: "ຄຳນາມ", wordDescribeId: 0, Image: { data: "" } },
  ]);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  //uploadImage
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
              Image: { data: item.Image }, // Assuming this is base64 encoded string
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
    setWordDescriptions([...wordDescriptions, { detail: "", type: "ຄຳນາມ" }]);
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
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmitImage = async (event: FormEvent) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(`/admin/addimage/image/api`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Upload successful!", result);
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error (e.g., show an error message)
    }
  };

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
    <>
      <a href={`/admin/wordsDetails/${id}`} className="text-orange-500 flex">
        ຍ້ອນກັບ
      </a>
      <form
        onSubmit={handleSubmitImage}
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
                  ອະທິບາຍຄຳສັບ
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

                <label className="block text-sm font-medium text-gray-700">
                  ຮູບພາບ
                </label>

                <form onSubmit={handleSubmitImage}>
                  <input type="file" onChange={handleFileChange} />
                  <button type="submit">Upload</button>
                </form>

                <button
                  type="button"
                  onClick={() => removeDescription(index)}
                  className="mt-2 p-2 w-full bg-red-500 text-white rounded-md"
                >
                  ລົບ
                </button>
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
    </>
  );
};

export default UploadFileForm;
