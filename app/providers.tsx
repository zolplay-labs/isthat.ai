'use client'

import { useIsomorphicLayoutEffect } from 'framer-motion'
import { type FC } from 'react'

import { throttle } from '~/lib/throttle'
import { useViewport } from '~/stores/Viewport.store'

export const EventProvider: FC = () => {
  useIsomorphicLayoutEffect(() => {
    const readViewport = throttle(() => {
      const { innerWidth: w, innerHeight: h } = window
      const sm = w >= 640
      const md = w >= 768
      const lg = w >= 1024
      const xl = w >= 1280
      const _2xl = w >= 1536

      useViewport.setState({
        sm,
        md,
        lg,
        xl,
        '2xl': _2xl,
        h,
        w,
      })
    }, 16)

    readViewport()

    window.addEventListener('resize', readViewport)
    return () => {
      window.removeEventListener('resize', readViewport)
    }
  }, [])

  return null
}
