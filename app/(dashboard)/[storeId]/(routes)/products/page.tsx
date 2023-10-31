import { getAllProductsByStoreId } from "@/lib/utils";
import { ProductClient } from "./components/client";
import { TProductColumn } from "./components/columns";
import { format } from "date-fns";

const Products = async ({ params }: { params: { storeId: string } }) => {
  const products = await getAllProductsByStoreId(params.storeId);
  const formattedProducts: TProductColumn[] = products.map((bb) => ({
    id: bb.id,
    label: bb.label,
    createdAt: format(bb.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default Products;
