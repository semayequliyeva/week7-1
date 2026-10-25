import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal from './Modal'

describe('Modal', () => {
  let onClose: jest.Mock

  beforeEach(() => {
    onClose = jest.fn()
  })

  it('baglidirsa hec ne gostermir', () => {
    render(
      <Modal isOpen={false} title="Confirm" onClose={onClose}>
        Body text
      </Modal>
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('aciqdirsa basliq ve mezmunu gosterir', () => {
    render(
      <Modal isOpen title="Confirm" onClose={onClose}>
        Body text
      </Modal>
    )

    const dialog = screen.getByRole('dialog', { name: /confirm/i })
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(screen.getByText('Body text')).toBeInTheDocument()
  })

  it('Close duymesine basanda onClose cagirilir', async () => {
    const user = userEvent.setup()
    render(
      <Modal isOpen title="Confirm" onClose={onClose}>
        Body text
      </Modal>
    )

    await user.click(screen.getByRole('button', { name: /close/i }))

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('Escape ile baglanir', async () => {
    const user = userEvent.setup()
    render(
      <Modal isOpen title="Confirm" onClose={onClose}>
        Body text
      </Modal>
    )

    await user.keyboard('{Escape}')

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('diger duymeler modalı baglamir', async () => {
    const user = userEvent.setup()
    render(
      <Modal isOpen title="Confirm" onClose={onClose}>
        Body text
      </Modal>
    )

    await user.keyboard('a')

    expect(onClose).not.toHaveBeenCalled()
  })

  it('acilanda fokus Close duymesindedir', () => {
    render(
      <Modal isOpen title="Confirm" onClose={onClose}>
        Body text
      </Modal>
    )

    expect(screen.getByRole('button', { name: /close/i })).toHaveFocus()
  })

  describe('avtomatik baglanma', () => {
    // sahte taymerler yalniz bu blokda isleyir
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      // diger testlere tesir etmesin deye real taymere qayidiriq
      jest.useRealTimers()
    })

    it('verilen vaxt kecende onClose cagirilir', () => {
      render(
        <Modal isOpen title="Confirm" onClose={onClose} autoCloseMs={3000}>
          Body text
        </Modal>
      )

      act(() => {
        jest.advanceTimersByTime(2999)
      })
      expect(onClose).not.toHaveBeenCalled()

      act(() => {
        jest.advanceTimersByTime(1)
      })
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('modal silinse taymer legv olunur', () => {
      const { unmount } = render(
        <Modal isOpen title="Confirm" onClose={onClose} autoCloseMs={3000}>
          Body text
        </Modal>
      )

      unmount()
      act(() => {
        jest.advanceTimersByTime(5000)
      })

      expect(onClose).not.toHaveBeenCalled()
    })
  })
})