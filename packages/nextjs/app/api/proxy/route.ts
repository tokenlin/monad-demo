// /api/proxy

import { NextRequest, NextResponse } from 'next/server'


const API_URL = process.env.NEXT_PUBLIC_RPCURL_MONAD + ''

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include any other headers you need to forward
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    // Check if the response is OK
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in proxy:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}