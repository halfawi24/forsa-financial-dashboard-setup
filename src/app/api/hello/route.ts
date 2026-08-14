import { NextRequest, NextResponse } from 'next/server';

const noStoreHeaders = {
  'Cache-Control': 'no-store, max-age=0',
};

function getSafeName(input: unknown, fallback = 'World') {
  if (typeof input !== 'string') {
    return fallback;
  }

  const value = input.trim();

  if (!value) {
    return fallback;
  }

  return value.slice(0, 100);
}

/**
 * Example API route
 * GET /api/hello
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = getSafeName(searchParams.get('name'));

  return NextResponse.json(
    {
      message: `Hello, ${name}!`,
      timestamp: new Date().toISOString(),
    },
    { status: 200, headers: noStoreHeaders }
  );
}

/**
 * Example POST API route
 * POST /api/hello
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = getSafeName(body?.name, '');

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400, headers: noStoreHeaders }
      );
    }

    return NextResponse.json(
      {
        message: `Hello, ${name}!`,
      },
      { status: 200, headers: noStoreHeaders }
    );
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON' },
      { status: 400, headers: noStoreHeaders }
    );
  }
}
