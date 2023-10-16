import { create } from 'zustand'

interface ViewportStore {
  sm: boolean
  md: boolean
  lg: boolean
  xl: boolean
  '2xl': boolean
  h: number
  w: number
  pc: boolean
}
export const useViewport = create<ViewportStore>((set, get) => {
  return {
    /**
     * 640px
     */
    sm: false,

    /**
     * 768px
     */
    md: false,

    /**
     * 1024px
     */
    lg: false,

    /**
     * 1280px
     */
    xl: false,

    /**
     * 1536px
     */
    '2xl': false,

    h: 0,
    w: 0,

    get pc() {
      return get().w > 640
    },
  }
})
