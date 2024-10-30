"use client"
import { useEffect, useState } from "react";

import CollectionForm from "@/components/collections/CollectionForm";
import Loader from "@/components/custom ui/Loader";
import { useRouter } from "next/router";




const CollectionDetails = ({ params }: { params: { collectionId: string } }) => {
    const [loading, setLoading] = useState(true);
    const [collectionDetails, setCollectionDetails] = useState(null);
    const [error, setError] = useState<string | null>(null);

    const getCollectionDetails = async () => {

        try {
            
            const res = await fetch(`/api/collections/${params.collectionId}`, {
                method: "GET"
              })
              console.log(params.collectionId)
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setCollectionDetails(data);
            setLoading(false);
            console.log("getCollectionDetails", data)

        } catch (error) {
            console.error("[collectionId_GET]", error);
            setError("Failed to fetch collection details.");
            setLoading(false);
        }
    };



    useEffect(() => {
        console.log("params.collectionId", params.collectionId);
        getCollectionDetails();
    }, [params.collectionId]);

    useEffect(() => {
        console.log("collectionDetails updated:", collectionDetails);
    }, [collectionDetails]);

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;
    if (!collectionDetails) return <div>No collection details found</div>;


    return <CollectionForm initialData={collectionDetails} />;
};

export default CollectionDetails;
