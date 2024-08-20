"use client"
import { useEffect, useState } from "react";

import CollectionForm from "@/components/collections/CollectionForm";
import Loader from "@/components/custom ui/Loader";
import { NextResponse } from "next/server";




const CollectionDetails = ({ params }: { params: { collectionId: string } }) => {
    const [loading, setLoading] = useState(true);
    const [collectionDetails, setCollectionDetails] = useState(null);
    const [error, setError] = useState<string | null>(null);

    const getCollectionDetails = async () => {
        try {
            const res = await fetch(`/api/collections/${params.collectionId}`, {
                method: "GET"
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setCollectionDetails(data);
            setLoading(false);
        } catch (error) {
            console.error("[collectionId_GET]", error);
            setError("Failed to fetch collection details.");
            setLoading(false);
        }
    };

    useEffect(() => {
        getCollectionDetails();
    }, [params.collectionId]);

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;

    return <CollectionForm initialData={collectionDetails} />;
};

export default CollectionDetails;
