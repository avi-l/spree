import { formatter, getAllProductsByStoreId } from "@/lib/utils";
import { ProductClient } from "./components/client";
import { TProductColumn } from "./components/columns";
import { format } from "date-fns";

const Products = async ({ params }: { params: { storeId: string } }) => {
  const products = await getAllProductsByStoreId(params.storeId);
  const formattedProducts: TProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
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
