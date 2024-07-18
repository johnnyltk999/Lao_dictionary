import { NextResponse, NextRequest } from "next/server";
import { mysqlPool } from "../../../../../utils/db";

export async function GET(req: NextRequest) {
  try {
    const promissPool = mysqlPool.promise();
    const [rows] = await promissPool.execute(`SELECT * FROM  users `);

    const response = NextResponse.json(rows);
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
