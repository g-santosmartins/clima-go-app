
import { LinearGradient } from "expo-linear-gradient";
import styled, { css } from "styled-components/native"

export const HomeContainer = styled.View`
  /* flex: 1; */
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.COLORS.TRANSPARENT};
`

export const GradientBackground = styled(LinearGradient).attrs({
  // colors: ["#012031", '#AAAA'], // Cores do degradê
  // colors: ["#000010", '#1374A7'], // Cores do degradê - noite
  // colors: ["#2F5F99", '#FEB07B'], // Cores do degradê - final de tarde
  // colors: ["#2F5F99", '#FEB11B'], // Cores do degradê - manha
  start: { x: 1, y: 0 }, // Ponto de partida do degradê
  end: { x: 2, y: 1 },   // Ponto de término do degradê
})`
  /* flex: 1; */
  height: 100%;
`;