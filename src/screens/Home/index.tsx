import React, { useEffect, useState } from "react"
import { GradientBackground, HomeContainer } from "./styles"
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
import { getPeriodOfDayColorGradient } from "@utils/index";


export function Home() {

  const DEBUG = false;

  const ERROR_API_MESSAGE = { title: "Ops o clima está nublado por aqui! ⛈️", message: "Houve um problema ao trazer os dados climáticos, por favor tente novamente mais tarde" }
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean | null>(true);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSaveWeatherDataCallBack  = (data : any) => {
    setWeatherData(data)
  }

  const colors = getPeriodOfDayColorGradient()
  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
   
      }
 
      try {
        if(DEBUG) console.log("entering on home api call flow")
        let location = await Location.getCurrentPositionAsync({});
        const {latitude, longitude} = location?.coords
        apiSecondaryGet(
          `/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,rain&daily=precipitation_probability_max&timezone=America%2FSao_Paulo`
          ).then((geoResponse : any) => {
                      handleGetWeatherData(latitude.toString(), longitude.toString(), "metric").then( async (response: any) => {
                      const lastElementRainChance = geoResponse?.daily?.precipitation_probability_max[0]
                      // console.log("RESULTADO GEO NOVO", geoResponse)
                      // console.log("LOCATION",latitude, longitude)
                      // console.log("RESPONSE HOME", JSON.stringify(response))
                      if(DEBUG) console.log("api payload saving flow")

                      handleSaveWeatherDataCallBack({...response?.request_result, rain_chance:lastElementRainChance })
                    }).then(() => {
                        if(DEBUG) console.log("entrando na logica de cancelamento de loading")
                        setLoading(false)
                    })
        })
      } catch (err) {
        Alert.alert(ERROR_API_MESSAGE.title, ERROR_API_MESSAGE.message)
      }

    })();

  }, []);
  return (
    <>
        
      { loading ?
        <Loading size={"large"} loadingMessage="Criando um clima entre a gente" /> :
        (
          <RootContainer>
            <GradientBackground colors={colors}>
            <Header />
            <HomeContainer>
              <WeatherStatusIcon imageAlias={weatherData?.weather[0]?.id || ""} />
              <WeatherContainer weather={weatherData}/>
              <NotificationButton />
              <WeatherForecastChart />
            </HomeContainer>
        </GradientBackground>
          </RootContainer>
        )}
    </>
  )
}
