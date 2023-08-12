import React, { useEffect } from "react"
import { apiGet } from "../../controllers/apihandler"

import { HomeContainer } from "./styles"

import { Header } from "@components/Header"
import { WeatherContainer } from "@components/WeatherContainer"
import { NotificationButton } from "@components/NotificationButton"
import { WeatherStatusIcon } from "@components/WheatherStatusIcon"
import { WeatherForecastChart } from "@components/WeatherForecastChart"
import { RootContainer } from "@components/common/Container/styles"
import handleGetEnvironmentVariables from "../../../env"
import { handleGetWeatherData } from "@utils/ApiHandlerLimiter"

export function Home() {
  useEffect(() => {
    // handleGetWeatherData("Marília", "metric").then((response) => {
    //   console.log("RETURN", response)
    // })

  });
  return (
    <RootContainer>
      <Header />
      <HomeContainer>
        <WeatherStatusIcon imageAlias="rainy"/>
        <WeatherContainer />
        <NotificationButton />
        <WeatherForecastChart />
      </HomeContainer>
    </RootContainer>
  )
}
