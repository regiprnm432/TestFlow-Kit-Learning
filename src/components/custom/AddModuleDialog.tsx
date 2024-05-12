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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
  } from "@/components/ui/select"
  

interface FormDialogProps {
    isDialogOpen: boolean;
    setIsDialogOpen: (open: boolean) => void;
}

const AddModuleDialog = ({ isDialogOpen, setIsDialogOpen }: FormDialogProps) => {

    const form = useForm();

    const handleSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                <Button
                    className="bg-blue-800 text-white border-2 border-blue-800 rounded-[20] pt-0 pb-0 "
                    style={{ fontSize: "14px" }}
                >Tambah
                </Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <DialogTitle>Tambah Modul Program</DialogTitle>
                        <Form {...form}>
                            <form className="space-y-8" onSubmit={form.handleSubmit(handleSubmit)}>
                            <FormField
                            control={form.control}
                            name="modul-program"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Modul</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormLabel>Deskripsi Modul</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormLabel>Jenis Modul</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormLabel>Jumlah Parameter</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormLabel>Tipe Data Kembalian</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormLabel>Kode Program</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormLabel>Tingkat Kesulitan</FormLabel>
                                    <FormControl>
                                        <Select>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Pilih tingkat kesulitan" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white">
                                                <SelectGroup>
                                                    <SelectItem value="mudah">Mudah</SelectItem>
                                                    <SelectItem value="sedang">Sedang</SelectItem>
                                                    <SelectItem value="sulit">Sulit</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
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

export default AddModuleDialog;
