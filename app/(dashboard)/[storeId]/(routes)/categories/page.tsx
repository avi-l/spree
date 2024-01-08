import { getAllCategoriesByStoreId } from "@/lib/utils";
import { TCategoryColumn } from "./components/columns";
import { format } from "date-fns";
import { CategoryClient } from "./components/client";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await getAllCategoriesByStoreId(params.storeId);
  const formattedCategories: TCategoryColumn[] = categories?.map((cat) => ({
    id: cat.id,
    name: cat.name,
    billboardLabel: cat.billboard.label,

    createdAt: format(cat.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
