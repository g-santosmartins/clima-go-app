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

const handleDecideWetherIcon = (code: any) => {
  const indexOfFirstElement = 0
  const clearWeatherCode = "800"
  const splitedCode = code.toString().split("")
  // console.log(splitedCode)

  if(code !== clearWeatherCode) {
    switch (splitedCode[indexOfFirstElement]) {
      case "2":
        return "stormy"
      case "3":
        return "rainy"
      case "5":
        return "rainy"
      case "6":
        return "stormy"
      case "7":
        return "foggy"
      case "8":
        return "cloudy"
      default:
        return "sunny"
    }
  }else {
    return "sunny"
  }
}
export const WeatherStatusIcon = ({ imageAlias }: WeatherStatusIconProps, ...rest: ReactPropTypes[]) => {
  const iconsImports: IconButtonProps = {
    sunny: require("../../assets/Main/sunny.png"),
    rainy: require("../../assets/Main/rainy.png"),
    stormy: require("../../assets/Main/stormy.png"),
    cloudy: require("../../assets/Main/cloudy.png"),
    foggy: require("../../assets/Main/foggy.png"),
    snowy: require("../../assets/Main/snowy.png"),
  }
  return <>
    <WeatherStatusIconContainer>
      <Image source={iconsImports[handleDecideWetherIcon(imageAlias)]} />
    </WeatherStatusIconContainer>
  </>
}

