import { useState, useEffect } from 'react';
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
    const [errorMessage, setErrorMessage] = useState("");

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

    useEffect(() => {
        if (!isDialogOpen) {
            form.reset();
            setShowSuccessMessage(false);
            setErrorMessage("");
        }
    }, [isDialogOpen, form]);

    return (
        <>
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
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="nim"
                                    rules={{
                                        required: "NIM harus diisi!",
                                        pattern: {
                                            value: /^[0-9]{9}$/,
                                            message: "Format NIM tidak sesuai!"
                                        }
                                    }}
                                    render={({ field, fieldState: { error } }) => (
                                        <FormItem>
                                            <div className="flex items-center">
                                                <FormLabel className="w-1/6 flex items-center space-x-2">
                                                    <span>Nim</span> 
                                                    <span className="text-red-500">*</span>
                                                    <span>:</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="mt-1 block w-full rounded border-gray-300 bg-gray-50 shadow-sm" />
                                                </FormControl>
                                            </div>
                                            {error && (
                                                <p className="text-red-600 pl-20 text-sm mt-1">
                                                    {error.message}
                                                </p>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="nama"
                                    rules={{
                                        required: "Nama harus diisi!",
                                        pattern: {
                                            value: /^[a-zA-Z\s]{1,50}$/,
                                            message: "Nama tidak sesuai!"
                                        }
                                    }}
                                    render={({ field, fieldState: { error } }) => (
                                        <FormItem>
                                            <div className="flex items-center">
                                                <FormLabel className="w-1/6 flex items-center space-x-2">
                                                    <span>Nama</span> 
                                                    <span className="text-red-500">*</span>
                                                    <span>:</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="mt-1 block w-full rounded border-gray-300 bg-gray-50 shadow-sm" />
                                                </FormControl>
                                            </div>
                                            {error && (
                                                <p className="text-red-600 pl-20 text-sm mt-1">
                                                    {error.message}
                                                </p>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="kelas"
                                    rules={{
                                        required: "Kelas harus diisi!",
                                        pattern: {
                                            value: /^[A-Z]$/,
                                            message: "Kelas tidak sesuai!"
                                        }
                                    }}
                                    render={({ field, fieldState: { error } }) => (
                                        <FormItem>
                                            <div className='flex items-center'>
                                                <FormLabel className="w-1/6 flex items-center space-x-2">
                                                    <span>Kelas</span> 
                                                    <span className="text-red-500">*</span>
                                                    <span>:</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="mt-1 block w-full rounded border-gray-300 bg-gray-50 shadow-sm" />
                                                </FormControl>
                                            </div>
                                            {error && (
                                                <p className="text-red-600 pl-20 text-sm mt-1">
                                                    {error.message}
                                                </p>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="prodi"
                                    rules={{ required: "Prodi harus diisi!" }}
                                    render={({ field, fieldState: { error } }) => (
                                        <FormItem>
                                            <div className='flex items-center'>
                                                <FormLabel className="w-1/6 flex items-center space-x-2">
                                                    <span>Prodi</span> 
                                                    <span className="text-red-500">*</span>
                                                    <span>:</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="mt-1 block w-full rounded border-gray-300 bg-gray-50 shadow-sm" />
                                                </FormControl>
                                            </div>
                                            {error && (
                                                <p className="text-red-600 pl-20 text-sm mt-1">
                                                    {error.message}
                                                </p>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                {errorMessage && (
                                    <div className="bg-red-100 text-red-700 p-2 mb-4 text-sm">
                                        {errorMessage}
                                    </div>
                                )}
                                <div className="flex justify-end gap-4">
                                    <Button
                                        type="button"
                                        className="bg-transparent border border-blue-800 text-blue-800 rounded-full px-4 py-2 hover:bg-blue-100"
                                        onClick={() => setIsDialogOpen(false)}
                                    >
                                        Kembali
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-blue-800 text-white rounded-full px-4 py-2 hover:bg-blue-700"
                                    >
                                        Simpan
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </DialogHeader>
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
        </>
    );
};

export default AddStudentDataForm;
