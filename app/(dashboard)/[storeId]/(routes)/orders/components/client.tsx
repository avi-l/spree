"use client";

import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { TOrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface IOrdersClientProps {
  data: TOrderColumn[];
}
export const OrdersClient: React.FC<IOrdersClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description='Manage orders for your store'
      />

      <Separator />
      <DataTable columns={columns} data={data} filterKey='products' />
    </>
  );
};
