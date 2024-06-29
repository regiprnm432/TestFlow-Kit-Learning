import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaPlus } from 'react-icons/fa';
import { 
    Form, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormControl,
} from '@/components/ui/form';

interface FormData {
  nim: string;
  nama: string;
  kelas: string;
  prodi: string;
}

interface AddStudentFormProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}

const AddStudentDataForm = ({
  isDialogOpen,
  setIsDialogOpen,
}: AddStudentFormProps) => {

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const form = useForm<FormData>({
        mode: "onBlur",
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
        setShowSuccessMessage(true);
        setTimeout(() => {
            setShowSuccessMessage(false);
            setIsDialogOpen(false);
        }, 3000); // Hide the message after 3 seconds
    };

    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
            <Button
            className="flex items-center bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700"
            style={{ fontSize: "14px" }}
            >
            <FaPlus className="mr-2" />
            Tambah
            </Button>
      </DialogTrigger>
        <DialogContent className="bg-white p-10 rounded-lg shadow-lg max-w-2xl mx-auto">
            <DialogHeader>
                <DialogTitle className="text-lg text-center font-bold mb-4">Form Tambah Data Mahasiswa</DialogTitle>
            </DialogHeader>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField 
                control={form.control} 
                name="nim"
                rules={{required: "NIM Mahasiswa harus terisi"}}
                render={({ field, fieldState: { error } }) => (
                    <FormItem className="flex items-center">
                    <FormLabel className="w-1/6 flex items-center space-x-2">
                        <span>Nim</span> 
                        <span className="text-red-500">*</span>
                        <span>:</span>
                    </FormLabel>
                    <FormControl className="w-5/6">
                        <Input {...field} className="mt-1 block w-full rounded border-gray-300 bg-gray-50 shadow-sm" />
                        {error && (
                            <p className="text-red-600 text-sm mt-1">
                              {error.message}
                            </p>
                        )}
                    </FormControl>
                    </FormItem>
                )}
                />
                <FormField 
                control={form.control} 
                name="nama"
                rules={{required: "Nama Mahasiswa harus terisi"}}
                render={({ field, fieldState: { error } }) => (
                    <FormItem className="flex items-center">
                    <FormLabel className="w-1/6 flex items-center space-x-2">
                        <span>Nama</span> 
                        <span className="text-red-500">*</span>
                        <span>:</span>
                    </FormLabel>
                    <FormControl className="w-5/6">
                        <Input {...field} className="mt-1 block w-full rounded border-gray-300 bg-gray-50 shadow-sm" />
                        {error && (
                            <p className="text-red-600 text-sm mt-1">
                              {error.message}
                            </p>
                        )}
                    </FormControl>
                    </FormItem>
                )}
                />
                <FormField 
                control={form.control} 
                name="kelas"
                rules={{required: "Kelas Mahasiswa harus terisi"}}
                render={({ field, fieldState: { error } }) => (
                    <FormItem className="flex items-center">
                    <FormLabel className="w-1/6 flex items-center space-x-2">
                        <span>Kelas</span> 
                        <span className="text-red-500">*</span>
                        <span>:</span>
                    </FormLabel>
                    <FormControl className="w-5/6">
                        <Input {...field} className="mt-1 block w-full rounded border-gray-300 bg-gray-50 shadow-sm" />
                        {error && (
                            <p className="text-red-600 text-sm mt-1">
                              {error.message}
                            </p>
                        )}
                    </FormControl>
                    </FormItem>
                )}
                />
                <FormField 
                control={form.control} 
                name="prodi"
                rules={{required: "Prodi Mahasiswa harus terisi"}}
                render={({ field, fieldState: { error } }) => (
                    <FormItem className="flex items-center">
                    <FormLabel className="w-1/6 flex items-center space-x-2">
                        <span>Prodi</span> 
                        <span className="text-red-500">*</span>
                        <span>:</span>
                    </FormLabel>
                    <FormControl className="w-5/6">
                        <Input {...field} className="mt-1 block w-full rounded border-gray-300 bg-gray-50 shadow-sm" />
                        {error && (
                            <p className="text-red-600 text-sm mt-1">
                              {error.message}
                            </p>
                        )}
                    </FormControl>
                    </FormItem>
                )}
                />
                <div className="flex justify-end space-x-4">
                <Button type="button" className="bg-transparent border border-blue-800 text-blue-800 rounded-full px-4 py-2 hover:bg-blue-100" onClick={() => setIsDialogOpen(false)}>
                    Kembali
                </Button>
                <Button type="submit" className="bg-blue-800 text-white rounded-full px-4 py-2 hover:bg-blue-700">
                    Simpan
                </Button>
                </div>
            </form>
            </Form>
            {showSuccessMessage && (
            <div className="absolute inset-x-0 top-0 flex items-center justify-center h-full bg-black bg-opacity-30">
              <div className="bg-blue-800 p-4 rounded-lg shadow-lg">
                <p className="text-white font-bold">
                  Data Mahasiswa Baru Berhasil Disimpan!
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
};

export default AddStudentDataForm;
