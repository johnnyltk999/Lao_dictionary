import { NextRequest, NextResponse } from "next/server";
import { mysqlPool } from "../../../../../../utils/db";

export async function DELETE(req: NextRequest, { params }: any) {
  const { id } = params;
  // const { wordDescribeId } = await req.json(); // Parse the request body to get wordDescribeId

  // console.log("DELETE request received with params:", { id });

  try {
    // Delete the word description by its ID and Word_ID
    const [result] = await mysqlPool
      .promise()
      .query("DELETE FROM worddescribe WHERE ID = ?", [id]);

    // console.log("MySQL DELETE result:", result);

    return NextResponse.json(
      { message: "Word description deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting word description:", error);
    return NextResponse.json(
      { message: "Failed to delete word description", error },
      { status: 500 }
    );
  }
}
