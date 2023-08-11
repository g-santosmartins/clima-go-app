import { Title } from "@components/common/Title/styles"
import { PropsWithChildren } from "react"
import { constants } from "../../theme/constants"

export const WeatherContainer = ({ children }: PropsWithChildren) => {
  return <>
    <Title
      color={constants.COLORS.WHITE}
      fontSize="60px"
      fontStyle="REGULAR"
    >
      32<Title color={constants.COLORS.WHITE} fontSize="40px"fontStyle="REGULAR" > °C</Title>
    </Title>
    <Title color={constants.COLORS.WHITE} marginTop="10px" fontSize="25px"fontStyle="REGULAR" >Ensolarado, limpo</Title>
    <Title color={constants.COLORS.WHITE} marginTop="10px" fontSize="25px"fontStyle="REGULAR" >
      <Title color={constants.COLORS.MAIN_YELLOW} marginTop="10px"  fontSize="25px">Chuva Hoje: </Title>30%
    </Title>
    <Title color={constants.COLORS.WHITE} marginTop="10px"  fontSize="20px"fontStyle="REGULAR" >Marília, São Paulo, BR</Title>

    {children}
  </>
}

