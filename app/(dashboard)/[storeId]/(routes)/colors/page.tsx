import { getAllColorsByStoreId } from "@/lib/utils";
import { ColorsClient } from "./components/client";
import { TColorsColumn } from "./components/columns";
import { format } from "date-fns";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const colors = await getAllColorsByStoreId(params.storeId);
  const formattedColors: TColorsColumn[] = colors.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: format(color.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ColorsClient data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;
