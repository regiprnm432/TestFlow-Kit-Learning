import { useState, useEffect } from 'react';
import "../../index.css";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const modulId = import.meta.env.VITE_MODULE_ID;

interface DataModul {
  ms_id_modul: string;
  ms_jenis_modul: string;
  ms_nama_modul: string;
  ms_deskripsi_modul: string;
  ms_source_code: string | null;
  ms_class_name: string;
  ms_function_name: string;
  ms_return_type: string;
  ms_jml_parameter: number;
  ms_tingkat_kesulitan: string;
  ms_cc: string | null;
}

interface ParameterData {
  ms_id_parameter: string;
  ms_id_modul: string;
  ms_nama_parameter: string;
  ms_tipe_data: string;
  ms_rules: string;
}

interface Data {
  data_modul: DataModul;
  data_parameter_modul: ParameterData[];
  data_cfg: {
    nodes: any[];
    edges: any[];
  };
}

const ModuleSpecificationCard = () => {
  const [dataModule, setDataModule] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sourceCode, setSourceCode] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataModule = async () => {
      try {
        const response = await fetch(`${apiUrl}/modul/detail/${modulId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          }
        });

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error('Forbidden: Access is denied');
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }

        const data = await response.json();
        console.log(data);
        setDataModule(data.data || null);

        if (data.data) {
          fetchSourceCodeText(data.data.data_modul.ms_id_modul);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError((error as Error).message);
      }
    };

    const fetchSourceCodeText = async (modulId: string) => {
      try {
        const response = await fetch(`${apiUrl}/modul/getSourceCodeText/${modulId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSourceCode(data.data);
      } catch (error) {
        console.error('Error fetching source code text:', error);
        setError((error as Error).message);
      }
    };

    fetchDataModule();
  }, []);

  if (error) {
    return <div className="p-4 bg-white rounded-lg shadow-md h-screen">Error: {error}</div>;
  }

  if (!dataModule) {
    return <div className="p-4 bg-white rounded-lg shadow-md h-screen">Loading...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg h-screen">
      <div className="max-h-[80vh] overflow-y-auto">
        {dataModule.data_modul && dataModule.data_parameter_modul && (
          <>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Modul {dataModule.data_modul.ms_nama_modul}</h3>
            <h4 className="text-xl font-semibold mb-3 text-gray-700">Deskripsi Modul</h4>
            <p className="mb-6 text-gray-600">{dataModule.data_modul.ms_deskripsi_modul}</p>
            
            <h4 className="text-xl font-semibold mb-3 text-gray-700">Detail Modul</h4>
            <div className="mb-6 space-y-2 text-gray-600">
              <p><span className="font-bold">Jenis Modul:</span> {dataModule.data_modul.ms_jenis_modul}</p>
              <p><span className="font-bold">Class Name:</span> {dataModule.data_modul.ms_class_name}</p>
              <p><span className="font-bold">Function Name:</span> {dataModule.data_modul.ms_function_name}</p>
              <p><span className="font-bold">Return Type:</span> {dataModule.data_modul.ms_return_type}</p>
              <p><span className="font-bold">Jumlah Parameter:</span> {dataModule.data_modul.ms_jml_parameter}</p>
            </div>
            
            <div className="rounded-lg mb-6">
              <h4 className="text-xl font-semibold mb-3 text-gray-700">Parameter</h4>
              <div className="text-gray-600"> 
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left pb-2">Nama Parameter</th>
                      <th className="text-left pb-2">Tipe Data</th>
                      <th className="text-left pb-2">Rules</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataModule.data_parameter_modul.map((parameter) => (
                      <tr key={parameter.ms_id_parameter} className="border-b border-gray-300">
                        <td className="py-2">{parameter.ms_nama_parameter}</td>
                        <td className="py-2">{parameter.ms_tipe_data}</td>
                        <td className="py-2">{parameter.ms_rules}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <h4 className="text-xl font-bold  mb-1  text-gray-800">Source Code (Java)</h4>
            <div className="p-4 rounded-lg">
              <SyntaxHighlighter language="java" style={docco}>
                {sourceCode || 'Loading source code...'}
              </SyntaxHighlighter>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModuleSpecificationCard;
