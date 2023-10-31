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
    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("name required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("Price required", { status: 400 });
    }
    if (!images || !images.length) {
      return new NextResponse("Images required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("Category required", { status: 400 });
    }
    if (!sizeId) {
      return new NextResponse("Size required", { status: 400 });
    }
    if (!colorId) {
      return new NextResponse("Color required", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("Store ID Required", { status: 400 });
    }

    const storeByUserId = await getStoreByUserId(userId);
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        colorId,
        sizeId,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
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
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const featuredParam = searchParams.get("isFeatured");
    const isFeatured = featuredParam ? true : undefined;
    if (!params.storeId) {
      return new NextResponse("Store Id required", { status: 400 });
    }

    const products = await getAllProductsByStoreId(
      params.storeId,
      "asc",
      sizeId,
      colorId,
      isFeatured,
      categoryId
    );

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("API Error", { status: 500 });
  }
}
