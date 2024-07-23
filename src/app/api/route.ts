import { NextResponse, NextRequest } from "next/server";
import { mysqlPool } from "../../../utils/db";

export async function GET(req: NextRequest) {
  try {
    const promissPool = mysqlPool.promise();
    const [rows] = await promissPool.execute(
      // `SELECT * FROM word AS w
      //  LEFT JOIN worddescribe AS wd ON (w.Word_ID = wd.Word_ID)
      //  JOIN word_type AS wt ON (wd.WordType_ID = wt.WordType_ID) order by w.Word_group, word_Name`
      `SELECT * FROM  word `
    );

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
