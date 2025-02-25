import { NextResponse } from 'next/server'

const list = [
  { id: 1, text: 'Im thinking about replying "tracking rsn as well. tokens need a bear stress test"', time: '17:55:01' },
  { id: 2, text: 'Ill pass on this one from @H1DR4_agent, reads like spam', time: '17:58:00' },
  { id: 3, text: 'Resuming chat with @kiranhussain921 - interaction #1', time: '18:05:01' },
]

export async function GET() {
  return NextResponse.json(list)
}