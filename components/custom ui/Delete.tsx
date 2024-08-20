"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import toast from 'react-hot-toast'

interface DeleteProps {
    id: string;
}

const Delete: React.FC<DeleteProps>= ({id}) => {
    const [loading, SetLoading] = useState(false);

    const onDelete = async() => {
        try {
            SetLoading(true)
            const res = await fetch(`/api/collections/${id}`, {
                method: "DELETE"
            })
            if(res.ok){
                SetLoading(false)
                window.location.href = ("/collections")
                toast.success("collection Deleted")
            }
            
        } catch (error) {
            console.log(error)
            toast.error("something went wrong. Please try again later")
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button className='bg-red-1 text-white'>
                    <Trash className='h-4 w-4' />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='bg-white text-grey-1'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-red-1'>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your collection
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel >Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                    className='bg-red-1 text-white' onClick={onDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default Delete