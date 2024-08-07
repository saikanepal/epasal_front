import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone';

const ImageDrop = ({ setStore, imageData }) => {
    const [image, setImage] = useState();
    var urldata;
    if (imageData)
        urldata = imageData.split('.')
    const onDrop = acceptedFiles => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        console.log(reader.result)
        reader.onload = () => {
            setImage(reader.result);
            if (urldata.length === 2)
                setStore(prevState => ({
                    ...prevState,
                    [urldata[0]]: {
                        ...prevState.logo,
                        [urldata[1]]: reader.result
                    }
                }))
            else
                setStore(n => ({ ...n, [imageData]: reader.result }))
        };
        reader.readAsDataURL(file);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: false,
    });
    return (
        <div {...getRootProps()} className="px-1 py-1 border border-gray-400 w-20 text-center rounded">
            <input {...getInputProps()} />
            <p className="text-[12px] font-normal font-Ubuntu">Upload</p>
        </div>
    )
}

export default ImageDrop