import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { mysqlPool } from "../../../../../utils/db";

export async function POST(request: NextRequest) {
  const {
    first_name,
    last_name,
    phone,
    email,
    password,
    address,
    department,
    userName,
  } = await request.json();

  if (!first_name || !email || !password || !userName) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const [rows] = await mysqlPool
      .promise()
      .query(
        "INSERT INTO users (first_name, last_name, phone, email, password, address, department, username) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          first_name,
          last_name,
          phone,
          email,
          password,
          address,
          department,
          userName,
        ]
      );

    return NextResponse.json(
      { message: "User created successfully", rows },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    // Handle error and return JSON response
    return NextResponse.json(
      { message: "Error inserting data", error },
      { status: 500 }
    );
  }
}
