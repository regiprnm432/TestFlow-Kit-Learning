import React from 'react';
import { FaTrophy } from 'react-icons/fa';
import { Card, CardContent } from "@/components/ui/card";

interface ChallengeCardProps {
  title: string;
  level: string;
  currentPoints: number;
  maxPoints: number;
  status: string;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ title, level, currentPoints, maxPoints, status }) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Mudah':
        return 'text-[#04B200]';
      case 'Sangat Mudah':
        return 'text-[#5087F2]';
      case 'Sedang':
        return 'text-[#A0640A]';
      case 'Sulit':
        return 'text-[#FF0000]';
      default:
        return 'text-black';
    }
  };

  const getButtonStyle = (status: string) => {
    switch (status) {
      case 'Ongoing':
        return 'bg-green-600 text-white';
      case 'Completed':
        return 'bg-blue-600 text-white';
      case 'Not Started':
        return 'border border-blue-600 bg-white text-blue-600';
      default:
        return 'border border-blue-600 bg-white text-blue-600';
    }
  };

  const getButtonLabel = (status: string) => {
    switch (status) {
      case 'Ongoing':
        return 'Lanjutkan';
      case 'Completed':
        return 'Selesai';
      case 'Not Started':
        return 'Selesaikan';
      default:
        return 'Status Unknown';
    }
  };

  return (
    <Card className="mb-4 border border-blue-800 rounded">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold text-blue-600">{title}</h3>
          <div className="text-l text-blue-600 flex items-center">
            <FaTrophy className="mr-1" />
            <span>{currentPoints}/{maxPoints} XP</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-l font-semibold">
            <span className={getLevelColor(level)}>{level}</span>, Max Points : {maxPoints} XP
          </div>
          <button className={`px-4 py-2 font-bold rounded ${getButtonStyle(status)}`}>
            {getButtonLabel(status)}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChallengeCard;
