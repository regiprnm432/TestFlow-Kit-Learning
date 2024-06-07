import React, { useState, useEffect } from "react";
import TestCaseFormDialog from "./TestCaseFormDialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import "../../index.css";

const TestResultCard = () => {
  const [testData, setTestData] = useState([
    {
      id: 1,
      objective:
        "Objective 1 kakakakakak kakakakak lllllllllllllllllllllllllllllllllllll",
      parameters: ["Param 1", "Param 2"],
      expected: "Expected1",
      result: "Hasil 1",
    },
    {
      id: 2,
      objective: "Objective 2",
      parameters: ["Param 1", "Param 2"],
      expected: "Expected2 jkjkjkjk",
      result: "Hasil 2",
    },
  ]);
 
  return (
    <Card className="h-full w-full flex-grow-1">
      <CardHeader className="flex justify-between">
        <CardTitle className="text base module-title m-0">HasiL Pengujian 50% Pass</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 text-sm  text-gray-600">
            <p><span className="text-sm">Jumlah Test Case :</span>2</p>
            <p><span className="text-sm">Jumlah Test Case Pass :</span>1</p>
            <p><span className="text-sm">Jumlah Test Case Not Pass :</span>2</p>
        </div>

        <Table>
          <TableHeader>
            <TableRow
              className="bg-blue-800 text-white p-0"
              style={{ fontSize: "12px" }}
            >
              <TableHead>No</TableHead>
              <TableHead style={{ width: "250px" }}>
                Objective Testing
              </TableHead>
              {testData.length > 0 &&
                testData[0].parameters.map((param, index) => (
                  <TableHead key={index}>Parameter {index + 1}</TableHead>
                ))}
              <TableHead style={{ width: "250px" }}>Expected</TableHead>
              <TableHead>Hasil</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testData.map((test, index) => (
              <TableRow
                key={test.id}
                className={index % 2 === 0 ? "bg-blue-100" : "bg-blue-200"}
                style={{ fontSize: "12px" }}
              >
                <TableCell>{test.id}</TableCell>
                <TableCell style={{ width: "250px", whiteSpace: "nowrap" }}>
                  {test.objective}
                </TableCell>
                {test.parameters.map((param, index) => (
                  <TableCell key={index} style={{ whiteSpace: "nowrap" }}>
                    {param}
                  </TableCell>
                ))}
                <TableCell style={{ width: "250px", whiteSpace: "nowrap" }}>
                  {test.expected}
                </TableCell>
                <TableCell style={{ width: "250px", whiteSpace: "nowrap" }}>
                  {test.result}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* Konten footer card di sini */}
      </CardFooter>
    </Card>
  );
};

export default TestResultCard;
