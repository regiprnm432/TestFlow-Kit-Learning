import { useState, useEffect } from "react";
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

interface FormDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  triggerRefresh: () => void;
  onSuccess: () => void;
}

interface ParameterModul {
  ms_id_parameter: string;
  ms_id_modul: string;
  ms_nama_parameter: string;
  ms_tipe_data: string;
  ms_rules: RuleDetail | string;
  createdby: string;
  created: string;
  updatedby: string;
  updated: string;
}

interface TestCase {
  tr_no: number;
  tr_object_pengujian: string;
  data_test_input: {
    param_name: string;
    param_type: string;
    param_value: string;
  }[];
  expected_result: string;
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

interface RuleDetail {
  nama_rule: string;
  id_rule: string;
  jml_param: string;
  min_value?: string;
  max_value?: string;
  condition?: string;
  value?: string;
}

const TestCaseFormDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  triggerRefresh,
  onSuccess,
}: FormDialogProps) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  let apiKey = import.meta.env.VITE_API_KEY;
  // const modulId = import.meta.env.VITE_MODULE_ID;
  const sessionData = localStorage.getItem('session')
  if (sessionData != null){
      const session = JSON.parse(sessionData);
      apiKey = session.token
  }
  const queryParameters = new URLSearchParams(window.location.search)
  const modulId = queryParameters.get("topikModulId")
  const [parameters, setParameters] = useState<ParameterModul[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [existingObjectives, setExistingObjectives] = useState<string[]>([]);
  const [lastTestCaseNumber, setLastTestCaseNumber] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm({
    mode: "onBlur",
  });

  const fetchParameters = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/modul/detailByIdTopikModul/${modulId}`,
        {
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
      setParameters(responseData.data.data_parameter_modul);
      console.log(responseData);
  
      // const lastNumber = responseData.data.data_modul.test_cases?.length
      //   ? Math.max(
      //       ...responseData.data.data_modul.test_cases.map(
      //         (tr: TestCase) => tr.tr_no
      //       )
      //     )
      //   : 0;
      // setLastTestCaseNumber(lastNumber);
      // console.log("Fetched lastTestCaseNumber:", lastNumber);
  
      const objectivesResponse = await fetch(
        `${apiUrl}/modul/TestCase/${modulId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
  
      if (!objectivesResponse.ok) {
        if (objectivesResponse.status === 403) {
          throw new Error("Forbidden: Access is denied");
        } else {
          throw new Error(`HTTP error! status: ${objectivesResponse.status}`);
        }
      }

      const objectivesData: { data: TestCase[] } = await objectivesResponse.json();
      console.log(objectivesData);
      const objectives = objectivesData.data.map((data) => data.tr_object_pengujian);
      console.log("ini objectives:", objectives);
      setExistingObjectives(objectives);

      const lastNumber = objectivesData.data.length
      ? Math.max(...objectivesData.data.map((testCase) => testCase.tr_no))
      : 0;
    setLastTestCaseNumber(lastNumber);
    console.log("Fetched lastTestCaseNumber:", lastNumber)

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    fetchParameters();
  }, []);
  
  // const getValidationRule = (param: ParameterModul) => {
  //   let rules;
  //   try {
  //     rules = JSON.parse(param.ms_rules as string);
  //   } catch (error) {
  //     console.error("Error parsing JSON rules:", error);
  //     return {
  //       validate: () =>
  //         `Aturan JSON tidak valid untuk parameter ${param.ms_nama_parameter}`,
  //     };
  //   }

  //   switch (rules.nama_rule) {
  //     case "range":
  //       return {
  //         validate: (value: string) => {
  //           const numericValue = parseFloat(value);
  //           if (rules.min_value && numericValue < parseFloat(rules.min_value)) {
  //             return `Masukkan nilai yang lebih besar atau sama dengan ${rules.min_value}`;
  //           }
  //           if (rules.max_value && numericValue > parseFloat(rules.max_value)) {
  //             return `Masukkan nilai yang lebih kecil atau sama dengan ${rules.max_value}`;
  //           }
  //           return true;
  //         },
  //       };
  //     case "condition":
  //       return {
  //         validate: (value: string) => {
  //           const numericValue = parseFloat(value);
  //           const conditionValue = parseFloat(rules.value);
  //           switch (rules.condition) {
  //             case ">":
  //               if (!(numericValue > conditionValue)) {
  //                 return `Masukkan nilai lebih besar dari ${conditionValue}`;
  //               }
  //               break;
  //             case "<":
  //               if (!(numericValue < conditionValue)) {
  //                 return `Masukkan nilai lebih kecil dari ${conditionValue}`;
  //               }
  //               break;
  //             case ">=":
  //               if (!(numericValue >= conditionValue)) {
  //                 return `Masukkan nilai lebih besar dari atau sama dengan ${conditionValue}`;
  //               }
  //               break;
  //             case "<=":
  //               if (!(numericValue <= conditionValue)) {
  //                 return `Masukkan nilai lebih kecil dari atau sama dengan ${conditionValue}`;
  //               }
  //               break;
  //             case "==":
  //               if (!(numericValue === conditionValue)) {
  //                 return `Masukkan nilai sama dengan ${conditionValue}`;
  //               }
  //               break;
  //             case "!=":
  //               if (!(numericValue !== conditionValue)) {
  //                 return `Masukkan nilai tidak sama dengan ${conditionValue}`;
  //               }
  //               break;
  //             default:
  //               return "Kondisi tidak valid";
  //           }
  //           return true;
  //         },
  //       };
  //     case "enumerasi":
  //       return {
  //         validate: (value: string) => {
  //           const allowedValues = rules.value.split(",");
  //           if (!allowedValues.includes(value)) {
  //             return `Masukkan salah satu dari nilai berikut: ${allowedValues.join(
  //               ", "
  //             )}`;
  //           }
  //           return true;
  //         },
  //       };
  //     case "countOfLength":
  //       return {
  //         validate: (value: string) => {
  //           if (value.length !== parseInt(rules.value)) {
  //             return `Nilai harus tepat ${rules.value} karakter`;
  //           }
  //           return true;
  //         },
  //       };
  //     default:
  //       return {};
  //   }
  // };


  const getValidationDataType = (param: ParameterModul) => {
    switch (param.ms_tipe_data) {
      case "int":
        return {
          pattern: {
            value: /^[0-9]+$/,
            message: "Masukkan angka",
          },
        };
      case "float":
        return {
          pattern: {
            value: /^[0-9]+(\.[0-9]+)?$/,
            message: "Masukkan angka desimal",
          },
        };
      case "string":
        return {
          pattern: {
            value: /^[a-zA-Z0-9\s]+$/,
            message: "Masukkan huruf atau angka",
          },
        };
      default:
        return {};
    }
  }

  useEffect(() => {
    if (!isDialogOpen) {
      form.reset();
      setShowSuccessMessage(false);
      setErrorMessage("");
    } else {
      fetchParameters();
    }
  }, [isDialogOpen, form]);

  const handleSubmit = async (data: any) => {
    // Validasi objective testing
    if (!data.objective) {
      setErrorMessage("Objective Testing harus terisi");
      return;
    }

    // Cek apakah objective sudah ada
    if (existingObjectives.includes(data.objective)) {
      setErrorMessage("Objective Testing sudah tersedia");
      return;
    }

    const formattedData = {
      id_topik_modul: modulId, 
      no: lastTestCaseNumber + 1,
      object_pengujian: data.objective,
      data_test_input: parameters.map((param) => ({
        param_name: param.ms_nama_parameter,
        param_type: param.ms_tipe_data,
        param_value: data[`param_${param.ms_id_parameter}`],
      })),
      expected_result: data.expected,
    };

    try {
      form.reset();
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

      const responseData = await response.json();
      console.log(responseData);
      form.reset();
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        setIsDialogOpen(false);
      }, 3000);

      triggerRefresh();
      fetchParameters(); 
      onSuccess();

      setLastTestCaseNumber((prev) => {
        const newNumber = prev + 1;
        console.log("Updated lastTestCaseNumber:", newNumber);
        return newNumber;
      });
    } catch (error) {
      console.error("Error saving data:", error);
      setErrorMessage("Error saving data");
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="bg-blue-800 text-white border-2 border-blue-800 rounded-[20] pt-0 pb-0 font-medium"
          >
            Tambah
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white rounded-[20] overflow-y-auto max-h-[80vh] p-6">
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
                  rules={{
                    required: "Objective harus terisi",
                    validate: (value) =>
                      existingObjectives.includes(value)
                        ? "Objective already exists"
                        : true,
                  }}
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
                        required: `${param.ms_nama_parameter} harus terisi`,
                        ...getValidationDataType(param)
                        // ...getValidationRule(param),
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
                  rules={{ required: "Expected result harus terisi" }}
                  render={({ field, fieldState: { error } }) => (
                    <FormItem>
                      <FormLabel>Ekspektasi</FormLabel>
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
                {errorMessage && (
                  <div className="bg-red-100 text-red-700 p-2 mb-4 text-sm">
                    {errorMessage}
                  </div>
                )}
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
              <div className="bg-blue-800 p-4 rounded-lg shadow-lg">
                <p className="text-white font-bold">
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
