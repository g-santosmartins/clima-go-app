import styled, { css } from "styled-components/native"

interface ButtonProps {
  color?: string
  fontSize?: string
}

export const Button = styled.TouchableOpacity<ButtonProps>`
  align-items: center;
  justify-content: center;
  padding: 10px;
  padding-left: 60px;
  padding-right: 60px;
  border-top-right-radius: 50px;
  border-top-left-radius: 50px;
  border-bottom-right-radius: 50px;
  border-bottom-left-radius: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: ${({theme, color}) =>  color};
`