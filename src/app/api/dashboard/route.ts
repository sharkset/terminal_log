import { api } from '@/lib/axios';
import { NextResponse } from 'next/server';
import response from './mockup_api_defaicreator.json';

export async function GET () {
  try {
    //const response = await api.get("/getData");
    //return NextResponse.json(response.data.msgParsed);
    return NextResponse.json(response.msgParsed);
  } catch (error) {
    NextResponse.error();
    console.error('Failed to request dashboard data', error);
  }
}
