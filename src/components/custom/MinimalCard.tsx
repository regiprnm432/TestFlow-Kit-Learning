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
  return (
    <div className="card-container w-full">
      <Card className="pass-card bg-blue-800 text-white">
        <div>
          <p
            className="text-base font-semibold"
            style={{ fontSize: "14px" }}
          >
            Minimal Coverage Test Bernilai: {" "}
            <span className="font-bold" style={{ fontSize: "18px" }}>
              80%
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default PassCard;
