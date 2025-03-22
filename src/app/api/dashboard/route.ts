import { NextResponse } from "next/server";
import { msgParsed } from "../updates/telegram";

export async function GET() {
      try {
          return NextResponse.json(msgParsed)
      } catch (error) {
          NextResponse.error();
          console.error('Failed to start API', error);
      }
} 
