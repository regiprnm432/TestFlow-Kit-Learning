import React from 'react';
import logo_berpikir from "../../assets/logo/berpikir.png";
import logo_skor from "../../assets/logo/skor.png";
import { useNavigate } from "react-router-dom";

interface OngoingTopic {
  id: string;
  title: string;
  progress: number;
  remaining: number;
  xp: number;
}

interface OngoingTopicsProps {
  topics: OngoingTopic[];
  searchQuery: string;
}

const OngoingTopics: React.FC<OngoingTopicsProps> = ({ topics, searchQuery }) => {
  const navigate = useNavigate();
  const filterTopics = (topics: OngoingTopic[], query: string) => {
    if (!query) return topics;
    return topics.filter((topic) =>
      topic.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredOngoingTopics = filterTopics(topics, searchQuery);
  const onResume = async () => {
    navigate({
      pathname: '/topikModul',
      search: '?topikModulId=3f194aef-3267-4bba-a31a-0f27099a3db2',
    });
  };
  return (
    <>
      {filteredOngoingTopics.length > 0 && (
        <div className="m-4">
          <h2 className="text-xl font-bold text-blue-800 pt-4 mb-4">Sedang Berjalan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 m-2 animate-fade-in">
            {filteredOngoingTopics.map((topic) => (
              <div
                key={topic.id}
                className="bg-blue-50 text-black p-6 rounded-lg shadow-lg border-2 border-blue-800"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg text-blue-800 font-bold">{topic.title}</h3>
                  <img src={logo_berpikir} alt="Logo" className="w-20" />
                </div>
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
                <div className="flex justify-between items-center mt-4">
                  <button onClick={onResume} className="bg-blue-800 hover:bg-blue-500 text-white px-4 py-2 rounded">
                    Lanjutkan Belajar
                  </button>
                  <div className="flex items-center">
                    <img src={logo_skor} alt="Logo" className="w-10 mr-2" />
                    <p className="font-semibold">{topic.xp} XP</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full py-3">
            <hr className="border-blue-800 shadow-lg" />
          </div>
        </div>
      )}
    </>
  );
};

export default OngoingTopics;
