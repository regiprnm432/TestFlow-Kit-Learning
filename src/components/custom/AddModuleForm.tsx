import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm} from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  moduleName: z.string().min(2, { message: "Nama modul harus setidaknya 2 karakter." }),
  moduleDescription: z.string().min(5, { message: "Deskripsi modul harus setidaknya 5 karakter." }),
  moduleType: z.string().min(2, { message: "Jenis modul harus setidaknya 2 karakter." }),
  paramCount: z.number().min(0, { message: "Jumlah parameter harus 0 atau lebih." }),
  paramName: z.string().min(2, { message: "Nama parameter harus setidaknya 2 karakter." }),
  paramType: z.string().min(1, { message: "Tipe data parameter harus dipilih." }),
  validationRule: z.string().min(1, { message: "Aturan validasi harus dipilih." }),
  returnType: z.string().min(1, { message: "Tipe data kembalian harus dipilih." }),
  sourceCode: z.string().min(1, { message: "Source code harus diunggah." }),
  className: z.string().min(2, { message: "Nama class harus setidaknya 2 karakter." }),
  functionName: z.string().min(2, { message: "Nama fungsi harus setidaknya 2 karakter." }),
  complexityLevel: z.string().min(1, { message: "Tingkat kesulitan harus dipilih." }),
});

interface AddModuleFormProps {
  onAddModule: (module: any) => void;
}

const AddModuleForm: React.FC<AddModuleFormProps> = ({ onAddModule }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    onAddModule(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-10 w-full mx-auto bg-white shadow-md rounded-md">
        <div className="grid grid-cols-2 gap-10 pb-8">
            <div>
                <FormField
                    control={form.control}
                    name="moduleName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nama Modul</FormLabel>
                            <FormControl>
                                <Input {...field} className="border rounded p-2 w-full bg-gray-50" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="moduleType"
                    render={({ field }) => (
                    <FormItem className="flex items-center">
                        <FormLabel className="w-1/3">Jenis Modul :</FormLabel>
                        <FormControl className="flex-1">
                        <Input {...field} className="border rounded p-2 w-full bg-gray-50" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="paramCount"
                    render={({ field }) => (
                    <FormItem className="flex items-center mt-4">
                        <FormLabel className="w-1/3">Jumlah Parameter :</FormLabel>
                        <FormControl className="flex-1">
                        <Input
                            type="number"
                            {...field}
                            className="border rounded p-2 w-32 bg-gray-50"
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
            <div className="flex flex-col h-full">
                <FormField
                    control={form.control}
                    name="moduleDescription"
                    render={({ field }) => (
                        <FormItem className="flex-grow">
                            <FormLabel>Deskripsi Modul</FormLabel>
                            <FormControl className="h-full">
                                <Input {...field} className="border rounded p-2 w-full h-full bg-gray-50" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
        <div className="flex gap-4 bg-blue-50 rounded p-4">
            <FormField
                control={form.control}
                name="paramName"
                render={({ field }) => (
                <FormItem className="flex items-center gap-2 flex-1">
                    <FormLabel className="w-1/3">Nama Parameter</FormLabel>
                    <FormControl className="w-2/3">
                    <Input {...field} className="border rounded p-2 w-full bg-white" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="paramType"
                render={({ field }) => (
                <FormItem className="flex items-center gap-2 flex-1">
                    <FormLabel className="w-1/3">Tipe Data</FormLabel>
                    <FormControl className="w-2/3">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Pilih" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                        <SelectGroup>
                            <SelectItem value="int">Int</SelectItem>
                            <SelectItem value="float">Float</SelectItem>
                            <SelectItem value="boolean">Boolean</SelectItem>
                            <SelectItem value="char">Char</SelectItem>
                            <SelectItem value="string">String</SelectItem>
                        </SelectGroup>
                        </SelectContent>
                    </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="validationRule"
                render={({ field }) => (
                <FormItem className="flex items-center gap-2 flex-1">
                    <FormLabel className="w-1/3">Aturan Validasi</FormLabel>
                    <FormControl className="w-2/3">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Pilih" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                        <SelectGroup>
                            <SelectItem value="not_null">Not Null</SelectItem>
                            <SelectItem value="range">Range</SelectItem>
                            <SelectItem value="length">Length</SelectItem>
                        </SelectGroup>
                        </SelectContent>
                    </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>

        <div className="grid grid-cols-2 gap-10 pb-8">
        <div className="flex flex-col space-y-4">
            <FormField
            control={form.control}
            name="returnType"
            render={({ field }) => (
                <FormItem className="flex items-center space-x-4">
                <FormLabel className="w-1/3">Tipe Data Kembalian :</FormLabel>
                <FormControl className="w-auto flex-1">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-32 bg-gray-50"> {/* Gunakan w-32 untuk mengecilkan */}
                        <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectGroup>
                        <SelectItem value="int">Int</SelectItem>
                        <SelectItem value="float">Float</SelectItem>
                        <SelectItem value="boolean">Boolean</SelectItem>
                        <SelectItem value="char">Char</SelectItem>
                        <SelectItem value="string">String</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                    </Select>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="sourceCode"
            render={({ field }) => (
                <FormItem className="flex items-center space-x-4">
                <FormLabel className="w-1/3">Source Code :</FormLabel>
                <FormControl className="flex-1">
                    <Input
                    type="file"
                    onChange={(e) =>
                        field.onChange(e.target.files?.[0]?.name || '')
                    }
                    className="border rounded p-2 w-full bg-gray-50"
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="complexityLevel"
            render={({ field }) => (
                <FormItem className="flex items-center space-x-4">
                <FormLabel className="w-1/3">Tingkat Kesulitan :</FormLabel>
                <FormControl className="flex-1">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-32 bg-gray-50">
                        <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-50">
                        <SelectGroup>
                        <SelectItem value="easy">Mudah</SelectItem>
                        <SelectItem value="medium">Sedang</SelectItem>
                        <SelectItem value="hard">Sulit</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                    </Select>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <div className="flex flex-col space-y-4">
            <FormField
            control={form.control}
            name="className"
            render={({ field }) => (
                <FormItem className="flex items-center space-x-4">
                <FormLabel className="w-1/3">Nama Class :</FormLabel>
                <FormControl className="flex-1">
                    <Input {...field} className="border rounded p-2 w-full bg-gray-50" />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="functionName"
            render={({ field }) => (
                <FormItem className="flex items-center space-x-4">
                <FormLabel className="w-1/3">Nama Fungsi :</FormLabel>
                <FormControl className="flex-1">
                    <Input {...field} className="border rounded p-2 w-full bg-gray-50" />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        </div>


        <div className="flex justify-end space-x-4">
            <Button type="reset" className="bg-blue-50 text-blue-700 border-2 border-blue-700 py-2 px-4 rounded-full hover:bg-blue-700 hover:text-blue-50">Batal</Button>
            <Button type="submit" className="bg-blue-50 text-blue-700 border-2 border-blue-700 py-2 px-4 rounded-full hover:bg-blue-700 hover:text-blue-50">Simpan</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddModuleForm;
