import {
  Anchor,
  Button,
  H1,
  Paragraph,
  Separator,
  Sheet,
  useToastController,
  XStack,
  YStack,
} from '@my/ui'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { trpc } from 'app/utils/trpc'
import React, { useEffect, useState } from 'react'
import { useLink } from 'solito/link'
import { SignedIn, SignedOut, useAuth } from '../../utils/clerk'

export function HomeScreen() {
  const utils = trpc.useContext()
  const linkProps = useLink({
    href: '/user/nate',
  })
  const { signOut, userId } = useAuth()
  const signInLinkProps = useLink({
    href: '/sign-in',
  })
  const test = trpc.test.getSecretMessage.useQuery({}, { cacheTime: 0 })

  useEffect(() => {
    console.log('test.data', test.data)
  }, [test.data])

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <YStack space="$4" maw={600}>
        <H1 ta="center">Welcome to Tamagui.</H1>
        <Paragraph ta="center">
          Here's a basic starter to show navigating from one screen to another. This screen uses the
          same code on Next.js and React Native.
        </Paragraph>

        <Separator />

        <Paragraph ta="center">
          tRPC: {test.error ? 'Login to see a secret' : test.data ?? 'Login to see a secret'}
        </Paragraph>
      </YStack>
      <SignedOut>
        <XStack space ai="center">
          <Button {...signInLinkProps} theme={'dark'}>
            Sign In
          </Button>
        </XStack>
      </SignedOut>
      <SignedIn>
        <Paragraph mb="$4">{userId}</Paragraph>
        <Button
          onPress={() => {
            signOut()
          }}
          theme={'red'}
        >
          Sign Out
        </Button>
      </SignedIn>
      <XStack>
        <Button {...linkProps}>Link to user</Button>
      </XStack>

      <SheetDemo />
    </YStack>
  )
}

function SheetDemo() {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(0)
  const toast = useToastController()

  return (
    <>
      <Button
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen((x) => !x)}
      />
      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame ai="center" jc="center">
          <Sheet.Handle />
          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => {
              setOpen(false)
              toast.show('Sheet closed!', {
                message: 'Just showing how toast works...',
              })
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
