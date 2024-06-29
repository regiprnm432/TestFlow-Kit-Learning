import React, { useState } from 'react';
import Layout from './Layout';
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

interface Module {
  id: number;
  name: string;
  description: string;
  difficulty: string;
}

const AddTopicPage: React.FC = () => {
  const [isSelectModuleDialogOpen, setIsSelectModuleDialogOpen] = useState(false);
  const [selectedModules, setSelectedModules] = useState<Module[]>([]);

  const form = useForm({
    mode: "onBlur",
  });

  const handleAddModules = (modules: Module[]) => {
    setSelectedModules(modules);
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

  return (
    <Layout>
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
          <Button className="mr-4 text-blue-800 border border-blue-600 px-4 py-2 rounded-full shadow hover:bg-blue-50">
            Batal
          </Button>
          <Button className="mr-4 text-blue-800 border border-blue-600 px-4 py-2 rounded-full shadow hover:bg-blue-50">
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
    </Layout>
  );
};

export default AddTopicPage;
