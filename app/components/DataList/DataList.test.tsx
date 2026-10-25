import '@testing-library/jest-dom/jest-globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals'
import type { MockedFunction } from 'jest-mock'

import DataList from './DataList'

type Item = {
  id: number
  title: string
}

const sampleItems: Item[] = [
  { id: 1, title: 'Shirt' },
  { id: 2, title: 'Shoes' },
]

type FetchItems = () => Promise<Item[]>

describe('DataList', () => {
  let fetchItems: MockedFunction<FetchItems>

  beforeEach(() => {
    fetchItems = jest.fn<FetchItems>()
  })

  it('sorgu bitene qeder loading gosterir', () => {
    fetchItems.mockReturnValue(new Promise<Item[]>(() => {}))

    render(<DataList fetchItems={fetchItems} />)

    expect(screen.getByRole('status')).toHaveTextContent(/loading/i)
  })

  it('melumat gelende siyahini gosterir', async () => {
    fetchItems.mockResolvedValue(sampleItems)

    render(<DataList fetchItems={fetchItems} />)

    expect(await screen.findAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByText('Shirt')).toBeInTheDocument()
    expect(screen.getByText('Shoes')).toBeInTheDocument()
  })

  it('siyahi bos olanda bos veziyyet mesajini gosterir', async () => {
    fetchItems.mockResolvedValue([])

    render(<DataList fetchItems={fetchItems} />)

    expect(
      await screen.findByText(/no items found/i)
    ).toBeInTheDocument()

    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('sorgu ugursuz olanda xeta mesaji gosterir', async () => {
    fetchItems.mockRejectedValue(new Error('network'))

    render(<DataList fetchItems={fetchItems} />)

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /could not load items/i
    )
  })

  it('Try again duymesi sorgunu yeniden gonderir', async () => {
    const user = userEvent.setup()

    fetchItems
      .mockRejectedValueOnce(new Error('network'))
      .mockResolvedValueOnce(sampleItems)

    render(<DataList fetchItems={fetchItems} />)

    await screen.findByRole('alert')

    await user.click(
      screen.getByRole('button', { name: /try again/i })
    )

    expect(await screen.findByText('Shirt')).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(fetchItems).toHaveBeenCalledTimes(2)
  })
})
