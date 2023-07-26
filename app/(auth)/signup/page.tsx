import { SignUp } from '@clerk/nextjs/app-beta'

import { authTheme } from '~/app/(auth)/theme'

export default function Page() {
  return <SignUp signInUrl="/signin" appearance={authTheme} />
}
