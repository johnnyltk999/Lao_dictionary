import { NextResponse } from "next/server";
import { mysqlPool } from "../../../../../../utils/db";

export async function DELETE(req: any, { params }: any) {
  const id = params.id;
  const promissPool = mysqlPool.promise();
  let connection;

  try {
    connection = await promissPool.getConnection();

    try {
      await connection.beginTransaction();

      // Delete from Worddescribe table
      const [result1] = await connection.execute(
        `DELETE FROM Worddescribe WHERE word_id = ?`,
        [id]
      );

      // Delete from Word table
      const [result2] = await connection.execute(
        `DELETE FROM Word WHERE word_id = ?`,
        [id]
      );

      await connection.commit();

      if (result2.affectedRows === 0) {
        return NextResponse.json({ error: "Word not found" }, { status: 404 });
      }

      return NextResponse.json(
        { message: "Word deleted successfully" },
        { status: 200 }
      );
    } catch (error) {
      await connection.rollback();
      console.error("Error deleting word:", error);
      return NextResponse.json(
        { error: "Failed to delete word" },
        { status: 500 }
      );
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error getting database connection:", error);
    return NextResponse.json(
      { error: "Failed to connect to database" },
      { status: 500 }
    );
  }
}
