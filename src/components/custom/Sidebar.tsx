import React, { useState } from "react";
import {
  FaUserPlus,
  FaTachometerAlt,
  FaBook,
  FaClipboard,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaDatabase,
  FaAngleLeft,
  FaAngleRight,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo_polban from "../../assets/logo/polban.png";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState<string>("");

  const handleLogout = () => {
    // Clear user session (this can vary depending on how you handle authentication)
    localStorage.removeItem('session'); // Example for token stored in localStorage
    // Redirect to login page
    navigate("/login");
  };

  const handleItemClick = (path: string) => {
    setActiveItem(path);
    navigate(path);
  };

  return (
    <div
      className={`h-screen bg-blue-800 text-white p-4 transition-width duration-300 ${
        isOpen ? "w-64" : "w-20"
      } fixed z-10 flex flex-col justify-between`}
    >
      <div>
        <div className="flex items-center mb-4">
          <img
            src={logo_polban}
            alt="Polban Logo"
            className="w-12 h-12 rounded-full transition-all duration-300"
          />
          {isOpen && <div className="ml-2 text-xl font-bold">Coverage Test</div>}
        </div>
        <nav className="flex flex-col items-start w-full mt-10">
          <ul className="w-full">
            <li
              className={`flex items-center mb-4 cursor-pointer p-2 rounded ${
                activeItem === "/dashboard-teacher"
                  ? "bg-white text-blue-800"
                  : "hover:bg-white hover:text-blue-800"
              }`}
              onClick={() => handleItemClick("/dashboard-teacher")}
            >
              <FaTachometerAlt size={16} />
              {isOpen && <span className="ml-2">Dashboard</span>}
            </li>
            <li
              className={`flex items-center mb-4 cursor-pointer p-2 rounded ${
                activeItem === "/list-module"
                  ? "bg-white text-blue-800"
                  : "hover:bg-white hover:text-blue-800"
              }`}
              onClick={() => handleItemClick("/list-module")}
            >
              <FaBook size={16} />
              {isOpen && <span className="ml-2">Modul Program</span>}
            </li>
            <li
              className={`flex items-center mb-4 cursor-pointer p-2 rounded ${
                activeItem === "/list-topics"
                  ? "bg-white text-blue-800"
                  : "hover:bg-white hover:text-blue-800"
              }`}
              onClick={() => handleItemClick("/list-topics")}
            >
              <FaClipboard size={16} />
              {isOpen && <span className="ml-2">Topik Pengujian</span>}
            </li>
            <li
              className={`flex items-center mb-4 cursor-pointer p-2 rounded ${
                activeItem === "/grade"
                  ? "bg-white text-blue-800"
                  : "hover:bg-white hover:text-blue-800"
              }`}
              onClick={() => handleItemClick("/grade")}
            >
              <FaUserGraduate size={16} />
              {isOpen && <span className="ml-2">Grade Siswa</span>}
            </li>
            <li
              className={`flex items-center mb-4 cursor-pointer p-2 rounded ${
                activeItem === "/materi"
                  ? "bg-white text-blue-800"
                  : "hover:bg-white hover:text-blue-800"
              }`}
              onClick={() => handleItemClick("/materi")}
            >
              <FaChalkboardTeacher size={16} />
              {isOpen && <span className="ml-2">Materi Belajar</span>}
            </li>
            <li
              className={`flex items-center mb-4 cursor-pointer p-2 rounded ${
                activeItem === "/data-mahasiswa"
                  ? "bg-white text-blue-800"
                  : "hover:bg-white hover:text-blue-800"
              }`}
              onClick={() => handleItemClick("/data-mahasiswa")}
            >
              <FaDatabase size={16} />
              {isOpen && <span className="ml-2">Kelola Data Mahasiswa</span>}
            </li>
          </ul>
          <div className="w-full h-px bg-white mt-4"></div> 
        </nav>
        <div
          className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 bg-white text-blue-900 rounded-full p-1 cursor-pointer"
          onClick={toggleSidebar}
        >
          {isOpen ? <FaAngleLeft size={14} /> : <FaAngleRight size={14} />}
        </div>
      </div>
      {isOpen && (
        <div className="p-4 w-full">
          <button className="w-full bg-white text-blue-800 hover:bg-blue-600 hover:text-white p-2 rounded flex items-center justify-center mb-2">
            <FaUserPlus className="mr-2" />
            <span style={{ fontSize: "14px" }}>Tambahkan Mahasiswa</span>
          </button>
          <button
            className="w-full bg-white text-blue-800 hover:bg-red-600 hover:text-white p-2 rounded flex items-center justify-center"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-2" />
            <span style={{ fontSize: "14px" }}>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
