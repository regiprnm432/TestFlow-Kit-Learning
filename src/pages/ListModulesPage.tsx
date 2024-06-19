import React, { useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import Sidebar from "../components/custom/Sidebar";
import Pagination from "@/components/custom/Pagination";
import ModulesTable from "../components/custom/ModuleTable";
import ConfirmationModal from "../components/custom/ConfirmationModal";

// Interface for module object
export interface Module {
  id: number;
  name: string;
  type: string;
  difficulty: number; // 1: Sangat Mudah, 2: Mudah, 3: Sedang, 4: Sulit
}

// Array of modules
const initialModules: Module[] = [
  { id: 1, name: "Pengurangan", type: "Fungsi", difficulty: 1 },
  { id: 2, name: "Penambahan", type: "Fungsi", difficulty: 2 },
  { id: 3, name: "Perkalian", type: "Fungsi", difficulty: 3 },
  { id: 4, name: "Pembagian", type: "Fungsi", difficulty: 4 },
  { id: 5, name: "Pengurangan", type: "Fungsi", difficulty: 1 },
  { id: 6, name: "Penambahan", type: "Fungsi", difficulty: 2 },
  { id: 7, name: "Perkalian", type: "Fungsi", difficulty: 3 },
  { id: 8, name: "Pembagian", type: "Fungsi", difficulty: 4 },
  { id: 9, name: "Pengurangan", type: "Fungsi", difficulty: 1 },
  { id: 10, name: "Penambahan", type: "Fungsi", difficulty: 2 },
  { id: 11, name: "Perkalian", type: "Fungsi", difficulty: 3 },
];

const ListModulesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page
  const [modules, setModules] = useState(initialModules);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState<Module | null>(null);
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);

  const totalPages = Math.ceil(modules.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDelete = (id: number) => {
    setModules((prevModules) => prevModules.filter((module) => module.id !== id));
    setDeleteMessage("Modul berhasil dihapus.");
    closeModal();
    setTimeout(() => setDeleteMessage(null), 2000);
  };

  const openModal = (module: Module) => {
    setModuleToDelete(module);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModuleToDelete(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  const filteredModules = modules.filter(
    (module) =>
      module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getDifficultyString(module.difficulty)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredModules.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex flex-col lg:flex-row w-screen lg:w-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 ${isSidebarOpen ? "ml-64" : "ml-20"} transition-all duration-300`}>
        <div className="w-full bg-white p-4 shadow mb-6">
          <div className="max-w-screen-xl mx-auto">
            <h1 className="text-2xl font-bold text-blue-800 mb-6 mt-4">
              Kelola Data Modul Program
            </h1>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div className="relative w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="Search or type"
                  className="w-full p-2 pl-10 border border-gray-300 rounded-md"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button
                className="mr-6 flex items-center bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700"
                style={{ fontSize: "14px" }}
              >
                <FaPlus className="mr-2" />
                Tambah Modul Program
              </button>
            </div>
          </div>
        </div>
        <div className="min-h-screen p-4 md:p-6">
          <div className="bg-white shadow-md rounded-lg overflow-x-auto">
            {deleteMessage && (
              <div className="p-4 mb-4 text-green-500 bg-green-100 rounded-md">
                {deleteMessage}
              </div>
            )}
            {filteredModules.length === 0 ? (
              <div className="p-4 text-center text-red-500">
                Data tidak ditemukan
              </div>
            ) : (
              <>
                <ModulesTable modules={currentItems} onDelete={openModal} />
                <div className="flex justify-center items-center py-4" style={{ fontSize: "14px" }}>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && moduleToDelete && (
        <ConfirmationModal
          message="Apakah kamu benar-benar ingin menghapus modul ini? Modul akan dihapus secara permanen."
          onConfirm={() => handleDelete(moduleToDelete.id)}
          onCancel={closeModal}
        />
      )}
    </div>
  );
};

const getDifficultyString = (difficulty: number): string => {
  switch (difficulty) {
    case 1:
      return "Sangat Mudah";
    case 2:
      return "Mudah";
    case 3:
      return "Sedang";
    case 4:
      return "Sulit";
    default:
      return "";
  }
};

export default ListModulesPage;
