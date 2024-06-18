import { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import Sidebar from "../components/custom/Sidebar";
import Pagination from "@/components/custom/Pagination";

// Interface for module object
interface Module {
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

// Confirmation Modal Component
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded shadow-lg z-10 max-w-md w-full">
        <h2 className="text-xl mb-4">Apakah Kamu Yakin?</h2>
        <p className="mb-4">
          Apakah kamu benar-benar ingin menghapus modul ini? Modul akan dihapus
          secara permanen.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

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
    setModules((prevModules) =>
      prevModules.filter((module) => module.id !== id)
    );
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
      <div
        className={`flex-1 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        } transition-all duration-300`}
      >
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
                <table className="min-w-full">
                  <thead
                    className="bg-blue-800 text-white"
                    style={{ fontSize: "14px" }}
                  >
                    <tr>
                      <th className="py-3 px-2 md:px-6 text-left border-b border-r">
                        Nama Modul
                      </th>
                      <th className="py-3 px-2 md:px-6 text-left border-b border-r">
                        Jenis Modul
                      </th>
                      <th className="py-3 px-2 md:px-6 text-left border-b border-r">
                        Tingkat Kesulitan
                      </th>
                      <th className="py-3 px-2 md:px-6 text-left border-b">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: "14px" }}>
                    {currentItems.map((module, index) => (
                      <tr
                        key={module.id}
                        className={`border-b ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="py-3 px-2 md:px-6 border-r">
                          {module.name}
                        </td>
                        <td className="py-3 px-2 md:px-6 border-r">
                          {module.type}
                        </td>
                        <td className="py-3 px-2 md:px-6 border-r">
                          <span
                            className={`px-2 py-1 rounded ${
                              module.difficulty === 1
                                ? "bg-blue-100 text-blue-600"
                                : module.difficulty === 2
                                ? "bg-green-100 text-green-600"
                                : module.difficulty === 3
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {getDifficultyString(module.difficulty)}
                          </span>
                        </td>
                        <td className="py-3 px-2 md:px-6 flex items-center space-x-2">
                          <FaEdit className="cursor-pointer text-blue-500" />
                          <FaTrash
                            className="cursor-pointer text-red-500"
                            onClick={() => openModal(module)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div
                  className="flex justify-center items-center py-4"
                  style={{ fontSize: "14px" }}
                >
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
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={() => handleDelete(moduleToDelete!.id)}
      />
    </div>
  );
};

export default ListModulesPage;
