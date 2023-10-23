'use client'

import { Bold, Button, Text } from '@tremor/react'
import { useState } from 'react'

import { env } from '~/env.mjs'

import { Dialog } from './ui/Dialog'

interface ConfigFieldProps {
  name: string
  value: string | number
}
function ConfigField({ name, value }: ConfigFieldProps) {
  return (
    <div className="flex items-baseline justify-between gap-4 text-black">
      <Bold>{name}:</Bold>
      <Text>{value}</Text>
    </div>
  )
}

export function ConfigDialog() {
  const [isOpen, setIsOpen] = useState(false)

  const config: ConfigFieldProps[] = [
    {
      name: 'Active Questions Limit',
      value: env.NEXT_PUBLIC_ACTIVE_QUESTIONS_LIMIT,
    },
    {
      name: 'Questions Per Challenge',
      value: env.NEXT_PUBLIC_QUESTIONS_PER_CHALLENGE,
    },
    {
      name: 'Refresh Interval Hours',
      value: env.NEXT_PUBLIC_REFRESH_INTERVAL_HOURS,
    },
    {
      name: 'Release Date',
      value: env.NEXT_PUBLIC_RELEASE_DATE,
    },
  ]

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Config</Button>
      <Dialog
        title="Config"
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
        className="space-y-2"
      >
        {config.map((field, i) => (
          <ConfigField key={i} {...field} />
        ))}
        <div className="flex items-center justify-between gap-4">
          <Text>TIP: Config can be changed in ENV</Text>
          <Button onClick={() => setIsOpen(false)} color="gray">
            Close
          </Button>
        </div>
      </Dialog>
    </>
  )
}
