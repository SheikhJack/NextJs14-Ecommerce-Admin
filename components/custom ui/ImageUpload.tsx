import { CldUploadWidget } from 'next-cloudinary';
import { ImagePlus, Trash } from 'lucide-react';

import { Button } from '../ui/button';
import Image from 'next/image';

interface ImageUploadProps {
    value: string[];
    onChange: (url: string) => void;
    onRemove: (value: string) => void;

}




const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, onRemove, value }) => {

    const onUpload = (result: any) => {
        onChange(result.info.secure_url)
    }


    return (
        <div>
            <div className='mb-4 flex flex-wrap items-center gap-4 '>
                {value.map((url) =>
                    <div className='relative w-[200px] h-[200px]'>
                        <div className='absolute top-0 right-0 z-10'>
                            <Button onClick={() => onRemove(url)} size='sm' className='bg-red-1 text-white m-4'>
                                <Trash className='h-4 w-4'/>
                            </Button>
                        </div>
                        <Image src={url}
                            alt='image'
                            className='object-cover rounded-lg'
                            fill
                        />
                    </div>
                )}
            </div>

            <CldUploadWidget uploadPreset="wz94ubib" onSuccess={onUpload}>
                {({ open }) => {
                    return (
                        <Button type="button" onClick={() => open()} className='bg-grey-1 text-white m-2'>
                            <ImagePlus className='h-4 w-4 mr-2' />
                            Upload Images
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    )
}

export default ImageUpload