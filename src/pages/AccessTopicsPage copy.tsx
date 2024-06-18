import React, { useState } from 'react';

import Sidebar from '../components/custom/SidebarStudent';

// Define interfaces for topics
interface OngoingTopic {
  id: number;
  level: string;
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
  { id: 1, level: 'Pemula', progress: 40, remaining: 8, xp: 600 },
  { id: 2, level: 'Pemula', progress: 10, remaining: 9, xp: 90 },
];

const learningTopics: LearningTopic[] = [
  { id: 1, title: 'Topik 1', description: 'Pembuatan Test Case level menengah', challenges: 20, xp: 2400 },
  { id: 2, title: 'Topik 2', description: 'Pembuatan Test Case level Pemula', challenges: 10, xp: 1600 },
  { id: 3, title: 'Topik 3', description: 'Pembuatan Test Case level Mahir', challenges: 30, xp: 4600 },
  { id: 4, title: 'Topik 4', description: 'Pembuatan Test Case level Pemula', challenges: 40, xp: 6000 },
];

const completedTopics: CompletedTopic[] = [
  { id: 1, title: 'Topik X', xp: 550 },
  { id: 2, title: 'Topik Y', xp: 900 },
  { id: 3, title: 'Topik Z', xp: 780 },
];

const TopicPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex w-full">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}
      >
        <div className="min-h-screen w-full p-4 md:p-6">
          <div className="bg-white p-6 rounded-lg shadow-lg mx-auto" style={{ width: '100%' }}>
            <h1 className="text-2xl font-bold mb-6 text-center">
              Belajar Kemampuan Pembuatan Test Case Unit
            </h1>

            {ongoingTopics.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Sedang Berjalan</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ongoingTopics.map((topic) => (
                    <div
                      key={topic.id}
                      className="bg-white text-black p-6 rounded-lg shadow-lg border border-gray-300"
                    >
                      <h3 className="text-lg font-semibold mb-2">{topic.level}</h3>
                      <div className="mb-2">
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div
                            className="bg-blue-600 h-4 rounded-full"
                            style={{ width: `${topic.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-sm">
                          {topic.progress}% ({topic.remaining} tantangan lagi)
                        </p>
                      </div>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                        Lanjutkan Belajar
                      </button>
                      <p className="mt-4 font-semibold">{topic.xp} XP</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Topik Belajar</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {learningTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className="bg-white text-black p-6 rounded-lg shadow-lg border border-gray-300"
                  >
                    <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
                    <p className="text-sm mb-2">{topic.description}</p>
                    <p className="text-sm mb-2">{topic.challenges} Tantangan</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                      Pelajari
                    </button>
                    <p className="mt-4 font-semibold">{topic.xp} XP</p>
                  </div>
                ))}
              </div>
            </div>

            {completedTopics.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Sudah Dipelajari</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {completedTopics.map((topic) => (
                    <li key={topic.id} className="text-sm">
                      {topic.title} <span className="font-semibold">{topic.xp} XP</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicPage;
