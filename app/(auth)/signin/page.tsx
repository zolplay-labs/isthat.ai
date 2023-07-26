import { SignIn } from '@clerk/nextjs/app-beta'

import { authTheme } from '~/app/(auth)/theme'

export default function Page() {
  return <SignIn signUpUrl="/signup" appearance={authTheme} />
}
