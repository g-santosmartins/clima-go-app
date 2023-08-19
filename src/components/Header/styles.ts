import styled, { css } from "styled-components/native"

export const HeaderContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 50px;
  background-color: ${({theme}) => theme.COLORS.TRANSPARENT};
`