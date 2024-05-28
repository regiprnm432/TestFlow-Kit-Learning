import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaPlus } from "react-icons/fa";
import { get } from "http";

const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const modulId = import.meta.env.VITE_MODULE_ID;

interface FormDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}

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

interface DataResponse {
  message: string;
  data: {
    data_modul: any;
    data_parameter_modul: ParameterModul[];
    data_cfg: {
      nodes: any[];
      edges: any[];
    };
  };
}

const TestCaseFormDialog = ({
  isDialogOpen,
  setIsDialogOpen,
}: FormDialogProps) => {
  const [parameters, setParameters] = useState<ParameterModul[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const form = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    const fetchParameters = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/modul/detail/${modulId}`,
          {
            // Menggunakan ID_MODUL dari variabel global
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${apiKey}`,
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

        const responseData: DataResponse = await response.json();
        setParameters(responseData.data.data_parameter_modul); // Ubah disini
        console.log(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchParameters();
  }, []);

  useEffect(() => {
    if (!isDialogOpen) {
      form.reset();
      setShowSuccessMessage(false);
    }
  }, [isDialogOpen, form]);

  const handleSubmit = async (data: any) => {
    const formattedData = {
      id_modul: modulId, 
      no: "1",
      object_pengujian: data.objective,
      data_test_input: parameters.map((param) => ({
        param_name: param.ms_nama_parameter,
        param_type: param.ms_tipe_data,
        param_value: data[`param_${param.ms_id_parameter}`],
      })),
      expected_result: data.expected,
    };

    try {
      const response = await fetch(`${apiUrl}/modul/addTestCase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("Forbidden: Access is denied");
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const responseData: DataResponse = await response.json();
      console.log(responseData);
      form.reset();
      setShowSuccessMessage(true); // Tampilkan popup pesan
      setTimeout(() => {
        setShowSuccessMessage(false); // Tutup popup pesan setelah 3 detik
        setIsDialogOpen(false); // Tutup dialog
      }, 3000);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="bg-blue-800 text-white border-2 border-blue-800 rounded-[20] pt-0 pb-0"
            style={{ fontSize: "10px" }}
          >
            <FaPlus className="mr-1" />
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white rounded-[20] overflow-y-auto max-h-[80vh] p-6">
          {/* Menambahkan overflow-y dan max-height */}
          <DialogHeader>
            <DialogTitle className="text-lg font-bold mb-4">
              Tambah Test Case
            </DialogTitle>
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <FormField
                  control={form.control}
                  name="objective"
                  rules={{ required: "Objektif Pengujian is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <FormItem>
                      <FormLabel>Objektif Pengujian</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="rounded-md shadow-sm bg-gray-200 focus:ring-0 border-gray-300"
                        />
                      </FormControl>
                      {error && (
                        <p className="text-red-600 text-sm">{error.message}</p>
                      )}
                    </FormItem>
                  )}
                />
                {parameters &&
                  parameters.length > 0 &&
                  parameters.map((param) => (
                    <FormField
                      key={param.ms_id_parameter}
                      control={form.control}
                      name={`param_${param.ms_id_parameter}`}
                      rules={{
                        required: `${param.ms_nama_parameter} is required`,
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <FormItem>
                          <FormLabel>{param.ms_nama_parameter}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="rounded-md shadow-sm bg-gray-200 focus:ring-0 border-gray-300"
                            />
                          </FormControl>
                          {error && (
                            <p className="text-red-600 text-sm">
                              {error.message}
                            </p>
                          )}
                        </FormItem>
                      )}
                    />
                  ))}
                <FormField
                  control={form.control}
                  name="expected"
                  rules={{ required: "Expected result is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <FormItem>
                      <FormLabel>Expected</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="rounded-md shadow-sm bg-gray-200 focus:ring-0 border-gray-300"
                        />
                      </FormControl>
                      {error && (
                        <p className="text-red-600 text-sm">{error.message}</p>
                      )}
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-4">
                  <Button
                    onClick={() => setIsDialogOpen(false)}
                    className="border border-black hover:bg-gray-200"
                  >
                    Kembali
                  </Button>
                  <Button
                    className="bg-blue-800 text-white border border-black hover:bg-gray-200"
                    type="submit"
                  >
                    Simpan
                  </Button>
                </div>
              </form>
            </Form>
          </DialogHeader>
          {showSuccessMessage && (
            <div className="absolute inset-x-0 top-0 flex items-center justify-center h-full bg-black bg-opacity-30">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <p className="text-2140AD font-bold">
                  Test case berhasil disimpan!
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TestCaseFormDialog;
