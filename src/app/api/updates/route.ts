import { NextResponse } from "next/server";
import { logs } from "../telegram";

export async function GET() {
      try {
          return NextResponse.json(logs)
      } catch (error) {
          NextResponse.error();
          console.error('Failed to start API', error);
      }
} 