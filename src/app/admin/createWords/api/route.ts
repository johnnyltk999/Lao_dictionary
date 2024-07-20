// import { NextResponse, NextRequest } from "next/server";
// import { mysqlPool } from "../../../../../utils/db";

// export async function POST(request: NextRequest) {
//   try {
//     const { word_Name, word_Group, wordDescriptions } = await request.json();

//     // console.log("Received data:", {
//     //   word_Name,
//     //   word_Group,
//     //   wordDescriptions,
//     // });

//     if (
//       !word_Name ||
//       !word_Group ||
//       !wordDescriptions ||
//       !Array.isArray(wordDescriptions) ||
//       wordDescriptions.length === 0
//     ) {
//       return NextResponse.json(
//         {
//           message: "Word name, group, and descriptions are required",
//         },
//         { status: 400 }
//       );
//     }

//     // Insert into Word table
//     const [wordInsertResult] = await mysqlPool
//       .promise()
//       .query("INSERT INTO word (word_Name, word_Group) VALUES (?, ?)", [
//         word_Name,
//         word_Group,
//       ]);

//     const wordId = wordInsertResult.insertId;

//     for (const { detail, type } of wordDescriptions) {
//       // Get wordType_ID from Word_Type table
//       const [wordTypeResult] = await mysqlPool
//         .promise()
//         .query("SELECT WordType_ID FROM word_type WHERE WordType_Group = ?", [
//           type,
//         ]);

//       if (wordTypeResult.length === 0) {
//         throw new Error(`Word type group '${type}' not found`);
//       }

//       const wordTypeID = wordTypeResult[0].WordType_ID;

//       // Insert into worddescribe table
//       await mysqlPool
//         .promise()
//         .query(
//           "INSERT INTO worddescribe (wordDescribe_Detail, WordType_ID, Word_ID) VALUES (?, ?, ?)",
//           [detail, wordTypeID, wordId]
//         );
//     }

//     return NextResponse.json(
//       { message: "Word inserted successfully", wordId },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error inserting word:", error);

//     return NextResponse.json(
//       { message: "Error inserting data", error },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse, NextRequest } from "next/server";
import { mysqlPool } from "../../../../../utils/db";

export async function POST(request: NextRequest) {
  try {
    const { word_Name, word_Group, wordDescriptions } = await request.json();

    // console.log("Received data:", {
    //   word_Name,
    //   word_Group,
    //   wordDescriptions,
    // });

    if (
      !word_Name ||
      !word_Group ||
      !wordDescriptions ||
      !Array.isArray(wordDescriptions) ||
      wordDescriptions.length === 0
    ) {
      return NextResponse.json(
        {
          message: "Word name, group, and descriptions are required",
        },
        { status: 400 }
      );
    }

    // Insert into Word table
    const [wordInsertResult] = await mysqlPool
      .promise()
      .query("INSERT INTO word (word_Name, word_Group) VALUES (?, ?)", [
        word_Name,
        word_Group,
      ]);

    const wordId = wordInsertResult.insertId;

    for (const { detail, type, Image: base64 } of wordDescriptions) {
      // Get wordType_ID from Word_Type table
      const [wordTypeResult] = await mysqlPool
        .promise()
        .query("SELECT WordType_ID FROM word_type WHERE WordType_Group = ?", [
          type,
        ]);

      if (wordTypeResult.length === 0) {
        throw new Error(`Word type group '${type}' not found`);
      }

      const wordTypeID = wordTypeResult[0].WordType_ID;

      let buffer = null;
      if (base64) {
        buffer = Buffer.from(base64.split(",")[1], "base64");
      }

      // Insert into worddescribe table
      await mysqlPool
        .promise()
        .query(
          "INSERT INTO worddescribe (wordDescribe_Detail, WordType_ID, Word_ID, Image) VALUES (?, ?, ?, ?)",
          [detail, wordTypeID, wordId, buffer]
        );
    }

    // Log the update in wordupdate table
    await mysqlPool
      .promise()
      .query(
        "INSERT INTO wordupdate (update_date, update_detail, word_id, admin_id) VALUES (NOW(), 'ເພີ່ມຄຳສັບໃຫມ່', ?, 1)",
        [wordId]
      );

    return NextResponse.json(
      { message: "Word inserted successfully", wordId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error inserting word:", error);

    return NextResponse.json(
      { message: "Error inserting data", error },
      { status: 500 }
    );
  }
}
