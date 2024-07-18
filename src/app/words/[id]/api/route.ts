import { NextResponse } from "next/server";
import { mysqlPool } from "../../../../../utils/db";

export async function GET(req: any, { params }: any) {
  const id = params.id;
  const promissPool = mysqlPool.promise();
  // const likePattern = `${id}%`;
  const [rows] = await promissPool.query(
    // `
    //   SELECT *
    //   FROM word AS w
    //   LEFT JOIN worddescribe AS wd ON w.Word_ID = wd.Word_ID
    //   JOIN word_type AS wt ON wd.WordType_ID = wt.WordType_ID
    //   WHERE w.Word_Group = ? AND w.Word_Name LIKE ?
    //   ORDER BY w.Word_Group, w.Word_Name
    // `,
    `SELECT * FROM word where Word_Group = ? ORDER BY Word_Group, Word_Name`,

    // [id, likePattern]
    [id]
  );

  return NextResponse.json(rows);
}
