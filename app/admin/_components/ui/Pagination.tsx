'use client'

import { Button, Text } from '@tremor/react'
import { clsxm } from '@zolplay/utils'
import React from 'react'

interface PaginationProps {
  className?: string
  current: number
  total: number
  onChange?: (page: number) => void
}

export function Pagination({
  className,
  current,
  total,
  onChange,
}: PaginationProps) {
  return (
    <div className={clsxm('flex items-center justify-center gap-2', className)}>
      <Button
        variant="secondary"
        size="xs"
        disabled={current <= 1}
        onClick={() => onChange?.(current - 1)}
      >
        &lt;
      </Button>
      {/* TODO: Add page input */}
      {/* <NumberInput value={0} enableStepper={false} className="w-2" /> */}
      <Text>{current}</Text>
      <Text>/</Text>
      <Text>{total}</Text>
      <Button
        variant="secondary"
        size="xs"
        disabled={current >= total}
        onClick={() => onChange?.(current + 1)}
      >
        &gt;
      </Button>
    </div>
  )
}
