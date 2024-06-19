import React, { useState } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import Sidebar from '../components/custom/Sidebar';
import Pagination from '@/components/custom/Pagination';
import TopicTable from '../components/custom/TopicTable';
import ConfirmationModal from '../components/custom/ConfirmationModal';

interface Topic {
  id: number;
  name: string;
  description: string;
  moduleCount: number;
  status: 'P' | 'D';
  studentAccess: number | string;
}

const initialTopics: Topic[] = [
  {
    id: 1,
    name: 'Unit Test 2023',
    description: 'Pembuatan Test Case Sedang',
    moduleCount: 10,
    status: 'P',
    studentAccess: 50,
  },
  {
    id: 2,
    name: 'Unit Test 2023',
    description: 'Pembuatan Test Case Sulit',
    moduleCount: 5,
    status: 'P',
    studentAccess: 0,
  },
  {
    id: 3,
    name: 'Unit Test 2024',
    description: 'Pembuatan Test Case Sulit',
    moduleCount: 20,
    status: 'P',
    studentAccess: 5,
  },
  {
    id: 4,
    name: 'Unit Test 2024',
    description: 'Pembuatan Test Case Sedang',
    moduleCount: 18,
    status: 'D',
    studentAccess: '-',
  },
  {
    id: 5,
    name: 'Unit Test 2024',
    description: 'Pembuatan Test Case Pemula',
    moduleCount: 4,
    status: 'D',
    studentAccess: '-',
  },
  {
    id: 6,
    name: 'Unit Test 2023',
    description: 'Pembuatan Test Case Sedang',
    moduleCount: 10,
    status: 'P',
    studentAccess: 50,
  },
  {
    id: 7,
    name: 'Unit Test 2023',
    description: 'Pembuatan Test Case Sulit',
    moduleCount: 5,
    status: 'P',
    studentAccess: 0,
  },
  {
    id: 8,
    name: 'Unit Test 2024',
    description: 'Pembuatan Test Case Sulit',
    moduleCount: 20,
    status: 'P',
    studentAccess: 5,
  },
  {
    id: 9,
    name: 'Unit Test 2024',
    description: 'Pembuatan Test Case Sedang',
    moduleCount: 18,
    status: 'D',
    studentAccess: '-',
  },
  {
    id: 10,
    name: 'Unit Test 2024',
    description: 'Pembuatan Test Case Pemula',
    moduleCount: 4,
    status: 'D',
    studentAccess: '-',
  },
];

const parseStudentAccess = (access: number | string) => {
  if (typeof access === 'number') {
    return access;
  } else if (typeof access === 'string' && access === '-') {
    return 0;
  } else {
    return parseInt(access);
  }
};

const ListTopicsPage: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>(initialTopics);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Topic>('name');
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [topicToDelete, setTopicToDelete] = useState<number | null>(null);
  const [deleteMessage, setDeleteMessage] = useState<string>('');

  const itemsPerPage = 5;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRequestSort = (property: keyof Topic) => {
    const isAscending = orderBy === property && order === 'asc';
    setOrder(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleTogglePublish = (id: number) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === id
          ? {
              ...topic,
              status: topic.status === 'D' ? 'P' : 'D',
              studentAccess:
                topic.status === 'D'
                  ? parseStudentAccess(topic.studentAccess)
                  : '-',
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
      setDeleteMessage('Topik berhasil dihapus');
      setTopicToDelete(null);
      // Hide the delete message after 3 seconds
      setTimeout(() => setDeleteMessage(''), 3000);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setTopicToDelete(null);
  };

  const transformStatus = (status: 'D' | 'P'): string => {
    return status === 'D' ? 'Draft' : 'Published';
  };

  const filteredTopics = topics.filter((topic) =>
    topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())||
    transformStatus(topic.status).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTopics = [...filteredTopics].sort((a, b) => {
    const isAsc = order === 'asc';
    if (a[orderBy] < b[orderBy]) {
      return isAsc ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return isAsc ? 1 : -1;
    }
    return 0;
  });

  const currentFilteredItems = sortedTopics.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  const totalPages = Math.ceil(filteredTopics.length / itemsPerPage);

  return (
    <div className="flex flex-col lg:flex-row w-screen lg:w-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <div className="w-full bg-white p-4 shadow mb-6">
          <div className="max-w-screen-xl mx-auto">
            <h1 className="text-2xl font-bold text-blue-800 mb-6 mt-4">Kelola Data Topik Pengujian</h1>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div className="relative w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="Search or type"
                  value={searchQuery}
                  onChange={handleSearchChange} 
                  className="w-full p-2 pl-10 border border-gray-300 rounded-md"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button className="flex items-center bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700" style={{ fontSize: '14px' }}>
                <FaPlus className="mr-2" />
                Tambah Topik Pengujian
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
            {filteredTopics.length === 0 ? (
              <div className="p-4 text-center text-red-500">Data tidak ditemukan</div>
            ) : (
              <>
                <TopicTable
                  topics={currentFilteredItems}
                  orderBy={orderBy}
                  order={order}
                  onSort={handleRequestSort}
                  onTogglePublish={handleTogglePublish}
                  onDelete={handleDelete}
                />
                <div className="flex justify-center items-center py-4" style={{ fontSize: '14px' }}>
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {showConfirmation && (
        <ConfirmationModal message="Apakah Anda yakin ingin menghapus topik ini?" onConfirm={confirmDelete} onCancel={cancelDelete} />
      )}

     
    </div>
  );
};

export default ListTopicsPage;
