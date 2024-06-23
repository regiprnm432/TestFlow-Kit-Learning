import React, { useState } from 'react';
import SidebarStudent from '../components/custom/SidebarStudent';
import ChallengeCard from '../components/custom/ChallengeCard';
import { FaBrain } from 'react-icons/fa';
import { Separator } from '@/components/ui/separator';

const ListChallengesPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('All'); // 'All', 'Selesai', 'Belum Selesai'

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChangeStatusFilter = (filter: string) => {
    setStatusFilter(prev => {
      if (filter === prev) {
        return 'All';
      }
      return filter;
    });
  };

  const challenges = [
    {
      title: 'Perkalian',
      level: 'Mudah',
      currentPoints: 170,
      maxPoints: 200,
      status: 'Ongoing'
    },
    {
      title: 'Perkalian',
      level: 'Sangat Mudah',
      currentPoints: 100,
      maxPoints: 100,
      status: 'Completed'
    },
    {
      title: 'Pembagian',
      level: 'Sulit',
      currentPoints: 90,
      maxPoints: 100,
      status: 'Completed'
    },
    {
      title: 'Penjumlahan',
      level: 'Sedang',
      currentPoints: 170,
      maxPoints: 200,
      status: 'Not Started'
    },
  ];

  const filteredChallenges = challenges.filter(challenge => {
    if (statusFilter === 'All') return true;
    if (statusFilter === 'Selesai' && challenge.status === 'Completed') return true;
    if (statusFilter === 'Belum Selesai' && challenge.status !== 'Completed') return true;
    return false;
  });

  return (
    <div className="flex flex-col lg:flex-row w-screen lg:w-screen bg-gray-200 min-h-screen">
      <SidebarStudent isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="bg-white p-4 shadow h-full overflow-auto ">
          <div className="sticky top-0 bg-white z-10 pb-4">
            <div className="flex justify-between items-center mb-4 mt-4">
              <h1 className="text-xl font-bold text-blue-800">Belajar Kemampuan Pembuatan Test Case Unit</h1>
              <FaBrain className="text-blue-600 text-3xl" />
            </div>
            <div className="items-center mb-4">
              <div className='gap-4'>
                <h2 className="text-xl font-bold text-blue-800">Pemula</h2>
                <div className="text-green-600 text-xl font-bold">600 / 2700 XP</div>
              </div>
              <div className="flex items-center mt-2">
                <div className="w-32 bg-gray-300 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <span className="ml-2 text-sm">40% : 4 / 10</span>
              </div>
            </div>
            <Separator />
            <div className="flex flex-row gap-4">
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 gap-4">
                  {filteredChallenges.length > 0 ? (
                    filteredChallenges.map((challenge, index) => (
                      <ChallengeCard
                        key={index}
                        title={challenge.title}
                        level={challenge.level}
                        currentPoints={challenge.currentPoints}
                        maxPoints={challenge.maxPoints}
                        status={challenge.status}
                      />
                    ))
                  ) : (
                    <div className="text-center text-gray-500">No challenges found</div>
                  )}
                </div>
              </div>
              <div className="w-1/4 bg-white p-4 h-full overflow-auto">
                <h2 className="text-xl font-bold text-blue-800 mb-6 mt-4">Status</h2>
                <div className="mb-4">
                  <input
                    type="checkbox"
                    id="selesai"
                    checked={statusFilter === 'Selesai'}
                    onChange={() => handleChangeStatusFilter('Selesai')}
                  />
                  <label htmlFor="selesai" className="ml-2 text-sm font-medium">Selesai</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="belumSelesai"
                    checked={statusFilter === 'Belum Selesai'}
                    onChange={() => handleChangeStatusFilter('Belum Selesai')}
                  />
                  <label htmlFor="belumSelesai" className="ml-2 text-sm font-medium">Belum Selesai</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListChallengesPage;
