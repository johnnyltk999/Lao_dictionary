// import { NextRequest, NextResponse } from "next/server";
// import { mysqlPool } from "../../../../../../utils/db";

// export async function DELETE(req: NextRequest, { params }: any) {
//   const { id } = params;
//   // const { wordDescribeId } = await req.json(); // Parse the request body to get wordDescribeId

//   // console.log("DELETE request received with params:", { id });

//   try {
//     // Delete the word description by its ID and Word_ID
//     const [result] = await mysqlPool
//       .promise()
//       .query("DELETE FROM worddescribe WHERE ID = ?", [id]);

//     // console.log("MySQL DELETE result:", result);

//     return NextResponse.json(
//       { message: "Word description deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error deleting word description:", error);
//     return NextResponse.json(
//       { message: "Failed to delete word description", error },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { mysqlPool } from "../../../../../../utils/db";

export async function DELETE(req: NextRequest, { params }: any) {
  const { id } = params;

  try {
    const promisePool = mysqlPool.promise();
    const connection = await promisePool.getConnection();

    try {
      await connection.beginTransaction();

      // Retrieve the word_id associated with the worddescribe entry
      const [wordDescribeResult] = await connection.execute(
        "SELECT Word_ID FROM worddescribe WHERE ID = ?",
        [id]
      );

      if (wordDescribeResult.length === 0) {
        return NextResponse.json(
          { message: "Word description not found" },
          { status: 404 }
        );
      }

      const wordId = wordDescribeResult[0].Word_ID;

      // Delete the word description by its ID
      await connection.execute("DELETE FROM worddescribe WHERE ID = ?", [id]);

      // Log the update in wordupdate table
      await connection.execute(
        "INSERT INTO wordupdate (update_date, update_detail, word_id, admin_id) VALUES (NOW(), 'ລົບຄຳອະທິບາຍ', ?, 1)",
        [wordId]
      );

      await connection.commit();

      return NextResponse.json(
        { message: "Word description deleted successfully" },
        { status: 200 }
      );
    } catch (error) {
      await connection.rollback();
      console.error("Error deleting word description:", error);
      return NextResponse.json(
        { message: "Failed to delete word description", error },
        { status: 500 }
      );
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error getting database connection:", error);
    return NextResponse.json(
      { message: "Failed to connect to database", error },
      { status: 500 }
    );
  }
}
