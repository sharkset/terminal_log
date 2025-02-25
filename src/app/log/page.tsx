"use client";

import { useQuery } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

type logType = {
  id: number
  time: string
  text: string
}
export default function Log() {
  const intervalMs = 1000

  const { status, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: async (): Promise<Array<logType>> => {
      const response = await fetch('/api/updates')
      return await response.json()
    },
    refetchInterval: intervalMs,
  })

  if (status === 'pending') return <h1>Loading...</h1>
  if (status === 'error') return <span>Error: {error.message}</span>

  return (
    <div>
      <h1>Auto Refetch page</h1>

      <h2>List</h2>
      <ul>
        {data.map((item: logType) => (
          <li key={item.id}>
            {item.time} - {item.text}
          </li>
        ))}
      </ul>
      <div>
      </div>
      <ReactQueryDevtools initialIsOpen />
    </div>
  )
}