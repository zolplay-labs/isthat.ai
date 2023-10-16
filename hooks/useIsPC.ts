import { useCallback } from 'react'

import { useViewport } from '~/stores/Viewport.store'

export const useIsPC = () => {
  return useViewport(useCallback((state) => state.pc, []))
}
