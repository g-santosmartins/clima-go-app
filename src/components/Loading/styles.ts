import { LinearGradient } from '@shopify/react-native-skia'
import styled from 'styled-components/native'
interface LoadingProps {
  size: string
}
export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.MAIN_BLUE};
`
export const LoadingIcon = styled.Image`
  margin-top: 30px;
  width: 100px;
  height: 100px;
`
export const GradientBackground = styled(LinearGradient).attrs({
  start: { x: 1, y: 0 },
  end: { x: 2, y: 1 }, 
})`
  /* flex: 1; */
  height: 100%;
`;

export const LoadingTextMessage = styled.Text`
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 18px;
  color: ${({ theme }) => theme.COLORS.WHITE};
`
export const LoadIndicator = styled.ActivityIndicator.attrs<LoadingProps>(({ theme, size }) => ({
  color: theme.COLORS.WHITE,
  size: size
}))``