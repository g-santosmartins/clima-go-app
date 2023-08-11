import React from "react"
import { HomeContainer } from "./styles"
import { Header } from "@components/Header"
import { WeatherContainer } from "@components/WeatherContainer"
import { NotificationButton } from "@components/NotificationButton"
import { WeatherStatusIcon } from "@components/WheatherStatusIcon"
import { WeatherForecastChart } from "@components/WeatherForecastChart"
import { RootContainer } from "@components/common/Container/styles"

export function Home() {
  return (
    <RootContainer>
      <Header />
      <HomeContainer>
        <WeatherStatusIcon />
        <WeatherContainer />
        <NotificationButton />
        <WeatherForecastChart />
      </HomeContainer>
    </RootContainer>
  )
}
