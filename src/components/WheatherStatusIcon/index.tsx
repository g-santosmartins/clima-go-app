import { Image, ImageSourcePropType } from "react-native"
import { WeatherStatusIconContainer } from "./styles"
import { ReactPropTypes } from "react"

interface WeatherStatusIconProps {
  imageAlias: keyof IconButtonProps
}

interface IconButtonProps {
  sunny: ImageSourcePropType
  rainy: ImageSourcePropType
  stormy: ImageSourcePropType
  cloudy: ImageSourcePropType
  foggy: ImageSourcePropType
  snowy: ImageSourcePropType
}

export const WeatherStatusIcon = ({imageAlias} : WeatherStatusIconProps, ...rest : ReactPropTypes[]) => {
  const iconsImports : IconButtonProps = {
    sunny: require("../../assets/Main/sunny.png"),
    rainy: require("../../assets/Main/rainy.png"),
    stormy: require("../../assets/Main/stormy.png"),
    cloudy: require("../../assets/Main/cloudy.png"),
    foggy: require("../../assets/Main/foggy.png"),
    snowy: require("../../assets/Main/snowy.png"),
  }
  return <>
    <WeatherStatusIconContainer>
      <Image source={iconsImports[imageAlias]}/>
    </WeatherStatusIconContainer>
  </>
}

