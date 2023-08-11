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
export const LoadingTextMessage = styled.Text`
  margin-top: 20px;
  font-size: 18px;
  color: ${({ theme }) => theme.COLORS.WHITE};
`
export const LoadIndicator = styled.ActivityIndicator.attrs<LoadingProps>(({ theme, size }) => ({
  color: theme.COLORS.WHITE,
  size: size
}))``