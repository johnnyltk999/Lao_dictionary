// import { NextResponse, NextRequest } from "next/server";
// import { mysqlPool } from "../../../../utils/db";

// export async function GET(req: NextRequest) {
//   try {
//     const promissPool = mysqlPool.promise();
//     const [rows] = await promissPool.execute(`SELECT * FROM  users `);

//     const response = NextResponse.json(rows);
//     response.headers.set("Cache-Control", "no-store");
//     return response;
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse, NextRequest } from "next/server";
import { mysqlPool } from "../../../../../utils/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { username, password, expiresIn = 60000 } = await req.json();

    console.log("Received request with:", { username, password });

    if (!username || !password) {
      console.log("Missing username and/or password");
      return NextResponse.json(
        { status: "error", message: "Missing username and/or password" },
        { status: 400 }
      );
    }

    const promissPool = mysqlPool.promise();
    const [rows] = await promissPool.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    console.log("Fetched rows:", rows);

    if (rows.length === 0) {
      console.log("No user found with username:", username);
      return NextResponse.json(
        { status: "error", message: "Login failed" },
        { status: 401 }
      );
    }

    const user = rows[0];
    console.log("User:", user.password + " = " + password);
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    console.log("Password comparison result:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Password invalid for user:", username);
      return NextResponse.json(
        { status: "error", message: "Login failed" },
        { status: 401 }
      );
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined");
      throw new Error("JWT_SECRET is not defined");
    }

    console.log("Signing JWT with secret:", process.env.JWT_SECRET);

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn,
    });

    console.log("JWT Token generated:", token);

    return NextResponse.json({
      status: "ok",
      message: "Logged in",
      accessToken: token,
      expiresIn,
      user: {
        id: user.id,
        first_Name: user.first_Name,
        last_name: user.last_name,
        phone: user.phone,
        username: user.username,
        email: user.email,
        address: user.address,
        department: user.department,
      },
    });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
