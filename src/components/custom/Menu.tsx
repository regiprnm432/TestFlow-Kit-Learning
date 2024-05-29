import React from "react";
import { Link, useLocation } from "react-router-dom";
import PoinIcon from "/src/assets/logo/poin.png";

export function Menu() {
  const location = useLocation();

  // Simulasi nilai difficultyLevel dari database (misalnya "mudah")
  const difficultyLevel: string = "mudah";
  const levels: { [key: string]: string } = {
    sulit: "Sulit",
    sedang: "Sedang",
    mudah: "Mudah",
  };

  // Fungsi untuk menghitung poin maksimal
  const calculateMaxPoint = (level: number, difficulty: string): number => {
    switch (difficulty) {
      case "sulit":
        return level * 3;
      case "sedang":
        return level * 2;
      case "mudah":
        return level * 1;
      default:
        return 0;
    }
  };

  const maxPoint: number = calculateMaxPoint(100, difficultyLevel); // Misalnya level kesulitan adalah 100

  return (
    <div
      className="menu"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: "100%",
        marginRight: "20px",
      }}
    >
      <div className="buttons" style={{ display: "flex" }}>
        <Link
          to="/"
          className={
            location.pathname === "/"
              ? "buttonMenu activeButton"
              : "buttonMenu inactiveButton"
          }
        >
          Pembuatan Test Case
        </Link>
        <Link
          to="/test-result"
          className={
            location.pathname === "/test-result"
              ? "buttonMenu activeButton"
              : "buttonMenu inactiveButton"
          }
        >
          Hasil Pengujian
        </Link>
      </div>

      <div
        className="poin mr-6"
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={PoinIcon}
          alt="Poin Icon"
          style={{ width: 24, height: 24, marginRight: 10 }}
        />
        <div>
          <p style={{ fontSize: 14, fontWeight: "bold", marginTop: "3px" }}>
            Poin Maksimal: {maxPoint}
          </p>
          <p style={{ fontSize: 12, marginBottom: "5px" }}>
            {levels[difficultyLevel]}
          </p>
        </div>
      </div>
    </div>
  );
}
