import { getPeriodOfDayColorGradient } from '@utils/index'
import { Container, LoadIndicator, LoadingIcon, LoadingTextMessage } from './styles'

interface LoadingProps {
  loadingMessage?: string,
  color?: string,
  size?: number | "large" | "small",
}

const colors = getPeriodOfDayColorGradient()

export function Loading({loadingMessage, size} : LoadingProps){
  return (
    <Container>
      <LoadingIcon  resizeMode="contain" source={require("../../assets/Main/cloudy.png")} />
      <LoadingTextMessage>{loadingMessage || ""}</LoadingTextMessage>
      <LoadIndicator size={size || "small"} />
    </Container>
  )
}