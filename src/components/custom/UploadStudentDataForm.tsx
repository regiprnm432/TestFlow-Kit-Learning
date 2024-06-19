import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FaUpload, FaCloudUploadAlt, FaTrashAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface UploadStudentDataProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}

const UploadStudentDataForm = ({
  isDialogOpen,
  setIsDialogOpen,
}: UploadStudentDataProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadProgress(0);
      setUploadComplete(false);
      simulateUploadProgress(); // Simulate upload progress for demonstration purposes
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
                    <Progress value={uploadProgress} />
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
          <div className="flex justify-end space-x-4 w-full mt-6">
            <Button
              type="button"
              className="bg-transparent border border-blue-800 text-blue-800 rounded-full px-4 py-2 hover:bg-blue-100"
              onClick={() => setIsDialogOpen(false)}
            >
              Kembali
            </Button>
            <Button type="submit" className="bg-blue-800 text-white rounded-full px-4 py-2 hover:bg-blue-700">
              Simpan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadStudentDataForm;
