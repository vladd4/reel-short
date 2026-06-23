'use client'

import type { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  required?: boolean
  error?: string
}

export default function FormInput({
  label,
  required,
  error,
  className = '',
  style,
  ...props
}: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="block text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.55)' }}>
          {label}
          {required && <span style={{ color: '#d60000' }}> *</span>}
        </label>
      )}
      <input
        required={required}
        className={`w-full rounded-xl px-4 py-3 text-base text-white transition-all outline-none placeholder:text-white/25 ${className}`}
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: `1px solid ${error ? 'rgba(214,0,0,0.5)' : 'rgba(255,255,255,0.08)'}`,
          caretColor: '#4500ff',
          ...style,
        }}
        onFocus={(e) =>
          (e.target.style.borderColor = error ? 'rgba(214,0,0,0.7)' : 'rgba(69,0,255,0.6)')
        }
        onBlur={(e) =>
          (e.target.style.borderColor = error ? 'rgba(214,0,0,0.5)' : 'rgba(255,255,255,0.08)')
        }
        {...props}
      />
      {error && (
        <p className="text-xs" style={{ color: '#ff4d4d' }}>
          {error}
        </p>
      )}
    </div>
  )
}
