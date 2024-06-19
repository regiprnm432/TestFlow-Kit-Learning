import React, { useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import Sidebar from "../components/custom/Sidebar";
import Pagination from "../components/custom/Pagination";
import StudentTable from "../components/custom/GradeStudentTable";

const students = [
    {
        no: 1,
        nim: "16501006",
        nama: "Asep Sunarya",
        poin: 750,
        modul: 5,
        program: "Ganjil Genap",
        },
        {
        no: 2,
        nim: "16501007",
        nama: "Kinara Rengganis",
        poin: 0,
        modul: 0,
        program: "Faktorial",
        },
        {
        no: 3,
        nim: "16501008",
        nama: "Kinara Rengganis",
        poin: 0,
        modul: 0,
        program: "Faktorial",
        },
        {
        no: 4,
        nim: "16501008",
        nama: "Kinara Rengganis",
        poin: 0,
        modul: 0,
        program: "Faktorial",
        },
        {
        no: 5,
        nim: "16501009",
        nama: "Kinara Rengganis",
        poin: 0,
        modul: 0,
        program: "Faktorial",
        },
        {
        no: 6,
        nim: "16501010",
        nama: "Asep Sunarya",
        poin: 750,
        modul: 5,
        program: "Ganjil Genap",
        },
        {
        no: 7,
        nim: "16501012",
        nama: "Asep Sunarya",
        poin: 750,
        modul: 5,
        program: "Ganjil Genap",
        },
        {
        no: 8,
        nim: "16501013",
        nama: "Asep Sunarya",
        poin: 750,
        modul: 5,
        program: "Ganjil Genap",
        },
        {
        no: 10,
        nim: "16501014",
        nama: "Kinara Rengganis",
        poin: 0,
        modul: 0,
        program: "Faktorial",
        },
        
        
];

const topics = ["Semua", "Ganjil Genap", "Faktorial", "Pemrograman Dasar", "Struktur Data"];

const GradeStudentPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterOption, setFilterOption] = useState<string>("Semua");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset current page when search query changes
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterOption(e.target.value);
    setCurrentPage(1); // Reset current page when filter changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 5;
  let filteredStudents = students;
  if (filterOption !== "Semua") {
    filteredStudents = students.filter(
      (student) => student.program.toLowerCase() === filterOption.toLowerCase()
    );
  }
  if (searchQuery) {
    filteredStudents = filteredStudents.filter(
      (student) =>
        student.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.nim.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const currentFilteredItems = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
              Grade Pencapaian Mahasiswa
            </h1>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center w-full md:w-1/2">
                <span className="text-black font-semibold mr-2">Topik:</span>
                <select
                  value={filterOption}
                  onChange={handleFilterChange}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  {topics.map((topic) => (
                    <option key={topic} value={topic.toLowerCase()}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mr-4 relative w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="Search or type"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full p-2 pl-10 border border-gray-300 rounded-md"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        <div className="min-h-screen p-4 md:p-6">
          <button
            className="flex items-center bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700 mb-4"
            style={{ fontSize: "14px", marginLeft: "auto" }}
          >
            <FaPlus className="mr-2" />
            Unduh
          </button>
          <div className="bg-white shadow-md rounded-lg overflow-x-auto">
            {filteredStudents.length === 0 ? (
              <div className="p-4 text-center text-red-500">
                Data tidak ditemukan
              </div>
            ) : (
              <>
                <StudentTable students={currentFilteredItems} />
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
    </div>
  );
};

export default GradeStudentPage;
