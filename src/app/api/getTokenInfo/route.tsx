import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const address = searchParams.get('address')
  const url = `https://api.dexscreener.com/latest/dex/tokens/${address}`

  try {
    const response = await axios.get(url)
    return NextResponse.json(response?.data?.pairs?.[0])
  } catch (error) {
    NextResponse.error();
    console.error('Failed get token info', error);
  }
} 