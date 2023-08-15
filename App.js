import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { theme } from './src/core/theme'
import Tabs from './navigation/tabs'

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </Provider>
  )
}
