import { YStack } from '@my/ui'
import { useAuth, useSignIn } from 'app/utils/clerk'
import { OAuthStrategy } from '@clerk/types'
import { useRouter } from 'solito/router'
import { SignUpSignInComponent } from '@my/ui/src/SignUpSignIn'
import { handleOAuthSignIn } from 'app/utils/auth'

export function SignInScreen() {
  const { push } = useRouter()

  const { isLoaded, signIn, setSession, setActive } = useSignIn()
  const { userId } = useAuth()

  if (userId) {
    push('/')
    return null
  }

  if (!setSession) return null
  if (!isLoaded) return null

  const redirectIfSignedIn = async () => {
    if (signIn.status == 'complete') {
      push('/')
    }
  }

  const handleOAuthSignInWithPress = async (strategy: OAuthStrategy) => {
    await handleOAuthSignIn(strategy, setSession, signIn)
    await redirectIfSignedIn()
  }

  const handleEmailSignInWithPress = async (emailAddress, password) => {
    const completeSignIn = await signIn.create({
      identifier: emailAddress,
      password,
    })
    // This is an important step,
    // This indicates the user is signed in
    await setActive({ session: completeSignIn.createdSessionId })
    await redirectIfSignedIn()
  }

  return (
    <YStack f={1} jc="center" ai="center" space>
      <SignUpSignInComponent
        type="sign-in"
        handleOAuthWithPress={handleOAuthSignInWithPress}
        handleEmailWithPress={handleEmailSignInWithPress}
      />
    </YStack>
  )
}
