import React, { useState } from "react";
import Sidebar from "../components/custom/SidebarStudent";
import "../index.css"

const DashboardPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Dummy account
  const accountName = "Dea Salma Isnaini";

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 flex items-center justify-center ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <h1 className="text-7xl font-bold text-blue-800 ml-20 justify-center animate-fade-in">
          Selamat Datang <br />{accountName} 
        </h1>
      </div>
    </div>
  );
};

export default DashboardPage;
