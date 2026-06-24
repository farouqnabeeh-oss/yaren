import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const crossings = await prisma.crossing.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(crossings);
  } catch (error) {
    console.error('Error fetching crossings:', error);
    return NextResponse.json({ error: 'Failed to fetch crossings' }, { status: 500 });
  }
}
