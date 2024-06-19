import React, { useState } from 'react';
import { FaSearch, FaDownload } from 'react-icons/fa';
import Sidebar from '../components/custom/Sidebar';
import Pagination from '../components/custom/Pagination';
import GradeStudentTable from '../components/custom/GradeStudentTable';
import * as XLSX from 'xlsx';

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedTopic, setSelectedTopic] = useState<string>("semua");
  const [sortColumn, setSortColumn] = useState<'poin' | 'modul' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(e.target.value);
    setCurrentPage(1); // Reset to first page on topic change
  };

  const handleSort = (column: 'poin' | 'modul') => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const itemsPerPage = 5;
  let filteredStudents = students;

  if (searchQuery) {
    filteredStudents = filteredStudents.filter(
      (student) =>
        student.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.nim.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (selectedTopic !== "semua") {
    filteredStudents = filteredStudents.filter(
      (student) => student.program.toLowerCase() === selectedTopic
    );
  }

  if (sortColumn) {
    filteredStudents.sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const currentFilteredItems = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredStudents);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "students.xlsx");
  };

  return (
    <div className="flex flex-col lg:flex-row w-screen lg:w-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 ${isSidebarOpen ? "ml-64" : "ml-20"} transition-all duration-300`}>
        <div className="w-full bg-white p-4 shadow mb-6">
          <div className="max-w-screen-xl mx-auto">
            <h1 className="text-2xl font-bold text-blue-800 mb-6 mt-4">
              Grade Pencapaian Mahasiswa
            </h1>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center w-full md:w-1/2">
                <span className="text-black font-semibold mr-2">Topik:</span>
                <select
                  value={selectedTopic}
                  onChange={handleTopicChange}
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
            className="flex items-center bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4"
            style={{ fontSize: "14px", marginLeft: "auto" }}
            onClick={handleDownload}
          >
            <FaDownload className="mr-2" />
            Unduh
          </button>
          <div className="bg-white shadow-md rounded-lg overflow-x-auto">
            {filteredStudents.length === 0 ? (
              <div className="p-4 text-center text-red-500">
                Data tidak ditemukan
              </div>
            ) : (
              <>
                <GradeStudentTable
                  students={currentFilteredItems}
                  onSort={handleSort}
                  sortColumn={sortColumn || undefined}
                  sortDirection={sortDirection}
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
    </div>
  );
};

export default GradeStudentPage;
