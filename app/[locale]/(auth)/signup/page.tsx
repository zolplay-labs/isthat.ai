import { SignUp } from '@clerk/nextjs/app-beta'

import { authTheme } from '~/app/[locale]/(auth)/theme'
import { makeRoute } from '~/utils/routing'

export default function Page({ params }: { params: RootParams }) {
  return (
    <SignUp
      signInUrl={makeRoute('/signin', params.locale)}
      appearance={authTheme}
    />
  )
}
