import React, { useState } from "react";
import { FaSearch, FaUpload} from "react-icons/fa";
import Pagination from "@/components/custom/Pagination";
import StudentTable from "../components/custom/StudentTable";
import ConfirmationModal from "../components/custom/ConfirmationModal";
import Sidebar from "@/components/custom/Sidebar";
import AddStudentDataForm from "@/components/custom/AddStudentDataForm";

interface Student {
  id: number;
  nim: string;
  name: string;
  class: string;
  program: string;
}

const initialStudents: Student[] = [
    {
      id: 1,
      nim: "16501006",
      name: "Asep Sunarya",
      class: "A",
      program: "D4 Teknik Informatika",
    },
    {
      id: 2,
      nim: "16501007",
      name: "Kinara Rengganis",
      class: "B",
      program: "D4 Teknik Informatika",
    },
    {
      id: 3,
      nim: "16501008",
      name: "Rizky Pratama",
      class: "A",
      program: "D4 Teknik Informatika",
    },
    {
      id: 4,
      nim: "16501009",
      name: "Siti Nurhaliza",
      class: "B",
      program: "D4 Teknik Informatika",
    },
    {
      id: 5,
      nim: "16501010",
      name: "Ahmad Fauzi",
      class: "C",
      program: "D4 Teknik Informatika",
    },
    {
      id: 6,
      nim: "16501011",
      name: "Dewi Sartika",
      class: "A",
      program: "D4 Teknik Informatika",
    },
    {
      id: 7,
      nim: "16501012",
      name: "Budi Setiawan",
      class: "B",
      program: "D4 Teknik Informatika",
    },
    {
      id: 8,
      nim: "16501013",
      name: "Tini Rahmawati",
      class: "C",
      program: "D4 Teknik Informatika",
    },
    {
      id: 9,
      nim: "16501014",
      name: "Andi Kurniawan",
      class: "A",
      program: "D4 Teknik Informatika",
    },
    {
      id: 10,
      nim: "16501015",
      name: "Sri Mulyani",
      class: "B",
      program: "D4 Teknik Informatika",
    },
    {
      id: 11,
      nim: "16501016",
      name: "Fajar Nugraha",
      class: "C",
      program: "D4 Teknik Informatika",
    },
    {
      id: 12,
      nim: "16501017",
      name: "Intan Permatasari",
      class: "A",
      program: "D4 Teknik Informatika",
    },
    {
      id: 13,
      nim: "16501018",
      name: "Eko Susanto",
      class: "B",
      program: "D4 Teknik Informatika",
    },
    {
      id: 14,
      nim: "16501019",
      name: "Lina Marlina",
      class: "C",
      program: "D4 Teknik Informatika",
    },
    {
      id: 15,
      nim: "16501020",
      name: "Gilang Ramadhan",
      class: "A",
      program: "D4 Teknik Informatika",
    },
    {
      id: 16,
      nim: "16501021",
      name: "Rina Andriani",
      class: "B",
      program: "D4 Teknik Informatika",
    },
    {
      id: 17,
      nim: "16501022",
      name: "Hendra Saputra",
      class: "C",
      program: "D4 Teknik Informatika",
    },
    {
      id: 18,
      nim: "16501023",
      name: "Putri Ayu",
      class: "A",
      program: "D4 Teknik Informatika",
    },
    {
      id: 19,
      nim: "16501024",
      name: "Agus Supriyadi",
      class: "B",
      program: "D4 Teknik Informatika",
    },
    {
      id: 20,
      nim: "16501025",
      name: "Nurul Hidayati",
      class: "C",
      program: "D4 Teknik Informatika",
    }
  ];

const StudentPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [studentToDelete, setStudentToDelete] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [deleteMessage, setDeleteMessage] = useState<string>("");
  const [isAddStudentFormOpen, setIsAddStudentFormOpen] = useState(false);

  const itemsPerPage = 5;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = (id: number) => {
    // Handle edit logic here
  };

  const handleDelete = (id: number) => {
    setShowConfirmation(true);
    setStudentToDelete(id);
  };

  const confirmDelete = () => {
    if (studentToDelete !== null) {
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== studentToDelete)
      );
      setShowConfirmation(false);
      setDeleteMessage("Mahasiswa berhasil dihapus");
      setStudentToDelete(null);
      setTimeout(() => setDeleteMessage(""), 3000);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setStudentToDelete(null);
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.nim.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.program.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentFilteredItems = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

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
            <h1 className="text-2xl font-bold text-blue-800 mb-6">
              Kelola Data Mahasiswa
            </h1>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div className="relative w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="Search or type"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                  className="w-full p-2 pl-10 border border-gray-300 rounded-md"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="flex space-x-4">
                <button
                  className="flex items-center bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700"
                  style={{ fontSize: "14px" }}
                >
                  <FaUpload className="mr-2" />
                  Unggah
                </button>
                <AddStudentDataForm 
                  isDialogOpen={isAddStudentFormOpen}
                  setIsDialogOpen={setIsAddStudentFormOpen}
                />
              </div>
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
          {filteredStudents.length === 0 ? (
            <div className="p-4 text-center text-red-500">
              Data tidak ditemukan
            </div>
          ) : (
            <>
              <StudentTable
                students={currentFilteredItems}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
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
        <ConfirmationModal
          message="Are you sure you want to delete this student?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default StudentPage;
