
'use client'

import { useCallback, useState } from 'react'
import DataList, { type ListItem } from './components/DataList/DataList'
import FormInput from './components/FormInput/FormInput'
import Modal from './components/Modal/Modal'

const products: ListItem[] = [
  { id: 1, title: 'Shirt' },
  { id: 2, title: 'Shoes' },
  { id: 3, title: 'Jacket' },
]

export default function Home() {
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const fetchItems = useCallback(async () => products, [])

  const emailError =
    touched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? 'Please enter a valid email address.'
      : undefined

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-800">
      <div className="mx-auto max-w-3xl space-y-6">
        <header>
          <p className="text-sm font-semibold text-indigo-600">
            WEEK 7 · TESTING LAB
          </p>
          <h1 className="mt-2 text-3xl font-bold">
            Testing & Error Resilience
          </h1>
          <p className="mt-2 text-slate-500">
            Test components, validation and user interactions.
          </p>
        </header>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">FormInput</h2>
          <FormInput
            label="Email address"
            name="email"
            value={email}
            error={emailError}
            onChange={setEmail}
            onBlur={() => setTouched(true)}
          />
          <button
            type="button"
            onClick={() => setTouched(true)}
            className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Validate email
          </button>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">DataList</h2>
          <DataList fetchItems={fetchItems} />
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">Modal</h2>
          <p className="mb-4 text-slate-500">
            Open the modal and try the Close or Escape key.
          </p>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Open modal
          </button>
          <Modal
            isOpen={modalOpen}
            title="Modal demonstration"
            onClose={() => setModalOpen(false)}
          >
            <p>This modal can be closed with the Close button or Escape.</p>
          </Modal>
        </section>

        <footer className="text-center text-sm text-slate-500">
          Component Testing Playground · Jest & React Testing Library
        </footer>
      </div>
    </main>
  )
}
