import { searchArticles } from '@/lib/analytics/globalSearch';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    try {
        const results = await searchArticles(query);
        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(
            { error: error },
            { status: 200 }
        );
    }
}