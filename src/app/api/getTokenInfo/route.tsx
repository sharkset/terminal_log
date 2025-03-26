import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get("address");
  const url = `https://api.dexscreener.com/latest/dex/tokens/${address}`;

  try {
    const response = await axios.get(url);
    const data = response?.data?.pairs?.[0];

    // Verifica se é serializável
    if (!data || typeof data !== "object") {
      return NextResponse.json({ error: "Invalid or empty response" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed get token info", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
