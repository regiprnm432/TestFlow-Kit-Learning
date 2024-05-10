import { Button } from "@/components/ui/button";
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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import "../../index.css";

const AddTestCaseCard = () => {
  // Dummy data untuk tabel (boleh diganti dengan data yang sesuai)
  const testData = [
    {
      id: 1,
      objective: "Objective 1",
      parameters: ["Param 1", "Param 2"],
      expected: "Expected 1",
    },
    {
      id: 2,
      objective: "Objective 2",
      parameters: ["Param 1", "Param 2"],
      expected: "Expected 2",
    },
  ];

  return (
    <Card className="h-[30vh] w-full overflow-auto ">
      <CardHeader className="flex justify-between">
        <CardTitle className="module-title">Test Case</CardTitle>
        <div className="flex space-x-2 items-center">
          <div className="space-x-2">
            <Button variant="outline" className="text-black">
              Eksekusi Test Case
            </Button>
            <Button className="bg-blue-500 text-white">Tambah</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-800 text-white">
              <TableHead>No</TableHead>
              <TableHead>Objective Testing</TableHead>
              {testData.length > 0 &&
                testData[0].parameters.map((param, index) => (
                  <TableHead key={index}>Parameter {index + 1}</TableHead>
                ))}
              <TableHead>Expected</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testData.map((test, index) => (
              <TableRow key={test.id} className={index % 2 === 0 ? "bg-blue-100" : "bg-blue-200"}>
                <TableCell>{test.id}</TableCell>
                <TableCell>{test.objective}</TableCell>
                {test.parameters.map((param, index) => (
                  <TableCell key={index}>{param}</TableCell>
                ))}
                <TableCell>{test.expected}</TableCell>
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
