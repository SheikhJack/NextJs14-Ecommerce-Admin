import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import { connectToDB } from "@/lib/mongoDB";

import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns";




export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const orders = await Order.find().sort({ createdAt: 'desc' });

    // Check if there are no orders
    if (orders.length === 0) {
      return new NextResponse(JSON.stringify({ message: "No orders found." }), { status: 404 });
    }

    const orderDetails = await Promise.all(
      orders.map(async (order) => {
        const user = await Customer.findOne({ clerkId: order.customerClerkId });
        return {
          _id: order._id,
          user: user ? user.email : 'Unknown', // Handle case where customer might not be found
          products: order.products.length,
          totalAmount: order.totalAmount,
          createdAt: format(order.createdAt, 'MMM do, yyyy'),
        };
      })
    );

    return NextResponse.json(orderDetails, { status: 200 });
  } catch (err) {
    console.error("[orders_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const OPTIONS = async (req: NextRequest) => {
  const origin = req.headers.get('origin');
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
};



export const POST = async (req: NextRequest) => {

  const origin = req.headers.get('origin');
  console.log("Received POST request at /api/orders");

  try {
    await connectToDB();
    console.log("Connected to the database.");

    const body = await req.json();
    const { cartItems, user } = body;
    console.log("Request body:", body);

    const newOrder = new Order({
      customerClerkId: user.id,
      email: user.emailAddresses[0].emailAddress,
      username: user.username,
      products: cartItems.map((cartItem: { item: { _id: string | null; price?: number; color?: string; size?: string; }; quantity: number; }) => ({
        product: cartItem.item?._id || null,
        quantity: cartItem.quantity,
        color: cartItem.item?.color || "defaultColor",
        size: cartItem.item?.size || "defaultSize",
        price: cartItem.item?.price 
      })).filter((product: { product: string | null }) => product.product !== null), 
      totalAmount: cartItems.reduce(
        (acc: number, cartItem: { item: { price?: number; }; quantity: number }) =>
          acc + (cartItem.item?.price || 0) * cartItem.quantity,
        0
      ),
    });

    console.log("Order created:", newOrder);

    await newOrder.save();

    const existingCustomer = await Customer.findOne({ clerkId: user.id });
    if (!existingCustomer) {
      const newCustomer = new Customer({
        clerkId: user.id,
        emailAddresses: user.emailAddreses,
        username: user.username
      });
      await newCustomer.save();
      console.log("New customer saved.");
    }

    return new NextResponse(JSON.stringify({ message: "Order created successfully" }), {
      status: 201,
      headers: {
        'Access-Control-Allow-Origin': origin || '*',
        'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });

  } catch (error) {
    console.error("[orders_POST]", error);

    return new NextResponse(JSON.stringify({ error: "Order creation failed" }), {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': origin || '*',
        'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }
};
