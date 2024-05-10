import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "../../index.css";

import passIcon from "../../assets/logo/pass.png";

const PassCard: React.FC = () => {
  // Dummy data persentase coverage
  const coveragePercentage: number = 85; // Misalnya persentase coverage dari database

  // Fungsi untuk menghitung poin berdasarkan level kesulitan
  const calculatePoints = (percentage: number, difficultyLevel: string): number => {
    let points: number = percentage; // Default, dikali 1 untuk level mudah

    if (difficultyLevel === 'medium') {
      points = percentage * 2;
    } else if (difficultyLevel === 'hard') {
      points = percentage * 3;
    }

    return points;
  };

  // Hitung poin berdasarkan persentase dan level kesulitan
  const points: number = calculatePoints(coveragePercentage, 'easy'); // Dianggap mudah

  return (
    <div className="card-container w-full">
      <Card className="pass-card bg-blue-800 text-white">
 
          <CardTitle className="module-title-white">Hasil Pengujian</CardTitle>
 
      
          <div className="text-center">
            {/* Menampilkan gambar dalam konten */}
            <img
              src={passIcon}
              alt="Blue Card"
              className="center mb-4"
              style={{ maxWidth: "50%" }}
            />
            <p className="text-white font-bold">Hasil Coverage Test Case Anda</p>
            <p className="text-white">{coveragePercentage}%</p>
            <p className="text-white">Selamat anda sudah melewati batas minimal coverage test yaitu 80%</p>
            <p className="text-white">Poin yang didapat: {points} Poin</p>
          </div>
    
        <CardFooter className="card-footer">
          {/* Konten footer card di sini */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default PassCard;
