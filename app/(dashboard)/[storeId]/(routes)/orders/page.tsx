import { formatter, getAllOrdersByStoreId } from "@/lib/utils";
import { OrdersClient } from "./components/client";
import { TOrderColumn } from "./components/columns";
import { format } from "date-fns";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await getAllOrdersByStoreId(params.storeId);
  const formattedOrdersPage: TOrderColumn[] = orders?.map((order) => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    products: order.orderItems
      ?.map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatter.format(
      order.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    createdAt: format(order.createdAt, "MMMM do, yyyy"),
    isPaid: order.isPaid,
  }));
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <OrdersClient data={formattedOrdersPage} />
      </div>
    </div>
  );
};

export default OrdersPage;
