import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "../../index.css";
import failIcon from "../../assets/logo/fail.png";
import { Button } from "@/components/ui/button";

const PassCard: React.FC = () => {
  // Dummy data persentase coverage
  const coveragePercentage: number = 70;

  // Mendapatkan tanggal saat ini
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();

  return (
    <div className="card-container w-full">
      <Card className="pass-card bg-red-700 text-white">
        <CardTitle className="module-title-white">Hasil Pengujian</CardTitle>
        <div className="text-center flex flex-col items-center">
          <div className="flex items-start mb-4 justify-start">
            <img
              src={failIcon}
              alt="Blue Card"
              className="mr-4"
              style={{ maxHeight: "150px" }}
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
                Mohon maaf, belum bisa melanjutkan ke case berikutnya. Minimal
                coverage test 80%
              </p>
            </div>
          </div>
        </div>
        <CardFooter className="card-footer flex justify-between items-center">
          <div>
            <p
              className="text-base mb-4 mt-4 font-semibold "
              style={{ fontSize: "12px" }}
            >
              Tanggal Eksekusi: <span>{formattedDate}</span>
            </p>
          </div>
          <div className="button-container-custom">
            <Button className="bg-white text-red-700 hover:bg-red-700 button-custom">
              Laporan Pengujian
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PassCard;
