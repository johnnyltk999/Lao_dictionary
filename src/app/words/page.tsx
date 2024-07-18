import React from "react";
import { getData } from "./data";

async function Page({ params }: { params: { id: string } }) {
  const data = await getData();
  console.log(data);

  return (
    <div className="flex flex-col mx-3 w-9/12">
      <p>
        ລາຍລະອຽດຄຳສັບ
      </p>
      <div className="container bg-primaryAccent rounded-sm">
        {data.length > 0 && (
          <div className="py-2">
            {params.id}
            <h1>{data[0].Word_Name}</h1>
            <p>ກຸ່ມ : {data[0].Word_Group}</p>
            <p>ຄວາມຫມາຍ : {data[0].WordDescribe_Detail || "ບໍ່ມີຂໍ້ມູນ"}</p>
            <p>ປະເພດຄຳ : {data[0].WordType_Group}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
