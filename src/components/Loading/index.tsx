import { Container, LoadIndicator, LoadingTextMessage } from './styles'

interface LoadingProps {
  loadingMessage?: string,
  color?: string,
  size?: number | "large" | "small",
}

export function Loading({loadingMessage, size} : LoadingProps){
  return (
    <Container>
      <LoadIndicator size={size || "small"} />
      <LoadingTextMessage>{loadingMessage || ""}</LoadingTextMessage>
    </Container>
  )
}