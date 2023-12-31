import { Title } from "@components/common/Title/styles"
import { constants } from "../../theme/constants"
import { weatherDescriptions } from "@utils/weatherStausDescription"

export const WeatherContainer = ({weather}: any) => {

  return <>
    <Title
      color={constants.COLORS.WHITE}
      fontSize="60px"
      fontStyle="REGULAR"
    >
      {Number.isNaN(weather?.temperature) || weather?.temperature === undefined ? "..." : Math.round(weather?.temperature)}<Title color={constants.COLORS.WHITE} fontSize="40px"fontStyle="REGULAR" > °C</Title>
    </Title>
    <Title color={constants.COLORS.WHITE} marginTop="10px" fontSize="25px"fontStyle="REGULAR" >{weatherDescriptions[weather?.description] || "..."}</Title>
    <Title color={constants.COLORS.WHITE} marginTop="10px" fontSize="25px"fontStyle="REGULAR" >
      <Title color={constants.COLORS.MAIN_YELLOW} marginTop="10px"  fontSize="25px">Chance de chuva: </Title>{weather.rain_chance}%
    </Title>
    <Title color={constants.COLORS.WHITE} marginTop="10px" fontSize="25px"fontStyle="REGULAR" >
      <Title color={constants.COLORS.MAIN_YELLOW} marginTop="10px"  fontSize="25px">Quantidade de chuva: </Title>{weather?.rain_sum} mm
    </Title>
    <Title color={constants.COLORS.WHITE} marginTop="10px"  fontSize="20px"fontStyle="REGULAR" >{weather?.name || "..."}, {weather?.sys?.country || "..."}</Title>
  </>
}

