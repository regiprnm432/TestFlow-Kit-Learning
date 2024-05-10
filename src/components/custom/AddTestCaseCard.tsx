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
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";

import "../../index.css";

const AddTestCaseCard = () => {
  const [isFormDialogOpen, setIsFormDialogOpen] = React.useState(false);
  const [testData, setTestData] = useState([
    {
      id: 1,
      objective:
        "Objective 1 kakakakakak kakakakak lllllllllllllllllllllllllllllllllllll",
      parameters: ["Param 1", "Param 2"],
      expected: "Expected1",
    },
    {
      id: 2,
      objective: "Objective 2",
      parameters: ["Param 1", "Param 2"],
      expected: "Expected2 jkjkjkjk",
    },
  ]);
  const [editingTestId, setEditingTestId] = useState<number | null>(null);
  const [deletingTestId, setDeletingTestId] = useState<number | null>(null);
  const [executedTestCase, setExecutedTestCase] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (
      (editingTestId || deletingTestId || testData.length > 2) &&
      executedTestCase
    ) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [editingTestId, deletingTestId, testData, executedTestCase]);

  const handleEdit = () => {
    setEditingTestId(1); // Contoh ID untuk pengeditan
  };

  const handleDelete = () => {
    setDeletingTestId(1); // Contoh ID untuk penghapusan
  };

  const handleExecuteTestCase = () => {
    // Lakukan logika untuk eksekusi test case
    setExecutedTestCase(true);
  };

  return (
    <Card className="h-[30vh] w-full overflow-auto">
      <CardHeader className="flex justify-between">
        <CardTitle className="module-title">Test Case</CardTitle>
        <div className="flex space-x-2 items-center justify-end">
          <Button
            variant="outline"
            className="text-blue-800 border-2 border-blue-800 rounded-[20]"
            style={{ fontSize: "12px" }}
            onClick={handleExecuteTestCase}
          >
            Eksekusi Test Case
          </Button>
          <TestCaseFormDialog 
              isDialogOpen={isFormDialogOpen} 
              setIsDialogOpen={setIsFormDialogOpen}
            />
        </div>
      </CardHeader>

      {showMessage && (
        <div className="bg-red-100 text-red-700 p-2 text-sm">
          Test case terbaru belum dieksekusi
        </div>
      )}

      <CardContent>
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
              <TableHead>Aksi</TableHead>
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
                <TableCell className="flex items-center space-x-2">
                  <Button
                    onClick={() => handleEdit()}
                    className="text-blue-500 p-0"
                    style={{ fontSize: "12px" }}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    onClick={() => handleDelete()}
                    className="text-red-500 p-0"
                    style={{ fontSize: "12px" }}
                  >
                    <FaTrash />
                  </Button>
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

export default AddTestCaseCard;
