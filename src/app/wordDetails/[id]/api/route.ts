import { NextResponse } from "next/server";
import { mysqlPool } from "../../../../../utils/db";

export async function GET(req: any, { params }: any) {
  try {
    const id = params.id;
    const promissPool = mysqlPool.promise();
    const [rows] = await promissPool.execute(
      `
        SELECT w.Word_ID, w.Word_Name, w.Word_Group,
               wd.ID,WordDescribe_Detail, wd.Image,
               wt.WordType_ID, wt.WordType_Group
        FROM word AS w
        LEFT JOIN worddescribe AS wd ON w.Word_ID = wd.Word_ID
        JOIN word_type AS wt ON wd.WordType_ID = wt.WordType_ID
        WHERE w.Word_ID = ?
      `,

      [id]
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
