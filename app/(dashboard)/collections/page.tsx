"use client"
import { NextResponse } from 'next/server';
import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { columns } from '../../../components/collections/CollectionColumn';
import { DataTable } from '@/components/custom ui/DataTable';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';



function Collections() {
    const [loading, setLoading] = useState(true);
    const [collections, SetCollections] = useState([]);

    const router = useRouter();

    const getCollections = async () => {
        try {
            const res = await fetch("/api/collections", {
                method: "GET",
            })
            const data = await res.json()
            SetCollections(data)
            setLoading(false)
        } catch (error) {
            console.log("[getCollections]", error)
            return new NextResponse("", { status: 500 })
        }
    }
    useEffect(() => {
        console.log("data")
        getCollections()
    }, [])

    return (
        <div className='px-10 py-5'>
            <div className='flex items-center justify-between'>
                <p className='text-heading2-bold m-5'>Collections</p>
                <Button className='bg-blue-1 text-white m-3' onClick={() => router.push("/collections/new")}>
                    <Plus className='h-4 w-4 mr-2' />
                    Create Collection
                </Button>
            </div>
            <Separator className='my-4 bg-grey-1 ' />
    <DataTable columns={columns} data={collections} searchKey="title" />
        </div>
    )
}

export default Collections