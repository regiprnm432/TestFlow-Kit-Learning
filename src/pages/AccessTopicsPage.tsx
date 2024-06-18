import React, { useState } from "react";
import Sidebar from "../components/custom/SidebarStudent";
import { FaSearch } from "react-icons/fa";
import logo_berpikir from "../assets/logo/berpikir.png";
import logo_skor from "../assets/logo/skor.png";

// Define interfaces for topics
interface OngoingTopic {
  id: number;
  title: string;
  progress: number;
  remaining: number;
  xp: number;
}

interface LearningTopic {
  id: number;
  title: string;
  description: string;
  challenges: number;
  xp: number;
}

interface CompletedTopic {
  id: number;
  title: string;
  xp: number;
}

// Dummy data for topics
const ongoingTopics: OngoingTopic[] = [
  { id: 1, title: "Pemula", progress: 40, remaining: 8, xp: 600 },
  { id: 2, title: "Pemula", progress: 10, remaining: 9, xp: 90 },
];

const learningTopics: LearningTopic[] = [
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

const completedTopics: CompletedTopic[] = [
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
    // Add your navigation or action here
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterOption(e.target.value);
  };

  const filterTopics = (topics: any[], query: string) => {
    if (!query) return topics;
    return topics.filter((topic) =>
      topic.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredOngoingTopics = filterTopics(ongoingTopics, searchQuery);
  const filteredLearningTopics = filterTopics(learningTopics, searchQuery);
  const filteredCompletedTopics = filterTopics(completedTopics, searchQuery);

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
              <>
                {filteredOngoingTopics.length > 0 && (
                  <div className="m-4">
                    <h2 className="text-xl font-bold text-blue-800 pt-4 mb-4">
                      Sedang Berjalan
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 m-2 animate-fade-in">
                      {filteredOngoingTopics.map((topic) => (
                        <div
                          key={topic.id}
                          className="bg-blue-50 text-black p-6 rounded-lg shadow-lg border-2 border-blue-800"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg  text-blue-800 font-bold">
                              {topic.title}
                            </h3>
                            <img
                              src={logo_berpikir}
                              alt="Logo"
                              className="w-20"
                            />
                          </div>
                          <div className="mb-2">
                            <div className="w-full bg-gray-200 rounded-full h-4">
                              <div
                                className="bg-blue-600 h-4 rounded-full"
                                style={{ width: `${topic.progress}%` }}
                              ></div>
                            </div>
                            <p className="text-sm">
                              {topic.progress}% ({topic.remaining} tantangan
                              lagi)
                            </p>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <button className=" bg-blue-800 hover:bg-blue-500 text-white px-4 py-2 rounded">
                              Lanjutkan Belajar
                            </button>
                            <div className="flex items-center">
                              <img
                                src={logo_skor}
                                alt="Logo"
                                className="w-10 mr-2"
                              />
                              <p className="font-semibold">{topic.xp} XP</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="w-full py-3">
                    <div className="w-full py-3">
                  <hr className="border-blue-800 shadow-lg" />
                </div>
                </div>
                  </div>
                )}
              </>
            ) : null}

            {filterOption === "all" || filterOption === "learning" ? (
              <div className="m-4">
                <h2 className="text-xl font-bold text-blue-800 mb-4">
                  Topik Belajar
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 m-2 animate-fade-in ">
                  {filteredLearningTopics.map((topic) => (
                    <div
                      key={topic.id}
                      className="bg-blue-50 text-black p-6 rounded-lg shadow-lg border-2 border-blue-800"
                    >
                      <div className="flex justify-between items-start mb-2 text-blue-800">
                        <h3 className="text-lg font-bold">{topic.title}</h3>
                        <img src={logo_berpikir} alt="Logo" className="w-20" />
                      </div>
                      <p className="text-lg font-semibold  text-blue-800 mb-2">
                        {topic.description}
                      </p>
                      <p className="text-m font-bold  text-blue-800 mb-2">
                        {topic.challenges} Tantangan
                      </p>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center">
                          <img
                            src={logo_skor}
                            alt="Logo"
                            className="w-10 mr-2"
                          />
                          <p className="font-semibold">{topic.xp} XP</p>
                        </div>
                        <button className="bg-blue-800 hover:bg-blue-500 text-white px-4 py-2 rounded">
                          Pelajari
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <hr className="border-blue-800 my-6" />
              </div>
            ) : null}

            {filterOption === "all" || filterOption === "completed" ? (
              <>
                {filteredCompletedTopics.length > 0 && (
                  <div className="m-4">
                    <h2 className="text-xl font-bold text-blue-800 mb-4">
                      Sudah Dipelajari
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-2">
                      {filteredCompletedTopics.map((topic) => (
                        <div
                          key={topic.id}
                          onClick={() => handleCompletedTopicClick(topic.title)}
                          className="bg-blue-50 text-black p-4 rounded-lg shadow-lg border-2 border-blue-800 cursor-pointer transition-transform transform hover:scale-105"
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-blue-800">
                              {topic.title}
                            </h3>
                            <div className="flex items-center">
                              <img
                                src={logo_skor}
                                alt="Logo"
                                className="w-8 h-8 mr-2"
                              />
                              <p className="text-sm font-semibold">
                                {topic.xp} XP
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                   
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicPage;
