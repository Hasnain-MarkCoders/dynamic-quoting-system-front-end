import { useState, useCallback } from 'react';
import { Button } from '../components/ui/button';
import { useDropzone } from 'react-dropzone';
import type { FileWithPath } from 'react-dropzone';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import type { UseMutationResult } from '@tanstack/react-query';
import { toast, Toaster } from 'sonner';
import { X } from 'lucide-react';
import type { AxiosError } from 'axios';
import { useUserStore } from "@/stores/user.store.ts"
import Filter from '@/components/Filter';
import { extractLastPart, getFiltersFromUrl } from '@/lib/utils';
import { useLocation } from "react-router-dom"
function UploadPage() {
  const { token } = useUserStore();
  const location = useLocation()
  const [file, setFile] = useState<FileWithPath | null>(null);
  const [isPending, setIsPending] = useState(false)

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith('.xlsx')) {
      toast.error('Invalid file format. Only .xlsx files are accepted.');
      return;
    }

    setFile(selectedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const uploadMutation: UseMutationResult<any, unknown, FormData> = useMutation({
    mutationFn: async (formData: FormData) => {

      const response = await axios.post('https://anton.markcoders.com/dynamic_qouting_system/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data', 'Authorization': "Bearer " + token },
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
    onError: async (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.data instanceof Blob) {
          const text = await axiosError.response.data.text();
          try {
            const json = JSON.parse(text);
            toast.error(json.error || 'Unknown server error.');
          } catch {
            toast.error('Failed to parse error response.');
          }
        }
        else {
          toast.error('An unexpected error occurred.');
        }
      }
    }
  })

  const downloadSampleFile = async () => {
    try {
      const response = await axios.get('https://anton.markcoders.com/dynamic_qouting_system/api/example-file', {
        headers: { 'Authorization': "Bearer " + token },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'sample-file.xlsx'); // Change name/extension as needed
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.data instanceof Blob) {
          const text = await axiosError.response.data.text();
          try {
            const json = JSON.parse(text);
            toast.error(json.error || 'Unknown server error.');
          } catch {
            toast.error('Failed to parse error response.');
          }
        }
        else {
          toast.error('An unexpected error occurred.');
        }
      }
    }


  }
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

  const handleFetchFilteredData = async () => {


    try {
      setIsPending(true)
      const response = await axios.get('https://anton.markcoders.com/dynamic_qouting_system/api/export', {
        params: {
          ...(getFiltersFromUrl(location.search) || {}),
        },
        headers: {
          "Authorization": "Bearer " + token,
        },
        responseType: "blob"

      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      const fileName = extractLastPart(url, ".xlsx")
      link.setAttribute('download', fileName); // Change name/extension as needed
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.message || 'Error Fetching Filtered failed';
        toast.error(msg);
      } else {
        toast.error('Unexpected error');
      }
    }finally{
      setIsPending(false)
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col w-full  gap-[30px] items-center justify-center p-4 ">
      <div className="border border-dashed border-red-400 p-6 rounded-lg w-full max-w-screen-lg text-center  shadow-md">
        <h1 className="text-2xl lg:text-3xl font-semibold mb-4 poppins-bold ">Dynamic Quoting System</h1>


        <div

          onClick={downloadSampleFile}
          className="text-black-500 underline mb-6 inline-block cursor-pointer"
        >
          Download Sample File
        </div>

        <div {...getRootProps()} className={`cursor-pointer border p-6 rounded ${uploadMutation.isPending ? 'opacity-50 pointer-events-none' : ''}`}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the file here...</p>
          ) : (
            <p>Drag and drop any file here, or click to select (Only .xlsx files accepted)</p>
          )}
        </div>

        {file && (
          <div className="mt-4 relative p-4 rounded flex items-center justify-center">
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

      <div className="border border-dashed border-red-400 p-6 rounded-lg w-full max-w-screen-lg text-center  shadow-md">
        <h1 className="text-2xl lg:text-3xl font-semibold mb-4 poppins-bold ">Fetch data from the EKOOMS database.</h1>

        <Filter />
        <div className='mt-4 flex items-center justify-end'>

          <Button onClick={handleFetchFilteredData}>

            {isPending?"Fetching data...":"Fetch data"}
          </Button>
        </div>


      </div>
      <Toaster richColors />
    </div>
  );
}

export default UploadPage;
