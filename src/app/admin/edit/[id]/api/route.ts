import { NextResponse, NextRequest } from "next/server";
import { mysqlPool } from "../../../../../../utils/db";

interface WordDescription {
  detail: string;
  type: string;
  wordDescribeId?: number;
  Image?: string; // Make Image optional to allow entries without image
}

interface RequestBody {
  Word_ID: number;
  word_Name: string;
  word_Group: string;
  wordDescriptions: WordDescription[];
  Admin_ID: number;
}

export async function PUT(request: NextRequest) {
  try {
    const {
      Word_ID,
      word_Name,
      word_Group,
      wordDescriptions,
      Admin_ID,
    }: RequestBody = await request.json();
    console.log("Received data:", {
      Word_ID,
      word_Name,
      word_Group,
      wordDescriptions,
    });
    if (
      !Word_ID ||
      !word_Name ||
      !word_Group ||
      !Array.isArray(wordDescriptions)
    ) {
      return NextResponse.json(
        {
          message: "Word ID, name, group, and descriptions are required",
        },
        { status: 400 }
      );
    }

    // Update Word table
    await mysqlPool
      .promise()
      .query(
        "UPDATE word SET Word_Name = ?, Word_Group = ? WHERE Word_ID = ?",
        [word_Name, word_Group, Word_ID]
      );

    for (const {
      detail,
      type,
      wordDescribeId,
      Image: base64,
    } of wordDescriptions) {
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
      if (base64 && typeof base64 === "string") {
        const base64Parts = base64.split(",");
        if (base64Parts.length === 2) {
          buffer = Buffer.from(base64Parts[1], "base64");
        } else {
          throw new Error("Invalid base64 format");
        }
      }

      if (wordDescribeId) {
        if (buffer) {
          // Update existing worddescribe entry with image
          await mysqlPool
            .promise()
            .query(
              "UPDATE worddescribe SET wordDescribe_Detail = ?, WordType_ID = ?, Image = ? WHERE ID = ?",
              [detail, wordTypeID, buffer, wordDescribeId]
            );
          await mysqlPool
            .promise()
            .query(
              "INSERT INTO wordupdate (update_date, update_detail, word_id, admin_id) VALUES (NOW(), 'ເພີ່ມຮູບພາບຄຳອະທິບາຍ', ?, 1)",
              [Word_ID, Admin_ID]
            );
        } else {
          // Update existing worddescribe entry without image
          await mysqlPool
            .promise()
            .query(
              "UPDATE worddescribe SET wordDescribe_Detail = ?, WordType_ID = ? WHERE ID = ?",
              [detail, wordTypeID, wordDescribeId]
            );
          await mysqlPool
            .promise()
            .query(
              "INSERT INTO wordupdate (update_date, update_detail, word_id, admin_id) VALUES (NOW(), 'ແກ້ໄຂແລະເພີ່ມຄຳອະທິບາຍ', ?, 1)",
              [Word_ID, Admin_ID]
            );
        }
      } else {
        if (buffer) {
          // Insert new worddescribe entry with image
          await mysqlPool
            .promise()
            .query(
              "INSERT INTO worddescribe (wordDescribe_Detail, WordType_ID, Word_ID, Image) VALUES (?, ?, ?, ?)",
              [detail, wordTypeID, Word_ID, buffer]
            );
        } else {
          // Insert new worddescribe entry without image
          await mysqlPool
            .promise()
            .query(
              "INSERT INTO worddescribe (wordDescribe_Detail, WordType_ID, Word_ID) VALUES (?, ?, ?)",
              [detail, wordTypeID, Word_ID]
            );

          // Log the update in wordupdate table
          await mysqlPool
            .promise()
            .query(
              "INSERT INTO wordupdate (update_date, update_detail, word_id, admin_id) VALUES (NOW(), 'ເພີ່ມຄຳອະທິບາຍ', ?, 1)",
              [Word_ID, Admin_ID]
            );
        }
      }
    }

    // Log the update in wordupdate table
    // await mysqlPool
    //   .promise()
    //   .query(
    //     "INSERT INTO wordupdate (update_date, update_detail, word_id, admin_id) VALUES (NOW(), 'ແກ້ໄຂຄຳສັບ', ?, 1)",
    //     [Word_ID, Admin_ID]
    //   );

    return NextResponse.json(
      { message: "Word updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating word:", error);
    return NextResponse.json(
      { message: "Error updating data", error },
      { status: 500 }
    );
  }
}

//old
// import { NextResponse, NextRequest } from "next/server";
// import { mysqlPool } from "../../../../../../utils/db";

// interface WordDescription {
//   detail: string;
//   type: string;
//   wordDescribeId?: number;
// }

// interface RequestBody {
//   Word_ID: number;
//   word_Name: string;
//   word_Group: string;
//   wordDescriptions: WordDescription[];
// }

// export async function PUT(request: NextRequest) {
//   try {
//     const { Word_ID, word_Name, word_Group, wordDescriptions }: RequestBody =
//       await request.json();

//     // console.log("Received data:", {
//     //   Word_ID,
//     //   word_Name,
//     //   word_Group,
//     //   wordDescriptions,
//     // });

//     if (
//       !Word_ID ||
//       !word_Name ||
//       !word_Group ||
//       !Array.isArray(wordDescriptions)
//     ) {
//       return NextResponse.json(
//         {
//           message: "Word ID, name, group, and descriptions are required",
//         },
//         { status: 400 }
//       );
//     }

//     // Update Word table
//     await mysqlPool
//       .promise()
//       .query(
//         "UPDATE word SET word_Name = ?, word_Group = ? WHERE Word_ID = ?",
//         [word_Name, word_Group, Word_ID]
//       );

//     for (const { detail, type, wordDescribeId } of wordDescriptions) {
//       // console.log(detail, type, wordDescribeId);
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
//       if (wordDescribeId) {
//         // Update existing worddescribe entry
//         await mysqlPool
//           .promise()
//           .query(
//             "UPDATE worddescribe SET wordDescribe_Detail = ?, WordType_ID = ? WHERE ID = ?",
//             [detail, wordTypeID, wordDescribeId]
//           );
//       } else {
//         // Insert new worddescribe entry
//         await mysqlPool
//           .promise()
//           .query(
//             "INSERT INTO worddescribe (wordDescribe_Detail, WordType_ID, Word_ID) VALUES (?, ?, ?)",
//             [detail, wordTypeID, Word_ID]
//           );
//       }
//     }

//     return NextResponse.json(
//       { message: "Word updated successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error updating word:", error);
//     return NextResponse.json(
//       { message: "Error updating data", error },
//       { status: 500 }
//     );
//   }
// }
