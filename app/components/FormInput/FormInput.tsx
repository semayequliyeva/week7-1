'use client'

// input hadiseleri (onChange, onBlur) oldugu ucun client komponentidir

type FormInputProps = {
  label: string
  name: string
  value: string
  error?: string
  onChange: (value: string) => void
  onBlur?: () => void
}

export default function FormInput({
  label,
  name,
  value,
  error,
  onChange,
  onBlur,
}: FormInputProps) {
  // label ile input-u baglamaq ucun id name-den duzeldilir
  const inputId = `${name}-input`
  const errorId = `${name}-error`

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="text-sm font-medium">
        {label}
      </label>

      <input
        id={inputId}
        name={name}
        value={value}
        // sehv varsa ekran oxuyucu sahenin yanlis oldugunu bilsin
        aria-invalid={Boolean(error)}
        // xeta mesajini inputa baglayir, fokus olanda oxunur
        aria-describedby={error ? errorId : undefined}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className="rounded border px-3 py-2"
      />

      {error && (
        // role="alert" mesaj gorunen kimi elan edilir
        <p id={errorId} role="alert" className="text-sm text-red-600">
          {/* reng tek basina yetmir, ona gore ikon ve metn var */}
          <span aria-hidden="true">⚠ </span>
          {error}
        </p>
      )}
    </div>
  )
}