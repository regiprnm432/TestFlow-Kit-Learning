import React, { useState, useEffect } from "react";
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
    <Card className="w-full flex flex-col">
    <CardHeader className="flex justify-between">
      <CardTitle className="text-base module-title m-0">Hasil Pengujian 50% Pass</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="mb-6 text-sm text-gray-600">
        <p>
          <span className="text-sm">Jumlah Test Case :</span> 2
        </p>
        <p>
          <span className="text-sm">Jumlah Test Case Pass :</span> 1
        </p>
        <p>
          <span className="text-sm">Jumlah Test Case Not Pass :</span> 2
        </p>
      </div>

      <Table className="text-sm border-collapse border border-black w-full">
        <TableHeader>
          <TableRow className="bg-blue-800 text-sm text-white py-2 hover:bg-blue-600">
            <TableHead className="border border-black">No</TableHead>
            <TableHead className="border border-black w-52">Objective Testing</TableHead>
            {testData.length > 0 &&
              testData[0].parameters.map((param, index) => (
                <TableHead key={index} className="border border-black">Parameter {index + 1}</TableHead>
              ))}
            <TableHead className="border border-black w-64">Expected</TableHead>
            <TableHead className="border border-black">Hasil</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testData.map((test, index) => (
            <TableRow
              key={test.id}
              className={`${index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'} text-sm leading-tight`}
            >
              <TableCell className="py-2 border border-black">{test.id}</TableCell>
              <TableCell className="py-2 border border-black w-64 whitespace-nowrap">
                {test.objective}
              </TableCell>
              {test.parameters.map((param, index) => (
                <TableCell key={index} className="py-2 border border-black whitespace-nowrap">
                  {param}
                </TableCell>
              ))}
              <TableCell className="py-2 border border-black w-52 whitespace-nowrap">
                {test.expected}
              </TableCell>
              <TableCell className="py-2 border border-black w-52 whitespace-nowrap">
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
