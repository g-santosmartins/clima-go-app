import styled, { css } from "styled-components/native"

interface TitleProps {
  color?: string
  fontSize?: string
  fontStyle?: string
  marginTop?: string
  marginBottom?: string
}
export const Title = styled.Text<TitleProps>`
  margin-top: ${({marginTop}) => marginTop ? marginTop : "0px"};
  margin-bottom: ${({marginBottom}) => marginBottom ? marginBottom : "0px"};
  font-size: ${({fontSize}) => fontSize ? fontSize : "30px"};

  font-family: ${({ theme, fontStyle}) => fontStyle == "bold" ? theme.FONTS.BOLD :
   fontStyle == "light" ? theme.FONTS.LIGHT : theme.FONTS.REGULAR};

  color: ${({color, theme}) => color ? color : theme.COLORS.GRAY}
`
