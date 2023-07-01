import { CustomToast, TamaguiProvider, TamaguiProviderProps, ToastProvider } from '@my/ui'
import { useColorScheme } from 'react-native'

import { ToastViewport } from './ToastViewport'
import config from '../tamagui.config'
import { TRPCProvider } from './trpc' //mobile only
import { AuthProvider } from './clerk'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const scheme = useColorScheme()
  return (
    <AuthProvider>
      <TamaguiProvider
        config={config}
        disableInjectCSS
        defaultTheme={scheme === 'dark' ? 'dark' : 'light'}
        {...rest}
      >
        <ToastProvider
          swipeDirection="horizontal"
          duration={6000}
          native={
            [
              /* uncomment the next line to do native toasts on mobile. NOTE: it'll require you making a dev build and won't work with Expo Go */
              // 'mobile'
            ]
          }
        >
          <TRPCProvider>{children}</TRPCProvider>
          <CustomToast />
          <ToastViewport />
        </ToastProvider>
      </TamaguiProvider>
    </AuthProvider>
  )
}
