import { CldUploadWidget } from 'next-cloudinary';
import { ImagePlus } from 'lucide-react';

import { Button } from '../ui/button';



function ImageUpload() {
    return (
        <CldUploadWidget uploadPreset="wz94ubib">
            {({ open }) => {
                return (
                    <Button onClick={() => open()} className='bg-grey-1 text-white m-2'>
                        <ImagePlus className='h-4 w-4 mr-2'/>
                        Upload Images
                    </Button>
                );
            }}
        </CldUploadWidget>
    )
}

export default ImageUpload