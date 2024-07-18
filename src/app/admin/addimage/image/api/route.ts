import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { mysqlPool } from "../../../../../../utils/db";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false, error: "No file uploaded" });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = `./download/${file.name}`; // Adjust path as needed
  await writeFile(path, buffer);

  try {
    const insertQuery =
      "INSERT INTO wordDescribe (wordDescribe_Detail, WordType_ID, Word_ID, Image) VALUES (?, ?, ?, ?)";
    const [result] = await mysqlPool
      .promise()
      .query(insertQuery, [data.get("description"), 2, 13, path]);
    console.log("File metadata inserted into database:", result);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error inserting file metadata:", error);
    return NextResponse.json({ success: false, error: "Database error" });
  }
}
