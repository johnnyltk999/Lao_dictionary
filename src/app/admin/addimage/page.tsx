"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";

const UploadFileForm: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const [wordType, setWordType] = useState<string>("ຄຳນາມ");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("description", description);
    formData.append("wordType", wordType);

    try {
      const response = await fetch("/admin/addimage/image/api", {
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

  return (
    <form onSubmit={handleSubmit}>
      <label className="block text-sm font-medium text-gray-700">
        ອະທິບາຍຄຳສັບ
      </label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        required
        className="mt-2 p-2 w-full border border-gray-300 rounded-md"
      />
      <label className="block text-sm font-medium text-gray-700">
        ປະເພດຄຳສັບ
      </label>
      <select
        value={wordType}
        onChange={(e) => setWordType(e.target.value)}
        required
        className="mt-2 p-2 w-full border-2 border-blue-300 rounded-md"
      >
        <option value="ຄຳນາມ">ຄຳນາມ</option>
        <option value="ຄຳແທນນາມ">ຄຳແທນນາມ</option>
        <option value="ຄຳກຳມະ">ຄຳກຳມະ</option>
        <option value="ຄຳຄຸນນາມ">ຄຳຄຸນນາມ</option>
        <option value="ຄຳເຊື່ອມ">ຄຳເຊື່ອມ</option>
        <option value="ຄຳຕໍ່">ຄຳຕໍ່</option>
        <option value="ຄຳອຸທານ">ຄຳອຸທານ</option>
      </select>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">ອັບໂຫຼດຮູບ</button>
    </form>
  );
};

export default UploadFileForm;
