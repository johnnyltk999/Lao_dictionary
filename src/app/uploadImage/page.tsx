"use client";
import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";

const Upload: NextPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [base64, setBase64] = useState<string | null>(null);
  const [wordDescribeDetail, setWordDescribeDetail] = useState<string>("");
  const [wordTypeId, setWordTypeId] = useState<string>("");

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !wordDescribeDetail || !wordTypeId) return;

    const base64 = await toBase64(file as File);
    setBase64(base64 as string);

    try {
      const response = await fetch("/uploadImage/api", {
        method: "POST",
        body: JSON.stringify({ base64, wordDescribeDetail, wordTypeId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to upload image");
        return;
      }

      console.log("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    setFile(null);
    setBase64(null);
    setWordDescribeDetail("");
    setWordTypeId("");
  };

  return (
    <>
      <h1>Upload Image</h1>
      <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={onFileChange}
          onClick={onClick}
        />
        <input
          type="text"
          placeholder="Word Describe Detail"
          value={wordDescribeDetail}
          onChange={(e) => setWordDescribeDetail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Word Type ID"
          value={wordTypeId}
          onChange={(e) => setWordTypeId(e.target.value)}
        />
        <button type="submit">Upload</button>
      </form>
      {base64 && (
        <Image src={base64} width={300} height={400} alt="Uploaded Image" />
      )}
    </>
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

export default Upload;
