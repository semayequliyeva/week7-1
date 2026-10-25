'use client'

import { useCallback, useEffect, useState } from 'react'

export type ListItem = {
  id: number
  title: string
}

type DataListProps = {
  // diqqet: bu funksiya stabil olmalidir (modul seviyyesinde ve ya useCallback ile),
  // yoxsa her renderde yeniden sorgu gedir
  fetchItems: () => Promise<ListItem[]>
}

type Status = 'loading' | 'success' | 'error'

export default function DataList({ fetchItems }: DataListProps) {
  const [items, setItems] = useState<ListItem[]>([])
  const [status, setStatus] = useState<Status>('loading')

  const load = useCallback(async () => {
    try {
      const data = await fetchItems()
      setItems(data)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }, [fetchItems])

  useEffect(() => {
    load()
  }, [load])

  // xeta olanda istifadeci yeniden cehd ede bilsin
  const handleRetry = () => {
    setStatus('loading')
    load()
  }

  if (status === 'loading') {
    return <p role="status">Loading...</p>
  }

  if (status === 'error') {
    return (
      <div role="alert">
        <p>Could not load items</p>
        <button type="button" onClick={handleRetry}>
          Try again
        </button>
      </div>
    )
  }

  if (items.length === 0) {
    return <p>No items found</p>
  }

  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  )
}