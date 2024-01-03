import { auth } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { type ClassValue, clsx } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

import prismadb from "@/lib/prismadb";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Conditionally import the DarkModeSwitch component only on the client side
export const DynamicDarkModeSwitch = dynamic(
  () => import("@/components/DarkModeSwitch"),
  {
    ssr: false, // Disable server-side rendering for this component
  }
);

export const getUserId = async () => {
  const { userId } = auth();
  if (!userId) {
    return null;
  } else return userId;
};

export const getStoreByUserAndStoreIds = async (
  storeId: string,
  userId: string
) => {
  try {
    const store = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });
    return store || null;
  } catch (error) {
    //toast.error("Error finding store");
    return null;
  }
};
export const getStoreByStoreId = async (storeId: string) => {
  try {
    const store = await prismadb.store.findFirst({
      where: {
        id: storeId,
      },
    });
    return store || null;
  } catch (error) {
    //toast.error("Error finding store");
    return null;
  }
};
export const getBillboardByBillboardId = async (billboardId: string) => {
  try {
    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: billboardId,
      },
    });
    return billboard || null;
  } catch (error) {
    //toast.error("Error finding billboard");
    return null;
  }
};
export const getProductByProductId = async (productId: string) => {
  try {
    const product = await prismadb.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
      },
    });
    return product || null;
  } catch (error) {
    //toast.error("Error finding product");
    return null;
  }
};
export const getSizeBySizeId = async (sizeId: string) => {
  try {
    const size = await prismadb.size.findUnique({
      where: {
        id: sizeId,
      },
    });
    return size || null;
  } catch (error) {
    //toast.error("Error finding billboard");
    return null;
  }
};
export const getColorByColorId = async (colorId: string) => {
  try {
    const color = await prismadb.color.findUnique({
      where: {
        id: colorId,
      },
    });
    return color || null;
  } catch (error) {
    //toast.error("Error finding billboard");
    return null;
  }
};
export const getCategoriesByCategoryId = async (categoryId: string) => {
  try {
    const billboard = await prismadb.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    return billboard || null;
  } catch (error) {
    //toast.error("Error finding billboard");
    return null;
  }
};

export const getStoreByUserId = async (userId: string) => {
  try {
    const store = await prismadb.store.findFirst({
      where: {
        userId,
      },
    });
    return store || null;
  } catch (error) {
    //toast.error("Error finding store");
    return null;
  }
};
export const getAllStoresByUserId = async (userId: string) => {
  try {
    const store = await prismadb.store.findMany({
      where: {
        userId,
      },
    });
    return store;
  } catch (error) {
    return [];
    //toast.error("Error finding store");
  }
};
export const getAllBillboardsByStoreId = async (
  storeId: string,
  orderBy: "asc" | "desc" = "desc"
) => {
  try {
    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId,
      },
      orderBy: {
        createdAt: orderBy,
      },
    });
    return billboards;
  } catch (error) {
    toast.error("Error finding store");
    return [];
  }
};
export const getAllOrdersByStoreId = async (
  storeId: string,
  orderBy: "asc" | "desc" = "desc"
) => {
  try {
    const orders = await prismadb.order.findMany({
      where: {
        storeId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: orderBy,
      },
    });
    return orders;
  } catch (error) {
    toast.error("Error finding store");
    return [];
  }
};

type TGetAllProductsByStoreIdProps = {
  params: {
    storeId: string;
    orderBy: "asc" | "desc";
    sizeId: string | undefined;
    colorId: string | undefined;
    isFeatured: boolean | undefined;
    categoryId: string | undefined;
  };
};
export const getAllProductsByStoreId = async ({
  params,
}: TGetAllProductsByStoreIdProps) => {
  const { storeId, orderBy, sizeId, colorId, isFeatured, categoryId } = params;
  try {
    const products = await prismadb.product.findMany({
      where: {
        storeId,
        categoryId,
        sizeId,
        colorId,
        isFeatured,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
      orderBy: {
        createdAt: orderBy,
      },
    });
    return products;
  } catch (error) {
    toast.error("Error finding store");
    return [];
  }
};
export const getAllSizesByStoreId = async (
  storeId: string,
  orderBy: "asc" | "desc" = "desc"
) => {
  try {
    const sizes = await prismadb.size.findMany({
      where: {
        storeId,
      },
      orderBy: {
        createdAt: orderBy,
      },
    });
    return sizes;
  } catch (error) {
    return [];
    //toast.error("Error finding store");
  }
};
export const getAllColorsByStoreId = async (
  storeId: string,
  orderBy: "asc" | "desc" = "desc"
) => {
  try {
    const sizes = await prismadb.color.findMany({
      where: {
        storeId,
      },
      orderBy: {
        createdAt: orderBy,
      },
    });
    return sizes;
  } catch (error) {
    return [];
    //toast.error("Error finding store");
  }
};
export const getAllCategoriesByStoreId = async (
  storeId: string,
  orderBy: "asc" | "desc" = "desc"
) => {
  try {
    const categories = await prismadb.category.findMany({
      where: {
        storeId,
      },
      include: {
        billboard: true,
      },
      orderBy: {
        createdAt: orderBy,
      },
    });
    return categories;
  } catch (error) {
    return [];
    //toast.error("Error finding store");
  }
};

export const formatter = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
});
