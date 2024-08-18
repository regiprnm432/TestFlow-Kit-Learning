import React from 'react';
import { FaTrophy } from 'react-icons/fa';
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface ChallengeCardProps {
  idTopikModul: string;
  title: string;
  level: string;
  currentPoints: number;
  maxPoints: number;
  status: string;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ idTopikModul, title, level, currentPoints, maxPoints, status }) => {
  const navigate = useNavigate();
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
      case 'N':
        return 'bg-green-600 text-white';
      case 'Y':
        return 'bg-blue-600 text-white';
      case 'B':
        return 'border border-blue-600 bg-white text-blue-600';
      default:
        return 'border border-blue-600 bg-white text-blue-600';
    }
  };

  const getButtonLabel = (status: string) => {
    switch (status) {
      case 'N':
        return 'Lanjutkan';
      case 'B':
        return 'Selesaikan';
      case 'Y':
        return 'Selesai';
      default:
        return 'Selesaikan';
    }
  };

  const goToTestCasePage = () => {
    navigate({
      pathname: '/topikModul',
      search: '?topikModulId='+idTopikModul,
    });
  };
  return (
    <Card className="mb-4 border border-blue-800 rounded">
      <CardContent className="lg:p-4 p-2">
        <div className="flex justify-between items-center mb-2">
          <h3 className="lg:text-lg md:text-base text-sm font-bold text-blue-600">{title}</h3>
          <div className="lg:text-base md:text-sm text-xs text-blue-600 flex items-center">
            <FaTrophy className="mr-1" />
            <span>{currentPoints === 0 ? '---' : currentPoints}/{maxPoints} XP</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="lg:text-base md:text-sm text-xs font-semibold">
            <span className={getLevelColor(level)}>{level}</span>, Max Points : {maxPoints} XP
          </div>
          <button
            onClick={goToTestCasePage}
            className={`font-bold rounded lg:text-base md:text-sm text-xs lg:py-2 lg:px-4 py-1 px-2 ${getButtonStyle(status)}`}
          >
            {getButtonLabel(status)}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChallengeCard;
