import Collection from "@/lib/models/Collections";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest, { params }: {params: {collectionId: string}}) => {
    try {
        await connectToDB()

        const collection = await Collection.findById(params.collectionId)
        console.log(params.collectionId)

        if(!collection){
            return new NextResponse("collection not found", {status:500})
        }

        return NextResponse.json(collection, {status: 200})

    } catch (error) {
        console.log("[collectionId_GET]", error)
        return new NextResponse("Internal error", {status:500})
    }
}
export const POST = async (req: NextRequest, { params }: {params: {collectionId: string}})=> {
    try {
        const { userId } = auth();
        console.log("user")

        if (!userId){
            return new NextResponse("unAuthorised", {status:401})
        }
        await connectToDB()

        let collection = await Collection.findById(params.collectionId)

        if(!collection){
            return new NextResponse("collection not found", {status:404})
        }


        const { title, description, image } = await req.json()

        if(!title || !image){
            return new NextResponse("Title and Image are required", {status:400})
        }

        collection = await Collection.findByIdAndUpdate(params.collectionId, { title, description, image}, {new: true})
        
        await collection.save()
        return NextResponse.json(collection, { status: 200})
        
    } catch (error) {
        console.log("[collectionId_POST]", error)
        return new NextResponse("Internal error", {status:500})
    }
}


export const DELETE = async (req: NextRequest, { params }: { params: {collectionId: string}})=>{
    try{
        const { userId } = auth();

        if (!userId){
            return new NextResponse("unAuthorised", {status:401})
        }
        await connectToDB();

        await Collection.findByIdAndDelete(params.collectionId)
        return new NextResponse("Collection Deleted", {status:200})
        
    }catch(err){
        console.log("[collectionId_DELETE]", err)
    }
} 