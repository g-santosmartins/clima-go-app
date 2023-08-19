import { Title } from "@components/common/Title/styles"
import { constants } from "../../theme/constants"
import { weatherDescriptions } from "@utils/weatherStausDescription"

export const WeatherContainer = ({weather}: any) => {
  const description = weather?.weather[0]?.description || ""
  // console.log("DESCRICAO", weather)
  return <>
    <Title
      color={constants.COLORS.WHITE}
      fontSize="60px"
      fontStyle="REGULAR"
    >
      {Math.round(weather?.main?.temp)}<Title color={constants.COLORS.WHITE} fontSize="40px"fontStyle="REGULAR" > °C</Title>
    </Title>
    <Title color={constants.COLORS.WHITE} marginTop="10px" fontSize="25px"fontStyle="REGULAR" >{weatherDescriptions[description] || "..."}</Title>
    <Title color={constants.COLORS.WHITE} marginTop="10px" fontSize="25px"fontStyle="REGULAR" >
      <Title color={constants.COLORS.MAIN_YELLOW} marginTop="10px"  fontSize="25px">Chance de chover: </Title>{weather?.rain_chance}%
    </Title>
    <Title color={constants.COLORS.WHITE} marginTop="10px"  fontSize="20px"fontStyle="REGULAR" >{weather?.name || "..."}, {weather?.sys?.country || "..."}</Title>
  </>
}

