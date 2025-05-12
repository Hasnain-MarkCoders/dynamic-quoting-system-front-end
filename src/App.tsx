

import { useState, useCallback } from 'react';
import { Button } from './components/ui/button';
import { useDropzone } from 'react-dropzone';
import type { FileWithPath } from 'react-dropzone';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import type { UseMutationResult } from '@tanstack/react-query';
import { toast, Toaster } from 'sonner';
import { X } from 'lucide-react';

function App() {
  const [file, setFile] = useState<FileWithPath | null>(null);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      toast.error('Only .xlsx files are accepted.');
      return;
    }
    setFile(selectedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] },
  });

  const uploadMutation: UseMutationResult<any, unknown, FormData> = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post('https://anton.markcoders.com/dynamic_qouting_system/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success('File processed successfully!');
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'result.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      setFile(null);
    },
    onError: () => {
      toast.error('An error occurred during file processing.');
    },
  });

  const handleSubmit = () => {
    if (!file) {
      toast.error('Please select a file first.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    uploadMutation.mutate(formData);
  };

  const handleRetry = () => {
    if (!file) {
      toast.error('Please select a file first.');
      return;
    }
    handleSubmit();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="border border-dashed border-gray-400 p-6 rounded-lg max-w-md w-full text-center">
        <div {...getRootProps()} className={`cursor-pointer ${uploadMutation.isPending ? 'opacity-50 pointer-events-none' : ''}`}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the file here...</p>
          ) : (
            <p>Drag and drop an XLSX file here, or click to select</p>
          )}
        </div>

        {file && (
          <div className="mt-4 relative bg-gray-100 p-4 rounded flex items-center justify-center">
            <p className="text-sm truncate max-w-[80%]">{file.name}</p>
            <button 
              className="absolute top-2 right-2" 
              onClick={() => { setFile(null); uploadMutation.reset(); }}
              disabled={uploadMutation.isPending}
            >
              <X className={`w-4 h-4 ${uploadMutation.isPending ? 'text-gray-400' : 'text-red-500'}`} />
            </button>
          </div>
        )}

        {file && (
          <div className="mt-4 flex flex-col gap-2">
            <Button
              disabled={uploadMutation.isPending}
              onClick={handleSubmit}
            >
              {uploadMutation.isPending ? 'Processing...' : 'Upload and Process File'}
            </Button>
            {uploadMutation.isError && (
              <Button
                variant="outline"
                onClick={handleRetry}
              >
                Retry Upload
              </Button>
            )}
          </div>
        )}
      </div>
      <Toaster richColors />
    </div>
  );
}

export default App;
