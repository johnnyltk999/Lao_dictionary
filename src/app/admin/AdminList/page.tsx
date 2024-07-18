"use client";
import React, { useState, useEffect } from "react";
import { getData } from "./data";

//icon
import { FaUserPlus, FaTrash } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

interface User {
  Admin_ID: number;
  first_Name: string;
  last_name: string;
  email: string;
  password: string;
  address: string;
  department: string;
  username: string;
}

export default function AdminList() {
  const [users, setUsers] = useState<User[]>([]);

  const handleDelete = async (Admin_ID: number, first_Name: string) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this user :  ${first_Name} ? `
    );
    if (!confirmDelete) {
      return; // User canceled the deletion
    }
    try {
      // console.log("Deleting user with Admin_ID:", Admin_ID); // Debugging log
      const response = await fetch(`/admin/adminDelete/${Admin_ID}/api`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      const result = await response.json();
      alert(result.message);
      // Remove the deleted user from the state (optimized)
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.Admin_ID !== Admin_ID)
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: User[] = await getData();
        setUsers(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <a href="/admin" className="flex p-2  text-orange-500 rounded-lg">
          <IoIosArrowBack className="text-xl" /> ຍ້ອນກັບ
        </a>
        <a
          href="/admin/createUser"
          className="p-2 bg-green-500 rounded-lg text-white"
        >
          <span className="flex">
            <FaUserPlus className="text-2xl" />
            ເພີ່ມແອັດມິນ
          </span>
        </a>
      </div>
      <h1 className="text-2xl font-bold m-4">ລາຍຊື່ແອັດມິນ</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              {/* <th className="py-2 px-4 border-b border-gray-200 bg-gray-300">
                ໄອດີ ແອັດມິນ
              </th> */}
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-300">
                ຊື່
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-300">
                ນາມສະກຸນ
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-300">
                ຊື່ຜູ້ໃຊ້
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-300">
                ອີເມລ
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-300">
                ພະແນກ
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-300">
                ທີ່ຢູ່
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.Admin_ID}>
                {/* <td className="py-2 px-4 border-b border-gray-200">
                  {user.Admin_ID}
                </td> */}
                <td className="py-2 px-4 border-b border-gray-200">
                  {user.first_Name}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {user.last_name}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {user.username}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {user.email}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {user.department}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {user.address}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <button
                    onClick={() => {
                      // console.log(
                      //   "Deleting user with Admin_ID:",
                      //   user.Admin_ID
                      // );
                      handleDelete(user.Admin_ID, user.first_Name);
                    }}
                    className="p-2 bg-red-500 text-white rounded-lg"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
