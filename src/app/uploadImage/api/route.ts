import { NextRequest, NextResponse } from "next/server";
import { mysqlPool } from "../../../../utils/db";

export async function POST(req: NextRequest) {
  try {
    const { base64, wordDescribeDetail, wordTypeId } = await req.json();

    if (!base64 || !wordDescribeDetail || !wordTypeId) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Convert base64 to binary
    const buffer = Buffer.from(base64.split(",")[1], "base64");

    // Insert the new worddescribe entry into the table
    const [result] = await mysqlPool
      .promise()
      .query(
        "INSERT INTO worddescribe (wordDescribe_Detail, WordType_ID, Image, Word_ID) VALUES (?, ?, ?,1)",
        [wordDescribeDetail, wordTypeId, buffer]
      );

    return NextResponse.json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
