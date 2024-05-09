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
  } from "@/components/ui/table"
  

export function AddTestCaseCard() {
  return (
    <Card className="h-full w-full">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Test Case</CardTitle>
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
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
            </TableBody>
        </Table>

      </CardContent>
      <CardFooter className="flex justify-between">
        {/* Konten footer card di sini */}
      </CardFooter>
    </Card>
  );
}
