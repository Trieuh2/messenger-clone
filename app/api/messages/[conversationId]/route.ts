import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

interface IParams {
  conversationId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    const { conversationId } = params;

    if (!conversationId) {
      return new NextResponse(null, { status: 401 });
    }

    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json(messages);
  } catch (error: any) {
    console.log(error, 'ERROR_FETCHING_MESSAGES');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
