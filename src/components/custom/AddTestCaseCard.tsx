import React, { useState, useEffect } from "react";
import TestCaseFormDialog from "./TestCaseFormDialog";
import { useNavigate } from "react-router-dom";
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
import { FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";

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
  const [isEditFormDialogOpen, setIsEditFormDialogOpen] = useState(false);
  const [editingTestId, setEditingTestId] = useState<string | null>(null);
  const [deletingTestId, setDeletingTestId] = useState<string | null>(null);
  const [executedTestCase, setExecutedTestCase] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [minimumCoverage, setMinimumCoverage] = useState<number>(0);
  const [percentageCoverage, setPercentageCoverage] = useState<number>(0);

  const navigate = useNavigate();

  const DeleteConfirmationDialog: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
  }> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded shadow-lg">
          <h2 className="text-lg">Confirm Delete</h2>
          <p>Are you sure you want to delete this test case?</p>
          <div className="flex justify-end mt-4">
            <Button onClick={onClose} className="mr-2">
              Cancel
            </Button>
            <Button onClick={onConfirm} className="bg-red-500 text-white">
              Delete
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const modulId = import.meta.env.VITE_MODULE_ID;

  useEffect(() => {
    const fetchParameters = async () => {
      try {
        const response = await fetch(`${apiUrl}/modul/detail/${modulId}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        });

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
        const response = await fetch(`${apiUrl}/modul/TestCase/${modulId}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        });

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
    // setIsFormDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeletingTestId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingTestId) return;

    try {
      console.log("Deleting test case with ID:", deletingTestId); // Menampilkan ID test case pada console.log

      const response = await fetch(`${apiUrl}/modul/deleteTestCase`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ id_test_case: deletingTestId }), // Menggunakan format yang diharapkan oleh API
      });

      const responseData = await response.json();
      console.log("Response data:", responseData); // Log response data

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("Forbidden: Access is denied");
        } else if (response.status === 422) {
          throw new Error(`Unprocessable Entity: ${responseData.detail}`);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      setTestCases((prevTestCases) =>
        prevTestCases.filter((test) => test.tr_id_test_case !== deletingTestId)
      );
      setDeleteMessage("Test case deleted successfully.");
      const timer = setTimeout(() => {
        setDeleteMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting test case:", error);
        alert(`Error deleting test case: ${error.message}`);
      } else {
        console.error("Unknown error:", error);
        alert("An unknown error occurred.");
      }
    } finally {
      setIsDeleteDialogOpen(false);
      setDeletingTestId(null);
    }
  };

  const handleExecuteTestCase = async () => {
    try {
      const response = await fetch(`${apiUrl}/modul/run/${modulId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      });
  
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("Forbidden: Access is denied");
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
  
      const result = await response.json();
      console.log("Hasil eksekusi test case:", result);
      setPercentageCoverage(result.coverage_score);
      setMinimumCoverage(result.minimum_coverage_score);
  
      if (result.coverage_score < result.minimum_coverage_score) {
        // Kurang dari minimum coverage, arahkan ke halaman eksekusi test case fail page dengan menyertakan nilai coverage
        navigate(`/fail?percentageCoverage=${result.coverage_score}&minimumCoverage=${result.minimum_coverage_score}`);
      } else {
        // Lebih dari atau sama dengan minimum coverage, arahkan ke halaman eksekusi test case pass page dengan menyertakan nilai coverage dan poin yang dihasilkan
        navigate(`/pass?percentageCoverage=${result.coverage_score}&minimumCoverage=${result.minimum_coverage_score}&points=${result.points}`);
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
        <CardTitle className="text-base module-title m-0">Test Case</CardTitle>
        <div className="flex space-x-2 items-center justify-end">
          <Button
            variant="outline"
            className="bg-white text-blue-800 border-2 border-blue-800 rounded-[10] hover:bg-blue-800 hover:text-white"
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

      {deleteMessage && (
        <div className="bg-green-100 text-green-700 p-2 text-sm">
          {deleteMessage}
        </div>
      )}

      <CardContent>
        <Table className="text-sm border-collapse border border-black">
          <TableHeader>
            <TableRow className="bg-blue-800 text-sm text-white py-2 hover:bg-blue-600">
              <TableHead className="border border-black">No</TableHead>
              <TableHead className="border border-black w-52">Objective Testing</TableHead>
              {parameters.map((param) => (
                <TableHead key={`param_${param.ms_id_parameter}`} className="border border-black">
                  {param.ms_nama_parameter}
                </TableHead>
              ))}
              <TableHead className="border border-black w-64">Expected</TableHead>
              <TableHead className="border border-black">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testCases.map((test, index) => (
              <TableRow
                key={test.tr_id_test_case}
                className={`${index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'} text-sm leading-tight`}
              >
                <TableCell className="py-2 border border-black">{test.tr_no}</TableCell>
                <TableCell className="py-2 border border-black w-64 whitespace-nowrap">
                  {test.tr_object_pengujian}
                </TableCell>
                {JSON.parse(test.tr_data_test_input).map(
                  (paramData: { param_value: string }, i: number) => (
                    <TableCell key={i} className="py-2 border border-black whitespace-nowrap">
                      <div>
                        <span>{paramData.param_value}</span>
                      </div>
                    </TableCell>
                  )
                )}
                <TableCell className="py-2 border border-black w-52 whitespace-nowrap">
                  {test.tr_expected_result}
                </TableCell>
                <TableCell className="py-2 border-t border-black flex items-center justify-between px-2">
                  <Button
                    onClick={() => handleEdit(test.tr_id_test_case)}
                    className="text-blue-500 text-base p-1"
                  >
                    <EditTestCaseFormDialog
                      editingTestId={editingTestId}
                      isDialogOpen={isEditFormDialogOpen}
                      setIsDialogOpen={setIsEditFormDialogOpen}
                    />
                  </Button>
                  <Button
                    onClick={() => handleDelete(test.tr_id_test_case)}
                    className="text-red-500 text-base p-1"
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

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />
    </Card>
  );
};

export default AddTestCaseCard;
