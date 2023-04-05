import type { ClerkProviderProps } from '@clerk/nextjs'

export const authTheme = {
  elements: {
    card: 'bg-white dark:bg-neutral-800 shadow-3xl rounded-3xl text-neutral-800 dark:text-neutral-200',
    headerTitle: 'dark:text-neutral-100',
    headerSubtitle: 'dark:text-neutral-300',
    socialButtonsIconButton: 'dark:border-neutral-700/50',
    socialButtonsBlockButton: 'dark:border-neutral-700/50',
    socialButtonsBlockButtonText: 'dark:text-neutral-300',
    socialButtonsBlockButtonArrow: 'dark:text-neutral-300',
    socialButtonsIconButton__loading: 'dark:text-neutral-100',
    socialButtonsProviderIcon__github: 'dark:invert',
    footerActionText: 'dark:text-neutral-400',
    footerActionLink: 'dark:text-emerald-500',
    alert: 'dark:border-neutral-700/50',
    alertText__danger: 'dark:text-red-400',
  },
} satisfies Partial<ClerkProviderProps['appearance']>
