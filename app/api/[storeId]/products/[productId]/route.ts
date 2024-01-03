import prismadb from "@/lib/prismadb";
import { getStoreByUserId } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { productId: string } }
) {
  console.log(params);
  try {
    if (!params.productId) {
      return new NextResponse("Product ID Required", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("API Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string; storeId: string } }
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

    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
      },
    });

    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("API Error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.productId) {
      return new NextResponse("Product ID Required", { status: 400 });
    }

    const storeByUserId = await getStoreByUserId(userId);
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("API Error", { status: 500 });
  }
}
