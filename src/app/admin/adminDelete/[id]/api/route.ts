import { NextResponse } from "next/server";
import { mysqlPool } from "../../../../../../utils/db";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params; // Ensure id is destructured properly
  const promisePool = mysqlPool.promise();
  let connection;

  try {
    connection = await promisePool.getConnection();

    try {
      await connection.beginTransaction();

      // Delete from wordadmin table
      await connection.execute(`DELETE FROM wordadmin WHERE Admin_ID = ?`, [
        id,
      ]);

      await connection.commit();
      return NextResponse.json(
        { message: "User deleted successfully" },
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
