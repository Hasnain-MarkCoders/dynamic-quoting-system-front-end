import ConfirmDialog from "@/components/Confirm";
import LottieUploadAnimatedIcon from "@/components/LottieUploadAnimatedIcon";
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/user.store";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone, type FileWithPath } from "react-dropzone";
import { toast, Toaster } from "sonner";
const Prices = () => {
  const { token } = useUserStore();
    const [file, setFile] = useState<FileWithPath | null>(null);
    const [isDownLoading, setIsDownloading] = useState(false)
    const [isDownLoadingSample, setIsDownloadingSample] = useState(false)

    const [isOpenConfrim, setIsOpenConfirm] = useState(false)
    const handleOpenConfirm=()=>{
        setIsOpenConfirm(true)
    }
      const handleCloseConfirm=()=>{
        setIsOpenConfirm(false)
    }
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

      const response = await axios.post('https://anton.markcoders.com/dynamic_qouting_system/api/pricing-upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data', 'Authorization': "Bearer " + token },
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
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









  const downloadSampleFile = async () => {
    setIsDownloadingSample(true)
    try {
      const response = await axios.get('https://anton.markcoders.com/dynamic_qouting_system/api/pricing-example-file', {
        headers: { 'Authorization': "Bearer " + token },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'pricing-file.xlsx'); 
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
    finally{
        setIsDownloadingSample(false)
    }


  }


  const downloadExistingPricing = async () => {
    setIsDownloading(true)
    try {
      const response = await axios.get('https://anton.markcoders.com/dynamic_qouting_system/api/pricing-export', {
        headers: { 'Authorization': "Bearer " + token },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'pricing-file.xlsx'); 
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
    finally{
        setIsDownloading(false)
    }


  }
  return (
    <div className="p-4">
       
        <div className="flex justify-between items-center pb-20">
        <h1 className="text-3xl font-bold">Prices</h1>
        <Button
        disabled={isDownLoading}
        onClick={downloadExistingPricing}
        >
            {isDownLoading? "Downloading...":"DownLoad Existing Prices"}
        </Button>
        </div>  
       
           <div className="border border-dashed border-red-400 p-6 rounded-lg w-full max-w-[500px] mx-auto text-center  shadow-md">
        <h1 className="text-2xl lg:text-3xl font-semibold mb-4 poppins-bold ">Dynamic Quoting System</h1>


        <div
            
          onClick={!isDownLoadingSample? downloadSampleFile:()=>{}}
          className={cn("text-black-500 underline mb-6 inline-block cursor-pointer", {
            "pointer-events-none opacity-[0.5]":isDownLoadingSample
          })}
        >
          Download Sample File
        </div>

        <div {...getRootProps()} className={`cursor-pointer border pt-2 px-4 pb-4 rounded ${uploadMutation.isPending ? 'opacity-50 pointer-events-none' : ''}`}>
            <div>
          <input {...getInputProps()} />
                <LottieUploadAnimatedIcon/>
            </div>
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
              onClick={handleOpenConfirm}
            >
              {uploadMutation.isPending ? 'Updating...' : 'Update pricing'}
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
      <ConfirmDialog
      title="Are you sure you want to update the pricing?"
      description="Updating the pricing will apply the new values to all items. This action cannot be undone."
      open={isOpenConfrim}
      handleClose={handleCloseConfirm}
      onConfirm={handleSubmit}
      />
      
    </div>
  )
}

export default Prices
