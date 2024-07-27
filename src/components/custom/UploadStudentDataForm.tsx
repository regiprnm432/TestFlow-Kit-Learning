import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FaUpload, FaCloudUploadAlt, FaTrashAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { ClipLoader } from "react-spinners";

interface UploadStudentDataProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  setInfoMessage: (msg: string) => void;
  setErrorMessage: (msg: string) => void;
  afterUpload: () => void;
}

const UploadStudentDataForm = ({
  isDialogOpen,
  setIsDialogOpen,
  setInfoMessage,
  setErrorMessage,
  afterUpload
}: UploadStudentDataProps) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  let apiKey = import.meta.env.VITE_API_KEY;
  // const modulId = import.meta.env.VITE_MODULE_ID;
  const sessionData = localStorage.getItem('session')
  if (sessionData != null){
      const session = JSON.parse(sessionData);
      apiKey = session.token
  }
  const LoadingOverlay: React.FC = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg flex items-center">
        <ClipLoader size={35} color={"#123abc"} loading={true} />
        <span className="ml-2">Upload and Saving Data...</span>
      </div>
    </div>
  );

  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [fileErrorMessage, setFileErrorMessage] = useState<string>("");


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop();
      if (fileExtension !== 'xls') {
        setFileErrorMessage("File yang diunggah harus berformat .xls");
        setTimeout(() => setFileErrorMessage(""), 3000);
        return;
      }
      setFile(selectedFile);
      setUploadProgress(0);
      setUploadComplete(false);
      simulateUploadProgress();
    }
  };

  const handleDeleteFile = () => {
    setFile(null);
    setUploadProgress(0);
    setUploadComplete(false);
  };

  const simulateUploadProgress = () => {
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setUploadComplete(true);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 200);
  };

  const handleClose = () => {
    setFile(null);
    setUploadProgress(0);
    setUploadComplete(false);
    setIsDialogOpen(false);
  };

  const handleUpload = () => {
    if (file) {
      uploadDataSiswa(file)
    } else {
      console.log('No file to upload');
    }
  };
  const uploadDataSiswa = async (file:any) => {
    try {
        // prepare param
        setIsLoading(true)
        let dataUpload = new FormData()
        dataUpload.append('file', file)
        const responseUpload = await fetch(`${apiUrl}/student/upload`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
            body: dataUpload,
            });
        if (responseUpload.ok) {
            setIsLoading(false) 
            // navigate('/list-modules?message=addSuccess');
            setInfoMessage("Data Saved Success");
            setTimeout(() => setInfoMessage(""), 3000);
        }else{
            setErrorMessage("Gagal Upload Data");
            setTimeout(() => setErrorMessage(""), 3000);
        }
    } finally{
      setIsLoading(false) 
      handleClose();
      afterUpload();   
    }
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex items-center bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700"
          style={{ fontSize: "14px" }}
        >
          <FaUpload className="mr-2" />
          Unggah
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white p-10 rounded-lg shadow-lg max-w-2xl mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg text-center font-bold mb-4">File Unggah Data Mahasiswa</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          {!file && (
            <div className="w-full border-2 border-dashed border-blue-400 rounded-lg p-8 flex flex-col items-center justify-center text-blue-400">
              <FaCloudUploadAlt size={50} />
              <p className="mt-4">Unggah File atau <span className="text-blue-600 cursor-pointer">Jelajahi</span></p>
              <input type="file" className="opacity-0 absolute inset-0 w-full h-full cursor-pointer" onChange={handleFileChange} />
            </div>
          )}
          {file && (
            <div className="w-full border-2 border-dashed border-blue-400 rounded-lg p-8 flex flex-col items-center justify-center text-blue-400">
              <div className="flex items-center space-x-4">
                <FaUpload size={50} />
                <div className="text-left">
                  <p>{file.name}</p>
                  {uploadComplete ? (
                    <p>{(file.size / 1024).toFixed(2)} KB</p>
                  ) : (
                    <div className="w-full mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className="bg-blue-600 h-4 rounded-full"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm mt-2">{uploadProgress}%</p>
                    </div>
                  )}
                </div>
                {uploadComplete && (
                  <button onClick={handleDeleteFile} className="text-red-500 hover:text-red-700">
                    <FaTrashAlt size={20} />
                  </button>
                )}
              </div>
            </div>
          )}
          <p className="text-gray-500 text-sm text-center">
            File yang diunggah harus berstensi .xls dan maksimal 2 MB
          </p>
          {fileErrorMessage && (
              <div className="p-4 mb-4 text-red-500 bg-red-100 rounded-md w-full">
                {fileErrorMessage}
              </div>
          )}
          <div className="flex justify-end space-x-4 w-full mt-6">
            <Button
              type="button"
              className="bg-transparent border border-blue-800 text-blue-800 rounded-full px-4 py-2 hover:bg-blue-100"
              onClick={handleClose}
            >
              Kembali
            </Button>
            <Button
              type="button"
              className="bg-blue-800 text-white rounded-full px-4 py-2 hover:bg-blue-700"
              onClick={handleUpload}
            >
              Simpan
            </Button>
          </div>
        </div>
        {isLoading && <LoadingOverlay />}
      </DialogContent>
    </Dialog>
  );
};

export default UploadStudentDataForm;
