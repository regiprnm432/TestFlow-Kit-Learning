import React, {useEffect, useState} from 'react';
import { useForm, useFieldArray } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
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

interface AddModuleFormProps {
  onAddModule: (module: any, mode: string, fileSourceCode:any) => void;
  onCancel: () => void;
  idModul:string
}
interface ComboData {
  label: string;
  value: string;
}
const AddModuleForm: React.FC<AddModuleFormProps> = ({ onAddModule, onCancel, idModul}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  let apiKey = import.meta.env.VITE_API_KEY;
  // const modulId = import.meta.env.VITE_MODULE_ID;
  const sessionData = localStorage.getItem('session')
  if (sessionData != null){
      const session = JSON.parse(sessionData);
      apiKey = session.token
  }
  const defaultCombo = [{value:"pilih", label:"pilih"}];
  const [fileSourceCode, setFileSourceCode] = useState(null);
  const [comboDataType, setComboDataType] = useState<ComboData[]>(defaultCombo);
  const [comboValidationType, setComboValidationType] = useState<ComboData[]>(defaultCombo);
  const [comboModuleType, setComboModuleType] = useState<ComboData[]>(defaultCombo);
  const [comboLevel, setComboLevel] = useState<ComboData[]>(defaultCombo);
  const handleFileChange = (e:any, field:any) => {
    field.onChange(e.target.files?.[0]?.name || '')
    if (e.target.files != null){
      setFileSourceCode(e.target.files[0])
    }
  };
  const fetchDataModule = async () => {
        try {
          const response = await fetch(`${apiUrl}/modul/detail/${idModul}`, {
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
          const data = await response.json();
          form.setValue("moduleName", data.data.data_modul.ms_nama_modul);
         } catch (error) {
          console.error("Error fetching module name:", error);
        }
  };

  const fetchDataComboDataType = async () => {
    try {
      const response = await fetch(`${apiUrl}/combo/data_type`, {
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
      const data = await response.json();
      setComboDataType(data.data);
     } catch (error) {
      console.error("Error fetching module name:", error);
    }
  };
  const fetchDataComboValidationType = async () => {
    try {
      const response = await fetch(`${apiUrl}/combo/validasi_parameter`, {
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
      const data = await response.json();
      setComboValidationType(data.data);
     } catch (error) {
      console.error("Error fetching module name:", error);
    }
  };
  const fetchDataComboModuleType = async () => {
    try {
      const response = await fetch(`${apiUrl}/combo/module_type`, {
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
      const data = await response.json();
      setComboModuleType(data.data);
     } catch (error) {
      console.error("Error fetching module name:", error);
    }
  };
  const fetchDataComboLevel = async () => {
    try {
      const response = await fetch(`${apiUrl}/combo/tingkat_kesulitan`, {
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
      const data = await response.json();
      setComboLevel(data.data);
     } catch (error) {
      console.error("Error fetching module name:", error);
    }
  };

  const form = useForm({
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "parameters",
  });

  const paramCount = form.watch("paramCount");

  useEffect(() => {
    if (paramCount > fields.length) {
      for (let i = fields.length; i < paramCount; i++) {
        append({ paramName: "", paramType: "", validationRule: "" });
      }
    } else if (paramCount < fields.length) {
      for (let i = fields.length; i > paramCount; i--) {
        remove(i - 1);
      }
    }
    if (idModul != "0"){  
      fetchDataModule()
    }
    fetchDataComboDataType()
    fetchDataComboModuleType()
    fetchDataComboLevel()
    fetchDataComboValidationType()
  }, [paramCount, fields.length, append, remove]);

  const onSubmit = (data: any) => {
    let mode = "add";
    if (idModul != "0"){  
      mode = "edit"
    }
    onAddModule(data, mode, fileSourceCode);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-10 w-full mx-auto bg-white shadow-md rounded-md">
        <div className="grid grid-cols-2 gap-10 pb-8">
            <div>
                <FormField
                    control={form.control}
                    name="moduleName"
                    rules={{
                      required: "Nama Modul harus diisi!",
                      maxLength: { value: 50, message: "Nama Modul tidak sesuai!" }
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <FormItem>
                            <FormLabel>
                                Nama Modul
                                <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input {...field} className="border rounded p-2 w-full bg-gray-50" />
                            </FormControl>
                            <FormDescription className="text-xs text-gray-500 mt-1">*Nama modul harus unik, belum pernah dibuat sebelumnya</FormDescription>
                            {error && (
                              <p className="text-red-600 text-sm mt-1">
                                {error.message}
                                  </p>
                            )}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="moduleType"
                    rules={{ required: "Jenis modul harus dipilih!" }}
                    render={({ field,  fieldState: { error } }) => (
                    <FormItem className="flex items-center mt-4">
                        <FormLabel className="w-1/3">Jenis Modul :</FormLabel>
                        <FormControl className="flex-1">
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Pilih" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectGroup>
                            {comboModuleType.map((dataCombo) => (
                              <SelectItem value={dataCombo.value}>{dataCombo.label}</SelectItem>
                            ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        </FormControl>
                        {error && (
                          <p className="text-red-600 text-sm mt-1">
                            {error.message}
                          </p>
                        )}
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="paramCount"
                    rules={{
                      required: "Jumlah Parameter harus diisi!",
                      pattern: { 
                        value: /^[0-9]+$/, 
                        message: "Jumlah Parameter tidak sesuai!" 
                      }
                    }}
                    render={({ field, fieldState: { error } }) => (
                    <FormItem className="flex items-center mt-4">
                        <FormLabel className="w-1/3">
                            Jumlah Parameter 
                            <span className="text-red-500">*</span>
                            :
                         </FormLabel>
                        <FormControl className="flex-1">
                        <div>
                            <Input
                                type="number"
                                {...field}
                                className="border rounded p-2 w-32 bg-gray-50"
                            />
                            <FormDescription className="text-xs text-gray-500 mt-1">*Jumlah parameter minimal 1</FormDescription>
                            {error && (
                              <p className="text-red-600 text-sm mt-1">
                                {error.message}
                              </p>
                            )}
                        </div>
                        </FormControl>
                    </FormItem>
                    )}
                />
            </div>
            <div className="flex flex-col h-full">
                <FormField
                    control={form.control}
                    name="moduleDescription"
                    rules={{
                      required: "Deskripsi Modul harus diisi!",
                      maxLength: { value: 100, message: "Deskripsi Modul tidak sesuai!" }
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <FormItem className="flex-grow">
                            <FormLabel>Deskripsi Modul</FormLabel>
                            <FormControl className="h-full">
                                <Input {...field} className="border rounded p-2 w-full h-full bg-gray-50" />
                            </FormControl>
                            {error && (
                              <p className="text-red-600 text-sm mt-1">
                                {error.message}
                              </p>
                            )}
                        </FormItem>
                    )}
                />
            </div>
        </div>
        <div>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-4 bg-blue-50 rounded p-4">
            <FormField
              control={form.control}
              name={`parameters.${index}.paramName`}
              rules={{
                required: "Nama Parameter harus diisi!",
                minLength: { value: 2, message: "Nama Parameter harus setidaknya 2 karakter." }
              }}
              render={({ field, fieldState: { error }  }) => (
                <FormItem>
                  <div className="flex items-center gap-2 flex-1">
                  <FormLabel className="w-1/3">
                    Nama Parameter
                    <span className="text-red-500">*</span>
                    :
                  </FormLabel>
                  <FormControl className="w-2/3">
                    <Input {...field} className="border rounded p-2 w-full bg-white" />
                  </FormControl>
                  </div>
                  {error && (
                    <p className="text-red-600 text-sm mt-1">
                        {error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`parameters.${index}.paramType`}
              rules={{ required: "Tipe data parameter harus dipilih!" }}
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <div className="flex items-center gap-2 flex-1">
                  <FormLabel className="w-1/3">
                    Tipe Data
                    <span className="text-red-500">*</span>
                    :
                  </FormLabel>
                  <FormControl className="w-2/3">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Pilih" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup>
                        {comboDataType.map((dataCombo) => (
                          <SelectItem value={dataCombo.value}>{dataCombo.label}</SelectItem>
                        ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  </div>
                  {error && (
                    <p className="text-red-600 text-sm mt-1">
                        {error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`parameters.${index}.validationRule`}
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
                        {comboValidationType.map((dataCombo) => (
                              <SelectItem value={dataCombo.value}>{dataCombo.label}</SelectItem>
                        ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
        <FormDescription className="text-xs text-gray-500 mt-2">*Urutan parameter dan tipe data harus sama dengan source code</FormDescription>
        </div>
    
        <div className="grid grid-cols-2 gap-10 pb-8">
        <div className="flex flex-col space-y-4">
            <FormField
            control={form.control}
            name="returnType"
            rules={{ required: "Tipe data kembalian harus diisi!" }}
            render={({ field, fieldState: { error } }) => (
                <FormItem>
                <div className="flex items-center space-x-4">
                <FormLabel className="w-1/3">
                    Tipe Data Kembalian
                    <span className="text-red-500">*</span>
                    :
                 </FormLabel>
                <FormControl className="w-auto flex-1">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-32 bg-gray-50"> 
                        <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectGroup>
                        {comboDataType.map((dataCombo) => (
                          <SelectItem value={dataCombo.value}>{dataCombo.label}</SelectItem>
                        ))}
                        </SelectGroup>
                    </SelectContent>
                    </Select>
                </FormControl>
                </div>
                {error && (
                    <p className="text-red-600 text-sm mt-1">
                        {error.message}
                    </p>
                  )}
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="sourceCode"
            rules={{
              required: "Source code harus diunggah!",
              // validate: {
              //   fileSize: () => {
              //     if (fileSourceCode && fileSourceCode.size > 2097152) {
              //       return "Ukuran maksimal file adalah 2 MB!";
              //     }
              //     return true;
              //   }
              // }
            }}
            render={({ field }) => (
                <FormItem className="flex items-center space-x-4">
                <FormLabel className="w-1/3">
                    Source Code
                    <span className="text-red-500">*</span>
                    :
                 </FormLabel>
                <FormControl className="flex-1">
                    <div>
                        <Input
                            type="file"
                            onChange={(e) => handleFileChange(e, field)}
                            className="border rounded p-2 w-full bg-gray-50"
                        />
                        <FormDescription className="text-xs text-gray-500 mt-1">File harus berekstensi .java dan memiliki ukuran maksimal 2MB</FormDescription>
                    </div>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="complexityLevel"
            render={({ field, fieldState: {error} }) => (
                <FormItem className="flex items-center space-x-4">
                <FormLabel className="w-1/3">
                    Tingkat Kesulitan
                    <span className="text-red-500">*</span>
                    :
                 </FormLabel>
                <FormControl className="flex-1">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-32 bg-gray-50">
                        <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectGroup>
                        {comboLevel.map((dataCombo) => (
                          <SelectItem value={dataCombo.value}>{dataCombo.label}</SelectItem>
                        ))}
                        </SelectGroup>
                    </SelectContent>
                    </Select>
                </FormControl>
                {error && (
                    <p className="text-red-600 text-sm mt-1">
                        {error.message}
                    </p>
                  )}
                </FormItem>
            )}
            />
        </div>
        <div className="flex flex-col space-y-4">
            <FormField
            control={form.control}
            name="className"
            rules={{
              required: "Nama Class harus diisi!",
              pattern: {
                value: /^[a-zA-Z_][a-zA-Z0-9_]*$/,
                message: "Nama Class Tidak sesuai!"
              }
            }}
            render={({ field, fieldState: {error} }) => (
                <FormItem className="flex items-center space-x-4">
                <FormLabel className="w-1/3">
                    Nama Class
                    <span className="text-red-500">*</span>
                    :
                 </FormLabel>
                <FormControl className="flex-1">
                    <div>
                        <Input {...field} className="border rounded p-2 w-full bg-gray-50" />
                        <FormDescription className="text-xs text-gray-500 mt-1">*Nama Class harus sama dengan yang ada pada source code & mengikuti standar coding convention</FormDescription>
                        {error && (
                          <p className="text-red-600 text-sm mt-1">
                              {error.message}
                          </p>
                        )}
                    </div>
                </FormControl>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="functionName"
            rules={{
              required: "Nama fungsi harus diisi!",
              pattern: {
                value: /^[a-zA-Z_][a-zA-Z0-9_]*$/,
                message: "Nama fungsi Tidak sesuai!"
              }
            }}
            render={({ field, fieldState:{error} }) => (
                <FormItem className="flex items-center space-x-4">
                <FormLabel className="w-1/3">
                    Nama Fungsi
                    <span className="text-red-500">*</span>
                    :
                 </FormLabel>
                <FormControl className="flex-1">
                    <div>
                        <Input {...field} className="border rounded p-2 w-full bg-gray-50" />
                        <FormDescription className="text-xs text-gray-500 mt-1">*Nama Fungsi harus sama dengan yang ada pada source code & mengikuti standar coding convention</FormDescription>
                        {error && (
                          <p className="text-red-600 text-sm mt-1">
                              {error.message}
                          </p>
                        )}
                    </div>
                </FormControl>
                </FormItem>
            )}
            />
        </div>
        </div>

        <div className="flex justify-end space-x-4">
            <Button onClick={onCancel} type="reset" className="bg-blue-50 text-blue-700 border-2 border-blue-700 py-2 px-4 rounded-full hover:bg-blue-700 hover:text-white">Batal</Button>
            <Button type="submit" className="bg-blue-50 text-blue-700 border-2 border-blue-700 py-2 px-4 rounded-full hover:bg-blue-700 hover:text-white">Simpan</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddModuleForm;
