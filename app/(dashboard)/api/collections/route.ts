import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectToDB } from '@/lib/mongoDB';

import  Collection  from '@/lib/models/Collections';



export const POST = async (req: NextRequest) => {
    try{
        const { userId } = auth();
    
        if(!userId){
            return new NextResponse("unauthourized", { status: 401})
        }
        await connectToDB()

        const { title, description, image} = await req.json()

        const  existingCollection = await Collection.findOne({ title })

        if (existingCollection) {
            return new NextResponse("Collection already exist", { status: 400})

        }

        if (!title || !image ) {
            return new NextResponse("Title and image are required", {status: 400})
        }

        const newCollection = await Collection.create({
            title,
            description,
            image,
        })

        await newCollection.save();


        return NextResponse.json(newCollection, {status: 200})


    }catch(err){
        console.log("[collections_POST]",err)
        return new NextResponse("internal server error", {status: 500})
    }
}

export const GET = async (req: NextRequest) => {
    try {
        await connectToDB()
        console.log("connected to db")
        const  collections = await Collection.find().sort({ createdAt: "desc" })

        console.log("render:", collections)
        return NextResponse.json(collections, {status: 200})

    } catch (error) {
        console.log("[collections_POST]",error)
        return new NextResponse("internal server error", {status: 500})
    }
}






// Assuming you use Clerk's server-side auth

// export const POST =  async (req: NextRequest) => {
//     try {
//         // Replace with Clerk's server-side auth check
//         const {userId} = useAuth();

//         if (!userId) {
//             return new NextResponse("Unauthorized", { status: 403 });
//         }

//         await connectToDB();
//         console.log("connectDB: CONNECTED")

//         const { title, description, image } = await req.json();

//         // Validate required fields
//         if (!title || !image) {
//             return new NextResponse("Title and image are required", { status: 400 });
//         }

//         // Check if collection already exists
//         const existingCollection = await Collection.findOne({ title });
//         if (existingCollection) {
//             return new NextResponse("Collection already exists", { status: 400 });
//         }

//         // Create new collection
//         const newCollection = await Collection.create({
//             title,
//             description,
//             image,
//         });

//         return NextResponse.json(newCollection, { status: 200 });

//     } catch (err) {
//         console.log("[collections_POST]", err);
//         return new NextResponse("Internal server error", { status: 500 });
//     }
// };

// export const GET = async (req: NextRequest) => {
//     try {
//         await connectToDB();

//         // Fetch all collections sorted by createdAt
//         const collections = await Collection.find().sort({ createdAt: -1 });
//         return NextResponse.json(collections, { status: 200 });

//     } catch (error) {
//         console.log("[collections_GET]", error);
//         return new NextResponse("Internal server error", { status: 500 });
//     }
// };
