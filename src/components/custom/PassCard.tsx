import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "../../index.css";
import passIcon from "../../assets/logo/pass.png";
import { Button } from "@/components/ui/button";

const PassCard: React.FC = () => {
  // Dummy data persentase coverage
  const coveragePercentage: number = 85;

  // Fungsi untuk menghitung poin berdasarkan level kesulitan
  const calculatePoints = (
    percentage: number,
    difficultyLevel: string
  ): number => {
    let points: number = percentage; // Default, dikali 1 untuk level mudah
    if (difficultyLevel === "medium") {
      points = percentage * 2;
    } else if (difficultyLevel === "hard") {
      points = percentage * 3;
    }
    return points;
  };

  // Hitung poin berdasarkan persentase dan level kesulitan
  const points: number = calculatePoints(coveragePercentage, "easy"); // Dianggap mudah

  // Mendapatkan tanggal saat ini
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();

  return (
    <div className="card-container w-full">
      <Card className="pass-card bg-blue-800 text-white">
        <CardTitle className="module-title-white">Hasil Pengujian</CardTitle>
        <div className="text-center flex flex-col items-center">
          <div className="flex items-start mb-4 justify-start">
            <img
              src={passIcon}
              alt="Blue Card"
              className="mr-4"
              style={{ width: "35%" }}
            />
            <div className="text-white">
              <p className="font-semibold text-lg mb-2">
                Hasil Coverage Test Case Anda
              </p>
              <p className="font-semibold text-4xl mb-2">
                {coveragePercentage}%
              </p>
              <p
                className="font-semibold text-base mb-2"
                style={{ fontSize: "14px" }}
              >
                Selamat! Anda sudah berhasil melewati batas minimal coverage
                test, yaitu 80%.
              </p>
            </div>
          </div>
        </div>
        <CardFooter className="card-footer flex justify-between items-center">
          <div>
            <p
              className="text-base mb-2 font-semibold"
              style={{ fontSize: "14px" }}
            >
              Total Poin:{" "}
              <span className="font-bold" style={{ fontSize: "18px" }}>
                {points} Poin
              </span>
            </p>
            <p
              className="text-base mb-4 font-semibold "
              style={{ fontSize: "12px" }}
            >
              Tanggal Eksekusi: <span>{formattedDate}</span>
            </p>
          </div>
          <div className="button-container-custom">
            <Button className="bg-white text-blue-800 hover:bg-blue-800 button-custom">
              Laporan Pengujian
            </Button>
            <Button className="bg-white text-blue-800 hover:bg-blue-800 button-custom">
              Kasus Selanjutnya
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PassCard;
