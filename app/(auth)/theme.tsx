import type { ClerkProvider } from '@clerk/nextjs'

export const authTheme = {
  elements: {
    card: 'bg-white dark:bg-neutral-800 shadow-3xl rounded-3xl text-neutral-800 dark:text-neutral-200',
    headerTitle: 'dark:text-neutral-100',
    headerSubtitle: 'dark:text-neutral-300',
    dividerLine: 'dark:bg-white/5',
    dividerText: 'dark:text-neutral-400',
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
    formFieldLabel: 'dark:text-neutral-200',
    formFieldInput: 'dark:bg-white/5 dark:text-neutral-200',
    formButtonPrimary: 'dark:bg-emerald-600 dark:text-neutral-100',
    formHeaderTitle: 'dark:text-neutral-100',
    formHeaderSubtitle: 'dark:text-neutral-400',
    alternativeMethodsBlockButton: 'dark:border-neutral-700/50',
    alternativeMethodsBlockButtonText: 'dark:text-neutral-300',
    alternativeMethodsBlockButtonArrow: 'dark:text-neutral-300',
    otpCodeFieldInput:
      'dark:text-neutral-200 dark:border-b-emerald-800 dark:focus:border-b-emerald-400',
    formResendCodeLink: 'dark:text-emerald-400',
    identityPreviewText: 'dark:text-neutral-300',
    identityPreviewEditButton: 'dark:text-emerald-500',
  },
} satisfies Partial<React.ComponentProps<typeof ClerkProvider>['appearance']>
