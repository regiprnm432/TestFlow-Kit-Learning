import React, { useState, useEffect } from 'react';
import LayoutForm from './LayoutForm';
import { Button } from "@/components/ui/button";
import SelectModuleDialog from '@/components/custom/SelectModuleDialog';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
} from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface Module {
  id: string;
  name: string;
  description: string;
  difficulty: string;
}

const AddTopicPage: React.FC = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  let apiKey = import.meta.env.VITE_API_KEY;
  const sessionData = localStorage.getItem('session')
  if (sessionData != null){
      const session = JSON.parse(sessionData);
      apiKey = session.token
  }
  const queryParameters = new URLSearchParams(window.location.search)
  const topikId = queryParameters.get("id_topik");

  const [screenName, setScreenName] = useState("Tambah Topik Pengujian");
  const [isSelectModuleDialogOpen, setIsSelectModuleDialogOpen] = useState(false);
  const [selectedModules, setSelectedModules] = useState<Module[]>([]);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm({
    mode: "onBlur",
  });

  const handleAddModules = (modules: Module[]) => {
    setSelectedModules(modules);
  };

  const handleCancel = () => {
    navigate("/list-topics");
  };

  const handleSave = () => {
    const dataTopik = {
      nama_topik : form.getValues("namaTopik"),
      deskripsi_topik : form.getValues("deskripsiTopik") 
    }
    if (topikId !=  null){
      editDataTopik(topikId, dataTopik, selectedModules)
    }else{
      addDataTopik(dataTopik, selectedModules)
    }
  };
  const addDataTopik = async (topik: any, listModul:Module[]) => {
    try {
        // prepare param
        // setIsLoading(true)
        const response = await fetch(`${apiUrl}/topik/addTopik`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(topik),
        });
        
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("Forbidden: Access is denied");
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }else{
        const data = await response.json();
        console.log(data.id_topik);
        let listIdModul = []
        for (let i=0; i<listModul.length; i++){
          listIdModul.push({
            id_modul:listModul[i].id
          })
        }
        const paramMapping = {
          id_topik : data.id_topik,
          list_modul:listIdModul
        }
        const responseAddModul = await fetch(`${apiUrl}/topik/mappingModul`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify(paramMapping),
        });
        if (responseAddModul.ok) {
            // navigate('/list-topics')
            // setIsLoading(false) 
            // navigate('/list-modules?message=addSuccess');
            setInfoMessage("Data Topik Saved Success");
            setTimeout(() => setInfoMessage(null), 2000);
            setTimeout(() => navigate('/list-topics'), 2100);
        // }else{
            // setErrorMessage("Gagal Upload Source Code Data");
            // setTimeout(() => setErrorMessage(null), 2000);
        }
      }
      
    } catch (error) {
      console.error("Error fetching module name:", error);
    } finally{
      // setIsLoading(false)    
    }
  };
  const editDataTopik = async (idTopik:string, topik: any, listModul:Module[]) => {
    try {
        // prepare param
        // setIsLoading(true)
        const param = {
          id_topik : idTopik,
          nama_topik : topik.nama_topik,
          deskripsi_topik : topik.deskripsi_topik
        }
        const response = await fetch(`${apiUrl}/topik/editTopik`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(param),
        });
        
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("Forbidden: Access is denied");
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }else{
        let listIdModul = []
        for (let i=0; i<listModul.length; i++){
          listIdModul.push({
            id_modul:listModul[i].id
          })
        }
        const paramMapping = {
          id_topik : idTopik,
          list_modul:listIdModul
        }
        // navigate('/list-topics')
        const responseAddModul = await fetch(`${apiUrl}/topik/editMappingModul`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify(paramMapping),
        });
        const data = await responseAddModul.json();
        if (responseAddModul.ok) {
            // navigate('/list-topics')
            // setIsLoading(false) 
            // navigate('/list-modules?message=addSuccess');
            setInfoMessage("Data Topik Saved Success");
            setTimeout(() => setInfoMessage(null), 2000);
            setTimeout(() => navigate('/list-topics'), 2100);
        }else{
            setErrorMessage(data.message);
            setTimeout(() => setErrorMessage(null), 2000);
        }
      }
      
    } catch (error) {
      console.error("Error fetching module name:", error);
    } finally{
      // setIsLoading(false)    
    }
  };
  const fetchDataTopik = async (idTopik:string) => {
    try {
      const response = await fetch(`${apiUrl}/topik/getDetailData?id_topik=${idTopik}`, {
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
      console.log(data.data.ms_nama_topik)
      form.setValue("namaTopik", data.data.ms_nama_topik);
      form.setValue("deskripsiTopik", data.data.ms_deskripsi_topik);
      const dataModul = data.dataModul;
      let tempModul = [];
      for (let i=0; i<dataModul.length; i++){
        tempModul.push({
          id: dataModul[i].ms_id_modul,
          name: dataModul[i].ms_nama_modul,
          description: dataModul[i].ms_deskripsi_modul,
          difficulty: dataModul[i].tingkat_kesulitan,
        })
      }
      setSelectedModules(tempModul)
    } catch (error) {
      console.error("Error fetching module name:", error);
    }
  };
  const getDifficultyStyle = (difficulty: string) => {
    switch (difficulty) {
      case 'Sangat Mudah':
        return 'bg-blue-100 text-blue-700';
      case 'Mudah':
        return 'bg-green-100 text-green-700';
      case 'Sedang':
        return 'bg-yellow-100 text-yellow-700';
      case 'Sulit':
        return 'bg-red-100 text-red-700';
      default:
        return '';
    }
  };
  useEffect(() => {
    if (topikId !=  null){
        setScreenName("Edit Topik Pengujian");
        fetchDataTopik(topikId);
    }
  }, []); 
  return (
    <LayoutForm screenName={screenName}>
      {infoMessage && (
          <div className="p-4 mb-4 text-green-500 bg-green-100 rounded-md">
          {infoMessage}
          </div>
      )}
      {errorMessage && (
          <div className="p-4 mb-4 text-red-500 bg-red-100 rounded-md">
          {errorMessage}
          </div>
      )}
      <div className="flex flex-col w-screen min-h-screen p-6">
        <Form {...form}>
          <form className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-start mb-4">
                <FormField
                  control={form.control}
                  name="namaTopik"
                  render={({ field }) => (
                    <FormItem className="flex items-center w-full">
                      <FormLabel className="text-gray-700 font-bold text-base w-1/4">
                        Nama Topik <span className="text-red-500">*</span>
                      </FormLabel>
                      <div className="w-1/12 text-center">:</div>
                      <FormControl className="flex-1">
                        <div>
                          <Input {...field} id="nama-topik" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                          <p className="text-gray-500 text-sm mt-1">
                            * Nama topik harus unik, belum pernah dibuat sebelumnya.
                          </p>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-start">
                <FormField
                  control={form.control}
                  name="deskripsiTopik"
                  render={({ field }) => (
                    <FormItem className="flex items-center w-full">
                      <FormLabel className="text-gray-700 font-bold text-base w-1/4">
                        Deskripsi Topik 
                      </FormLabel>
                      <div className="w-1/12 text-center">:</div>
                      <FormControl className="flex-1">
                        <textarea {...field} id="deskripsi-topik" className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600" rows={4}></textarea>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-700 text-xl font-bold">Daftar Modul Program <span className="text-red-500">*</span></h2>
            <Button className="text-white bg-blue-800 px-3 py-2 shadow hover:bg-blue-700 rounded-full" onClick={() => setIsSelectModuleDialogOpen(true)}>
              <FaPlus />
            </Button>
          </div>
          <table className="min-w-full bg-white border rounded-lg shadow-md">
            <thead>
              <tr className="bg-blue-800 text-white">
                <th className="py-2 px-4 border">No</th>
                <th className="py-2 px-4 border">Nama Modul Program</th>
                <th className="py-2 px-4 border">Deskripsi</th>
                <th className="py-2 px-4 border">Tingkat Kesulitan</th>
                <th className="py-2 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedModules.map((module, index) => (
                <tr key={module.id} className={`text-center ${index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}`}>
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{module.name}</td>
                  <td className="py-2 px-4 border">{module.description}</td>
                  <td className="py-2 px-4 border">
                    <span className={`inline-block w-32 px-2 py-1 rounded-full ${getDifficultyStyle(module.difficulty)}`}>
                      {module.difficulty}
                    </span>
                  </td>
                  <td className="py-2 px-4 border">
                    <Button onClick={() => setSelectedModules(prev => prev.filter(m => m.id !== module.id))} className="text-red-600">
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-gray-500 text-sm mt-1 pt-8">* Harus terdapat setidaknya 1 modul program</p>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={handleCancel} className="mr-4 text-blue-800 border border-blue-600 px-4 py-2 rounded-full shadow hover:bg-blue-50">
            Batal
          </Button>
          <Button onClick={handleSave} className="mr-4 text-blue-800 border border-blue-600 px-4 py-2 rounded-full shadow hover:bg-blue-50">
            Simpan
          </Button>
        </div>
      </div>
      <SelectModuleDialog
        isDialogOpen={isSelectModuleDialogOpen}
        setIsDialogOpen={setIsSelectModuleDialogOpen}
        onAddModules={handleAddModules}
        selectedModules={selectedModules}
      />
    </LayoutForm>
  );
};

export default AddTopicPage;
