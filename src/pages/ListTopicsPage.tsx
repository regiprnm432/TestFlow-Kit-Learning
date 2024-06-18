import { useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCloudUploadAlt,
  FaCloudDownloadAlt,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";
import Sidebar from "../components/custom/Sidebar";
import Pagination from "@/components/custom/Pagination";

// Interface for topic object
interface Topic {
  id: number;
  name: string;
  description: string;
  moduleCount: number;
  status: "P" | "D";
  studentAccess: number | string;
}

// Array of topics
const initialTopics: Topic[] = [
  {
    id: 1,
    name: "Unit Test 2023",
    description: "Pembuatan Test Case Sedang",
    moduleCount: 10,
    status: "P",
    studentAccess: 50,
  },
  {
    id: 2,
    name: "Unit Test 2023",
    description: "Pembuatan Test Case Sulit",
    moduleCount: 5,
    status: "P",
    studentAccess: 0,
  },
  {
    id: 3,
    name: "Unit Test 2024",
    description: "Pembuatan Test Case Sulit",
    moduleCount: 20,
    status: "P",
    studentAccess: 5,
  },
  {
    id: 4,
    name: "Unit Test 2024",
    description: "Pembuatan Test Case Sedang",
    moduleCount: 18,
    status: "D",
    studentAccess: "-",
  },
  {
    id: 5,
    name: "Unit Test 2024",
    description: "Pembuatan Test Case Pemula",
    moduleCount: 4,
    status: "D",
    studentAccess: "-",
  },
  {
    id: 6,
    name: "Unit Test 2023",
    description: "Pembuatan Test Case Sedang",
    moduleCount: 10,
    status: "P",
    studentAccess: 50,
  },
  {
    id: 7,
    name: "Unit Test 2023",
    description: "Pembuatan Test Case Sulit",
    moduleCount: 5,
    status: "P",
    studentAccess: 0,
  },
  {
    id: 8,
    name: "Unit Test 2024",
    description: "Pembuatan Test Case Sulit",
    moduleCount: 20,
    status: "P",
    studentAccess: 5,
  },
  {
    id: 9,
    name: "Unit Test 2024",
    description: "Pembuatan Test Case Sedang",
    moduleCount: 18,
    status: "D",
    studentAccess: "-",
  },
  {
    id: 10,
    name: "Unit Test 2024",
    description: "Pembuatan Test Case Pemula",
    moduleCount: 4,
    status: "D",
    studentAccess: "-",
  },
];

// Function to get status style based on status
const getStatusStyle = (status: "P" | "D"): string => {
  switch (status) {
    case "P":
      return "bg-green-100 text-green-600";
    case "D":
      return "bg-yellow-100 text-yellow-600";
    default:
      return "";
  }
};

// Function to get status label based on status code
const getStatusLabel = (status: "P" | "D"): string => {
  switch (status) {
    case "P":
      return "Published";
    case "D":
      return "Draft";
    default:
      return "";
  }
};

const ListTopicsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Jumlah item per halaman
  const totalPages = Math.ceil(initialTopics.length / itemsPerPage);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Topic>("moduleCount");
  const [topics, setTopics] = useState(initialTopics);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [topicToDelete, setTopicToDelete] = useState<number | null>(null);
  const [deleteMessage, setDeleteMessage] = useState(""); // State for delete message

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fungsi untuk mengubah halaman
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Sorting logic
  const handleRequestSort = (property: keyof Topic) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const getComparator = (
    order: "asc" | "desc",
    orderBy: keyof Topic
  ): ((a: Topic, b: Topic) => number) => {
    return order === "desc"
      ? (a, b) => (b[orderBy] > a[orderBy] ? 1 : -1)
      : (a, b) => (a[orderBy] > b[orderBy] ? 1 : -1);
  };

  // Filter topics based on search query
  const filteredTopics = topics.filter(
    (topic) =>
      topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getStatusLabel(topic.status).toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Memfilter data berdasarkan halaman saat ini setelah pencarian
  const indexOfLastFilteredItem = currentPage * itemsPerPage;
  const indexOfFirstFilteredItem = indexOfLastFilteredItem - itemsPerPage;
  const currentFilteredItems = filteredTopics
    .slice(indexOfFirstFilteredItem, indexOfLastFilteredItem)
    .sort(getComparator(order, orderBy));

  // Convert studentAccess to number for comparison
  const parseStudentAccess = (access: number | string) => {
    if (typeof access === "number") {
      return access;
    } else if (typeof access === "string" && access === "-") {
      return 0;
    } else {
      return parseInt(access);
    }
  };

  const handleTogglePublish = (id: number) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === id
          ? {
              ...topic,
              status: topic.status === "D" ? "P" : "D",
              studentAccess:
                topic.status === "D"
                  ? parseStudentAccess(topic.studentAccess)
                  : "-",
            }
          : topic
      )
    );
  };

  const handleDelete = (id: number) => {
    setShowConfirmation(true);
    setTopicToDelete(id);
  };

  const confirmDelete = () => {
    if (topicToDelete !== null) {
      setTopics((prevTopics) =>
        prevTopics.filter((topic) => topic.id !== topicToDelete)
      );
      setShowConfirmation(false);
      setDeleteMessage("Topik berhasil dihapus");
      setTopicToDelete(null);
      // Hide the delete message after 3 seconds
      setTimeout(() => setDeleteMessage(""), 3000);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setTopicToDelete(null);
  };

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
              Kelola Data Topik Pengujian
            </h1>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div className="relative w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="Search or type"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
                  className="w-full p-2 pl-10 border border-gray-300 rounded-md"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button
                className="flex items-center bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700"
                style={{ fontSize: "14px" }}
              >
                <FaPlus className="mr-2" />
                Tambah Topik Pengujian
              </button>
            </div>
          </div>
        </div>
        <div className="min-h-screen p-4 md:p-6">
          <div className="bg-white shadow-md rounded-lg overflow-x-auto">
            {filteredTopics.length === 0 ? (
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
                      <th className="py-3 px-6 text-left border-b border-r">
                        Nama Topik
                      </th>
                      <th className="py-3 px-6 text-left border-b border-r">
                        Deskripsi
                      </th>
                      <th
                        className="py-3 px-6 text-left border-b border-r cursor-pointer flex items-center"
                        onClick={() => handleRequestSort("moduleCount")}
                      >
                        Jumlah Modul Program
                        {orderBy === "moduleCount" ? (
                          order === "asc" ? (
                            <FaSortUp className="ml-2" />
                          ) : (
                            <FaSortDown className="ml-2" />
                          )
                        ) : (
                          <FaSortDown className="ml-2 text-gray-400" />
                        )}
                      </th>
                      <th className="py-3 px-6 text-left border-b border-r">
                        Status Tayang
                      </th>
                      <th
                        className="py-3 px-6 text-left border-b border-r cursor-pointer flex items-center"
                        onClick={() => handleRequestSort("studentAccess")}
                      >
                        Jumlah Mahasiswa Mengakses
                        {orderBy === "studentAccess" ? (
                          order === "asc" ? (
                            <FaSortUp className="ml-2" />
                          ) : (
                            <FaSortDown className="ml-2" />
                          )
                        ) : (
                          <FaSortDown className="ml-2 text-gray-400" />
                        )}
                      </th>
                      <th className="py-3 px-6 text-left border-b">Action</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: "14px" }}>
                    {currentFilteredItems.map((topic, index) => (
                      <tr
                        key={topic.id} // Gunakan id sebagai key
                        className={`border-b ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="py-3 px-6 border-r">{topic.name}</td>
                        <td className="py-3 px-6 border-r">
                          {topic.description}
                        </td>
                        <td className="py-3 px-6 border-r">
                          {topic.moduleCount}
                        </td>
                        <td className="py-3 px-6 border-r">
                          <span
                            className={`px-2 py-1 rounded ${getStatusStyle(
                              topic.status
                            )}`}
                          >
                            {getStatusLabel(topic.status)}
                          </span>
                        </td>
                        <td className="py-3 px-6 border-r">
                          {topic.studentAccess}
                        </td>
                        <td className="py-3 px-6 flex items-center space-x-2">
                          <FaEdit
                            className={`cursor-pointer ${
                              topic.status === "P"
                                ? "text-gray-300 cursor-not-allowed"
                                : "text-blue-500"
                            }`}
                          />
                          <FaTrash
                            className={`cursor-pointer ${
                              topic.status === "P"
                                ? "text-gray-300 cursor-not-allowed"
                                : "text-red-500"
                            }`}
                            onClick={() =>
                              topic.status !== "P" && handleDelete(topic.id)
                            } // Gunakan id untuk delete
                          />
                          {topic.status === "D" ? (
                            <FaCloudUploadAlt
                              className="cursor-pointer text-green-500"
                              onClick={() => handleTogglePublish(topic.id)} // Gunakan id untuk publish
                            />
                          ) : topic.status === "P" &&
                            parseStudentAccess(topic.studentAccess) === 0 ? (
                            <FaCloudDownloadAlt
                              className="cursor-pointer text-gray-500"
                              onClick={() => handleTogglePublish(topic.id)}
                            />
                          ) : (
                            <FaCloudDownloadAlt className="cursor-not-allowed text-gray-300" />
                          )}
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

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Konfirmasi Hapus</h2>
            <p className="mb-4">Apakah Anda yakin ingin menghapus topik ini?</p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600"
                onClick={confirmDelete}
              >
                Hapus
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                onClick={cancelDelete}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          {deleteMessage}
        </div>
      )}
    </div>
  );
};

export default ListTopicsPage;
