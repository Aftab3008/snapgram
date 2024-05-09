import {useCallback, useState} from 'react'
import {useDropzone,FileWithPath} from 'react-dropzone'
import { Button } from '../ui/button';

type FileUploaderProps = {
    fieldChange: (file: File[]) => void;
    mediaUrl: string;
}

export default function FileUploader({fieldChange, mediaUrl}:FileUploaderProps) {
    const [fileUrl, setFileUrl] = useState(mediaUrl);
    const [file, setFile] = useState<File[]>([]);
    const onDrop = useCallback((acceptedFiles:FileWithPath[]) => {
        setFile(acceptedFiles)
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
        fieldChange(acceptedFiles)
      }, [file])
      const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept:{
            'image/*':[ '.png', '.jpg', '.jpeg', '.svg'],
            // 'video/*': ['.mp4', '.webm', '.ogg']
        }
    })
    
  return (
    <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'>
      <input {...getInputProps()} className='cursor-pointer' />
      {
        fileUrl ?(
            <>
            <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
                <img 
                src={fileUrl}
                alt='image'
                className='file_uploader-img'
                />
            </div>
            <p className='file_uploader-label'>
                Click or drag photo to replace
            </p>
            </>
        ):(
            <div className='file_uploader-box'>
                <img
                src='/assets/icons/file-upload.svg'
                alt='file-upload'
                height={77}
                width={96}
                />
                <h3 className='base-medium text-light-2 mb-2 mt-6'>Drag photo here</h3>
                <p className='text-light-4 small-regular mb-6'>SVG,PNG,JPG</p>
                <Button className='shad-button_dark_4'>Select from computer</Button>
            </div>
        )
      }
    </div>
  )
}
