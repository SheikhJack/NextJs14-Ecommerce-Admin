import Collection from "@/lib/models/Collections";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";

import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import mongoose from 'mongoose';
import { ObjectId } from "mongodb";



export const GET = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    
    await connectToDB();
    console.log("Connected to DB");

    const collectionId = params.collectionId;
     
    if (!mongoose.Types.ObjectId.isValid(collectionId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid collection ID format" }),
        { status: 400 }
      );
    }
    
    const collection = await Collection.findById(new mongoose.Types.ObjectId(params.collectionId))
      .populate({
        path: "products",
        model: Product,
      });

console.log("connected", params.collectionId);


    return NextResponse.json(collection, { status: 200 });
  } catch (err) {
    console.log('[collectionId_GET]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};

  
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