import React, { useState, useEffect } from "react";
import TestCaseFormDialog from "./TestCaseFormDialog";
import EditTestCaseFormDialog from "./EditTestCaseFormDialog"; 
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
import { getAuthenticatedUser } from "@/lib/getAuthenticatedUser";

import "../../index.css";

interface ParameterModul {
  ms_id_parameter: string;
  ms_id_modul: string;
  ms_nama_parameter: string;
  ms_tipe_data: string;
  ms_rules: string;
  createdby: string;
  created: string;
  updatedby: string;
  updated: string;
}

interface TestCase {
  tr_id_test_case: string;
  tr_id_modul: string;
  tr_student_id: string;
  tr_no: number;
  tr_object_pengujian: string;
  tr_data_test_input: string;
  tr_expected_result: string;
  tr_test_result: string | null;
  createdby: string;
  created: string;
  updatedby: string;
  updated: string;
}

const AddTestCaseCard: React.FC = () => {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [parameters, setParameters] = useState<ParameterModul[]>([]);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [editingTestId, setEditingTestId] = useState<string | null>(null);
  const [deletingTestId, setDeletingTestId] = useState<number | null>(null);
  const [executedTestCase, setExecutedTestCase] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const MODULE_ID = '8b9d9c04-0fef-4ea1-963c-e65b5020e3c1';

  useEffect(() => {
    const fetchParameters = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/modul/detail/${MODULE_ID}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: getAuthenticatedUser().token
            },
          }
        );

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error("Forbidden: Access is denied");
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }

        const responseData: {
          data: { data_parameter_modul: ParameterModul[] };
        } = await response.json();
        setParameters(responseData.data.data_parameter_modul);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchParameters();
  }, []);

  useEffect(() => {
    const fetchTestCases = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/modul/TestCase/${MODULE_ID}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: getAuthenticatedUser().token,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error("Forbidden: Access is denied");
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }

        const responseData: { data: TestCase[] } = await response.json();
        setTestCases(responseData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTestCases();
  }, []);

  useEffect(() => {
    if (
      (editingTestId || deletingTestId || testCases.length > 2) &&
      executedTestCase
    ) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [editingTestId, deletingTestId, testCases, executedTestCase]);

  const handleEdit = (id: string) => {
    setEditingTestId(id);
    setIsFormDialogOpen(true);
  };

  const handleDelete = () => {
    setDeletingTestId(1);
  };

  const handleExecuteTestCase = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/modul/run/${MODULE_ID}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: getAuthenticatedUser().token,
          },
        }
      );
      // Retrieve the result and log it to the console
      const result = await response.json();
      console.log("Hasil eksekusi test case:", result);

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("Forbidden: Access is denied");
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      // Handle success message or other logic here
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Error executing test case:", error);
      // Handle error message or other logic here
    }
  };

  return (
    <Card className="h-screen w-full flex-grow-1">
      <CardHeader className="flex justify-between">
        <CardTitle className="module-title m-0">Test Case</CardTitle>
        <div className="flex space-x-2 items-center justify-end">
          <Button
            variant="outline"
            className="text-blue-800 border-2 border-blue-800 rounded-[10]"
            style={{ fontSize: "14px" }}
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
              style={{ fontSize: "14px" }}
            >
              <TableHead>No</TableHead>
              <TableHead style={{ width: "200px" }}>
                Objective Testing
              </TableHead>
              {parameters.map((param) => (
                <TableHead key={`param_${param.ms_id_parameter}`}>
                  {param.ms_nama_parameter}
                </TableHead>
              ))}
              <TableHead style={{ width: "250px" }}>Expected</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testCases.map((test, index) => (
              <TableRow
                key={test.tr_id_test_case}
                className={index % 2 === 0 ? "bg-blue-100" : "bg-blue-200"}
                style={{ fontSize: "14px" }}
              >
                <TableCell>{test.tr_no}</TableCell>
                <TableCell style={{ width: "250px", whiteSpace: "nowrap" }}>
                  {test.tr_object_pengujian}
                </TableCell>
                {JSON.parse(test.tr_data_test_input).map(
                  (paramData: { param_value: string }, i: number) => (
                    <TableCell key={i} style={{ whiteSpace: "nowrap" }}>
                      <div>
                        <span>{paramData.param_value}</span>
                      </div>
                    </TableCell>
                  )
                )}
                <TableCell style={{ width: "200px", whiteSpace: "nowrap" }}>
                  {test.tr_expected_result}
                </TableCell>
                <TableCell className="flex items-center space-x-2">
                  <Button
                    onClick={() => handleEdit(test.tr_id_test_case)}
                    className="text-blue-500 p-0"
                    style={{ fontSize: "14px" }}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    onClick={() => handleDelete()}
                    className="text-red-500 p-0"
                    style={{ fontSize: "14px" }}
                  >
                    <FaTrash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {editingTestId && (
        <EditTestCaseFormDialog
          isDialogOpen={true}
          setIsDialogOpen={setIsFormDialogOpen}
          testCase={
            testCases.find((test) => test.tr_id_test_case === editingTestId) ||
            null
          }
          parameters={parameters}
        />
      )}
      <CardFooter className="flex justify-between">
        {/* Konten footer card di sini */}
      </CardFooter>
    </Card>
  );
};

export default AddTestCaseCard;
