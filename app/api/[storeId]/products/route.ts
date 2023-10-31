import prismadb from "@/lib/prismadb";
import { getAllProductsByStoreId, getStoreByUserId } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Label required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("imageUrl required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store Id required", { status: 400 });
    }

    const storeByUserId = await getStoreByUserId(userId);

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const product = await prismadb.product.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("API Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store Id required", { status: 400 });
    }

    const products = await getAllProductsByStoreId(params.storeId);

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("API Error", { status: 500 });
  }
}
