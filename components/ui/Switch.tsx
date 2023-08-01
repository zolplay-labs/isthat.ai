'use client'

import { Switch as HLSwitch } from '@headlessui/react'

interface SwitchProps {
  checked: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
}

// FIXME: Warning: Prop `id` did not match.
export function Switch({ checked, onChange, disabled }: SwitchProps) {
  return (
    <HLSwitch
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className={`${
        checked ? 'bg-tremor-brand' : 'bg-gray-200'
      } relative inline-flex h-6 w-11 items-center rounded-full disabled:cursor-not-allowed disabled:brightness-75`}
    >
      <span
        className={`${
          checked ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </HLSwitch>
  )
}
