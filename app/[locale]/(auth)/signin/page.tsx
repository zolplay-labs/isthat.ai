import { SignIn } from '@clerk/nextjs/app-beta'

import { authTheme } from '~/app/[locale]/(auth)/theme'
import { makeRoute } from '~/utils/routing'

export default function Page({ params }: { params: RootParams }) {
  return (
    <SignIn
      signUpUrl={makeRoute('/signup', params.locale)}
      appearance={authTheme}
    />
  )
}
