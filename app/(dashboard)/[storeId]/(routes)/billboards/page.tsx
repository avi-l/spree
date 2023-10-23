import { getAllBillboardsByStoreId } from "@/lib/utils";
import { BillboardClient } from "./components/client";
import { TBillboardColumn } from "./components/columns";
import { format } from "date-fns";

const Billboards = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await getAllBillboardsByStoreId(params.storeId);
  const formattedBillboards: TBillboardColumn[] = billboards.map((bb) => ({
    id: bb.id,
    label: bb.label,
    createdAt: format(bb.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default Billboards;
