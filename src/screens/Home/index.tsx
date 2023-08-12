import React, { useEffect, useState } from "react"
import { HomeContainer } from "./styles"
import * as Location from 'expo-location';

import { Header } from "@components/Header"
import { WeatherContainer } from "@components/WeatherContainer"
import { NotificationButton } from "@components/NotificationButton"
import { WeatherStatusIcon } from "@components/WheatherStatusIcon"
import { WeatherForecastChart } from "@components/WeatherForecastChart"
import { RootContainer } from "@components/common/Container/styles"
import { handleGetWeatherData } from "@utils/apiLimiterManager"
import { Loading } from "@components/Loading"
import { Alert } from "react-native"
import { apiSecondaryGet } from "../../controllers/apihandler";


export function Home() {

  const ERROR_API_MESSAGE = { title: "Ops o clima está nublado por aqui! ⛈️", message: "Houve um problema ao trazer os dados climáticos, por favor tente novamente mais tarde" }
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [rainChance, setRainChance] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean | null>(true);

  const [location, setLocation] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
   
      }
 
      try {
        let location = await Location.getCurrentPositionAsync({});
        const {latitude, longitude} = location?.coords
        apiSecondaryGet(
          `/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,rain`
          ).then((geoResponse) => {
                      handleGetWeatherData(latitude.toString(), longitude.toString(), "metric").then( async (response: any) => {
                      const lastElementRainChance = geoResponse?.hourly?.precipitation_probability.pop()
                      // console.log("RESULTADO GEO NOVO", geoResponse)
                      // console.log("LOCATION",latitude, longitude)
                      // console.log("RESPONSE HOME", JSON.stringify(response))
                      setWeatherData({...response?.request_result, rain_chance:lastElementRainChance })
                    })
        }).finally(() => {
            setLoading(false)
        })
      } catch (err) {
        Alert.alert(ERROR_API_MESSAGE.title, ERROR_API_MESSAGE.message)
      }

    })();

  }, []);
  return (
    <>
      { loading ?
        <Loading size={"large"} loadingMessage="Carregando dados de clima..." /> :
        (
          <RootContainer>
            <Header />
            <HomeContainer>
              <WeatherStatusIcon imageAlias={weatherData?.weather[0]?.id || ""} />
              <WeatherContainer weather={weatherData}/>
              <NotificationButton />
              <WeatherForecastChart />
            </HomeContainer>
          </RootContainer>
        )}
    </>
  )
}
