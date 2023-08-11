import 'react-native-gesture-handler'
import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_300Light} from '@expo-google-fonts/roboto' 

import theme from './src/theme'

import { Routes } from './src/routes'

import { Loading } from '@components/Loading'

export default function App() {

  const LOADING_MESSAGE = "Por favor aguarde, estamos preparando tudo"
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold, Roboto_300Light})

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="transparent"
        />

        {fontsLoaded ? <Routes/> : <Loading loadingMessage={LOADING_MESSAGE}/>}
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}