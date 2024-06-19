import React, { useState } from "react";
import Sidebar from "../components/custom/SidebarStudent";
import { FaSearch } from "react-icons/fa";
import OngoingTopics from "../components/custom/OngoingTopics";
import LearningTopics from "../components/custom/LearningTopics";
import CompletedTopics from "../components/custom/CompletedTopics";

const ongoingTopics = [
  { id: 1, title: "Pemula", progress: 40, remaining: 8, xp: 600 },
  { id: 2, title: "Pemula", progress: 10, remaining: 9, xp: 90 },
];

const learningTopics = [
  {
    id: 1,
    title: "Topik 1",
    description: "Pembuatan Test Case level menengah",
    challenges: 20,
    xp: 2400,
  },
  {
    id: 2,
    title: "Topik 2",
    description: "Pembuatan Test Case level Pemula",
    challenges: 10,
    xp: 1600,
  },
  {
    id: 3,
    title: "Topik 3",
    description: "Pembuatan Test Case level Mahir",
    challenges: 30,
    xp: 4600,
  },
  {
    id: 4,
    title: "Topik 4",
    description: "Pembuatan Test Case level Pemula",
    challenges: 40,
    xp: 6000,
  },
  {
    id: 5,
    title: "Topik 1",
    description: "Pembuatan Test Case level menengah",
    challenges: 20,
    xp: 2400,
  },
  {
    id: 6,
    title: "Topik 2",
    description: "Pembuatan Test Case level Pemula",
    challenges: 10,
    xp: 1600,
  },
  {
    id: 7,
    title: "Topik 3",
    description: "Pembuatan Test Case level Mahir",
    challenges: 30,
    xp: 4600,
  },
];

const completedTopics = [
  { id: 1, title: "Topik X", xp: 550 },
  { id: 2, title: "Topik Y", xp: 900 },
  { id: 3, title: "Topik Z", xp: 780 },
  { id: 4, title: "Topik X", xp: 550 },
  { id: 5, title: "Topik Y", xp: 900 },
  { id: 6, title: "Topik Z", xp: 780 },
];

const TopicPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterOption, setFilterOption] = useState<string>("all");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCompletedTopicClick = (title: string) => {
    console.log(`Clicked on topic: ${title}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterOption(e.target.value);
  };

  return (
    <div className="flex flex-col lg:flex-row w-screen lg:w-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 ${isSidebarOpen ? "ml-64" : "ml-20"} transition-all duration-300`}>
        <div className="w-full bg-white p-4 shadow mb-6">
          <div className="max-w-screen-xl mx-auto">
            <h1 className="text-2xl font-bold text-blue-800 mb-6 mt-4">
              Belajar Kemampuan Pembuatan Test Case Unit
            </h1>
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
              <div className="flex items-center space-x-4 mr-4">
                <select
                  value={filterOption}
                  onChange={handleFilterChange}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option value="all">Semua</option>
                  <option value="ongoing">Sedang Berjalan</option>
                  <option value="learning">Topik Belajar</option>
                  <option value="completed">Sudah Dipelajari</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="min-h-screen p-4 md:p-6">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {filterOption === "all" || filterOption === "ongoing" ? (
              <OngoingTopics topics={ongoingTopics} searchQuery={searchQuery} />
            ) : null}

            {filterOption === "all" || filterOption === "learning" ? (
              <LearningTopics topics={learningTopics} searchQuery={searchQuery} />
            ) : null}

            {filterOption === "all" || filterOption === "completed" ? (
              <CompletedTopics
                topics={completedTopics}
                searchQuery={searchQuery}
                onTopicClick={handleCompletedTopicClick}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicPage;
