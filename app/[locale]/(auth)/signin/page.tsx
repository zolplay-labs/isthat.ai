import { SignIn } from '@clerk/nextjs/app-beta'

export default function Page({ params }: { params: RootParams }) {
  return <SignIn signUpUrl="/sign-up" />
}
