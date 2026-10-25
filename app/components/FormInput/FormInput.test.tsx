import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormInput from './FormInput'

// komponent controlled oldugu ucun real isleyisi gostermek ucun kicik sarici lazimdir
function TestForm({ onChangeSpy }: { onChangeSpy?: (value: string) => void }) {
  const [value, setValue] = useState('')
  const [touched, setTouched] = useState(false)

  // blur olandan sonra bos deyer xeta sayilir
  const error = touched && value === '' ? 'Email is required' : undefined

  return (
    <FormInput
      label="Email"
      name="email"
      value={value}
      error={error}
      onChange={(newValue) => {
        setValue(newValue)
        onChangeSpy?.(newValue)
      }}
      onBlur={() => setTouched(true)}
    />
  )
}

describe('FormInput', () => {
  let onChangeSpy: jest.Mock

  // her testden evvel yeni mock yaradilir ki testler bir-birine tesir etmesin
  beforeEach(() => {
    onChangeSpy = jest.fn()
  })

  it('label vasitesile input tapilir', () => {
    render(<TestForm />)

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it('yazilan metn inputda gorunur ve onChange cagirilir', async () => {
    const user = userEvent.setup()
    render(<TestForm onChangeSpy={onChangeSpy} />)

    await user.type(screen.getByLabelText(/email/i), 'ab')

    expect(screen.getByLabelText(/email/i)).toHaveValue('ab')
    expect(onChangeSpy).toHaveBeenCalledTimes(2)
    expect(onChangeSpy).toHaveBeenLastCalledWith('ab')
  })

  it('ilk vaxt xeta gostermir', () => {
    render(<TestForm />)

    // yoxluq yoxlanir deye queryBy istifade olunur
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeValid()
  })

  it('bos sahe blur olanda xeta mesaji gorunur', async () => {
    const user = userEvent.setup()
    render(<TestForm />)

    await user.click(screen.getByLabelText(/email/i))
    await user.tab()

    expect(screen.getByRole('alert')).toHaveTextContent(/email is required/i)
  })

  it('xeta olanda aria atributlari duzgun qurulur', async () => {
    const user = userEvent.setup()
    render(<TestForm />)

    await user.click(screen.getByLabelText(/email/i))
    await user.tab()

    const input = screen.getByLabelText(/email/i)
    expect(input).toBeInvalid()
    expect(input).toHaveAccessibleDescription(/email is required/i)
  })

  it('xeta duzeldilen kimi itir', async () => {
    const user = userEvent.setup()
    render(<TestForm />)

    await user.click(screen.getByLabelText(/email/i))
    await user.tab()
    expect(screen.getByRole('alert')).toBeInTheDocument()

    await user.type(screen.getByLabelText(/email/i), 'a')

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('klaviatura ile (Tab) inputa fokus olunur', async () => {
    const user = userEvent.setup()
    render(<TestForm />)

    await user.tab()

    expect(screen.getByLabelText(/email/i)).toHaveFocus()
  })

  it('xetasiz veziyyetin gorunusu deyismeyib (snapshot)', () => {
    const { asFragment } = render(
      <FormInput label="Email" name="email" value="" onChange={jest.fn()} />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})