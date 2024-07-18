"use client";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

interface FormData {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  password: string;
  address: string;
  department: string;
  userName: string;
}

const UserForm = () => {
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    department: "",
    userName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/admin/createUser/api",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Optionally, provide user feedback (e.g., show a success message)
      alert("User created successfully!");

      // Reset the form after successful submission
      setFormData({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        password: "",
        address: "",
        department: "",
        userName: "",
      });
    } catch (error) {
      console.error("Error submitting form", error);
      // Display error message to the user
      alert("Error creating user. Please try again later.");
    }
  };

  return (
    <>
      <div className="m-5">
        <a
          href="/admin/AdminList"
          className="flex text-orange-500 p-2 rounded-lg "
        >
          <IoIosArrowBack className="text-xl" /> ຍ້ອນກັບ
        </a>
        <h1 className="text-center text-3xl">ຟອມເພີ່ມຂໍ້ມູນແອັດມິນ</h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white p-8 shadow-md rounded-lg"
        >
          <div className="mb-4">
            <input
              type="text"
              name="first_name"
              placeholder="ຊື່"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="last_name"
              placeholder="ນາມສະກຸນ"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <input
              name="userName"
              placeholder="ຊື່ຜູ້ໃຊ້"
              value={formData.userName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="phone"
              placeholder="ເບີໂທລະສັບ"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="ອີເມລ"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <input
              name="password"
              placeholder="ລະຫັດຜ່ານ"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="address"
              placeholder="ທີ່ຢູ່"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="department"
              placeholder="ພະແນກ"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UserForm;
