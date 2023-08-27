import React, { useEffect, useLayoutEffect, useState } from "react"
import { GradientBackground, HomeContainer } from "./styles"
import * as Location from 'expo-location';

import { Header } from "@components/Header"
import { WeatherContainer } from "@components/WeatherContainer"
import { NotificationButton } from "@components/NotificationButton"
import { WeatherStatusIcon } from "@components/WheatherStatusIcon"
import { WeatherForecastChart } from "@components/WeatherForecastChart"
import { RootContainer } from "@components/common/Container/styles"
import { Loading } from "@components/Loading"
import { apiGet, apiSecondaryGet } from "../../controllers/apihandler";
import { getPeriodOfDayColorGradient } from "@utils/index";
import { ScrollView } from "react-native";
import { Alert } from "react-native";

export function Home() {

  const DEBUG = false;
  const BACKGROUND_COLORS = getPeriodOfDayColorGradient()
  const LOADING_MESSAGE = "Criando um clima entre a gente...";
  const ERROR_API_MESSAGE = { title: "Ops o clima está nublado por aqui! ⛈️", message: "Houve um problema ao trazer os dados climáticos, por favor tente novamente mais tarde" };
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string>("Criando um clima entre a gente...");


  const handleVerifyLocationPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setLoadingMessage("Por favor, altere as permissões de localização")
      Alert.alert('Por favor, altere as permissões de localização:',`
Passo 1: Abra as Configurações
Passo 2: Navegue para "Localização"
Passo 3: Ative a Localização
Passo 4: Configure o Modo de Localização (opcional)
Passo 5: Confirme as Configurações
Passo 6: Retorne ao Aplicativo
      `, [
        {text: 'Entendi, vou alterar', onPress: async () => {
          // let { status } = await Location.requestForegroundPermissionsAsync();
        }},
      ])
    }
    const location = await Location.getCurrentPositionAsync({});
    return location
  }

  const handleFetchDataOnLoad = async () => {
    try {
      const location : any  = await handleVerifyLocationPermissions()
      let { latitude, longitude } = location?.coords


      const API_KEY = '5a07f8fe5a9ba77360f77ba07782b3f4'
      const requestURL = `/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`

      const geoResponse: any = await apiSecondaryGet(
        `/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,rain&daily=precipitation_probability_max,rain_sum&timezone=America%2FSao_Paulo`
      )

      if(DEBUG) console.log("FIRST REQUEST RESULT", geoResponse)
      const lastElementRainChance = geoResponse?.daily?.precipitation_probability_max[0]
      const lastElementRainSum = geoResponse?.daily?.rain_sum[0]

      const response: any = await apiGet(requestURL)

      if(DEBUG) console.log("SECOND REQUEST RESULT", response)
      const weatherDescription = response.weather[0]?.description;
      const weatherCode = response?.weather[0]?.id;
      const temp = response?.main?.temp;
      const country = response?.sys?.country;
      const name = response?.name;

      const completeWeatherData = {
          sys:{
            country
          },
          name,
          temperature: temp,
          description: weatherDescription,
          rain_chance: lastElementRainChance,
          rain_sum: lastElementRainSum,
          code: weatherCode,
      }
      setWeatherData(completeWeatherData);
    } catch (error) {
      console.log(error);
      Alert.alert(ERROR_API_MESSAGE.title, ERROR_API_MESSAGE.message, [
        {text: 'OK', onPress: () => {} }
      ]);
    }
  };

  useEffect(() => {
    handleVerifyLocationPermissions()
    handleFetchDataOnLoad()
  }, []);

  return (
    <>
      {!weatherData ?
        <Loading size={"large"} loadingMessage={loadingMessage} /> :
        (
          <RootContainer>
            <GradientBackground colors={BACKGROUND_COLORS}>
              <Header />
              <ScrollView>
                <HomeContainer>
                  <WeatherStatusIcon imageAlias={weatherData?.code || ""} />
                  <WeatherContainer weather={weatherData} />
                  <NotificationButton />
                  <WeatherForecastChart />
                </HomeContainer>
              </ScrollView>
            </GradientBackground>
          </RootContainer>
        )}
    </>
  )
}
