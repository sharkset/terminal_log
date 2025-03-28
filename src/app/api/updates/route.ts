import { api } from '@/lib/axios';
import { NextResponse } from 'next/server';

export async function GET () {
  try {
    const response = await api.get('/getLogs', {
      headers: { 
        'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
      },
    });
    return NextResponse.json(response.data.logs);
  } catch (error) {
    NextResponse.error();
    console.error('Failed to start API', error);
  }
}
