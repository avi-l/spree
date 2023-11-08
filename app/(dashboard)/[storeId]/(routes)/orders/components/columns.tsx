"use client";

import { ColumnDef } from "@tanstack/react-table";

export type TOrderColumn = {
  id: string;
  isPaid: boolean;
  phone: string;
  address: string;
  totalPrice: string;
  products: string;
  createdAt: string;
};

export const columns: ColumnDef<TOrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
];
