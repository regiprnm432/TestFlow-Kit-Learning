import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
    Form, 
    FormField, 
    FormItem,
    FormLabel,
    FormControl,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface FormDialogProps {
    isDialogOpen: boolean;
    setIsDialogOpen: (open: boolean) => void;
}

const TestCaseFormDialog = ({ isDialogOpen, setIsDialogOpen }: FormDialogProps) => {
    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };
    const form = useForm();

    const handleSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-blue-800 text-white" onClick={handleOpenDialog}>Tambah</Button>
                </DialogTrigger>
                <DialogContent className="" style={{ backgroundColor: "white" }}>
                    <DialogHeader>
                        <DialogTitle>Tambah Test Case</DialogTitle>
                        <Form {...form}>
                            <form className="space-y-8" onSubmit={form.handleSubmit(handleSubmit)}>
                            <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Objekif Pengujian</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormLabel>Parameter 1</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormLabel>Parameter 2</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormLabel>Expected</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                            />
                                <div className="flex justify-end gap-2">
                                    <Button onClick={() => setIsDialogOpen(false)} className="border border-black hover:bg-gray-200">Kembali</Button>
                                    <Button className="bg-blue-800 text-white border border-black hover:bg-gray-200" type="submit">Simpan</Button>
                                </div>
                            </form>
                        </Form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default TestCaseFormDialog;
