import prismadb from "@/lib/prismadb";
import { getAllBillboardsByStoreId, getStoreByUserId } from "@/lib/utils";
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

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error);
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

    const billboards = await getAllBillboardsByStoreId(params.storeId);

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error);
    return new NextResponse("API Error", { status: 500 });
  }
}
