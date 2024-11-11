import { DataTable } from "@/components/custom ui/DataTable"
import { columns } from "@/components/orderItems/OrderItemsColums"

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
    const res = await fetch(`${process.env.ADMIN_DASHBOARD_URL}/api/orders/${params.orderId}`)
    const { orderDetails, customer } = await res.json()
    console.log("orders:", orderDetails)


    return (
        <div className="flex flex-col p-10 gap-5">
            <p className="text-base-bold">
                Order ID: <span className="text-base-medium">{orderDetails._id}</span>
            </p>
            <p className="text-base-bold">
                CustomerEmail: <span className="text-base-medium">{customer.email}</span>
            </p>
            <p className="text-base-bold">
                Total Paid: <span className="text-base-medium">P{orderDetails.totalAmount}</span>
            </p>
            <p className="text-base-bold">
                Shipping rate ID: <span className="text-base-medium">{orderDetails.email}</span>
            </p>
            <DataTable columns={columns} data={orderDetails.products} searchKey="product" />
        </div>
    )
}

export default OrderDetails