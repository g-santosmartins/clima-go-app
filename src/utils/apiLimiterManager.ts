import { apiGet } from "../controllers/apihandler"
import handleGetEnvironmentVariables from "../../env"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

const DEBUG = false;

const handleGetWeatherData = async (lat: string, lon: string, units: string) => {

  //  await handleRemoveStorageContent("weather")
  let existingWeatherData = await handleReadStorageContent("weather")
  // console.log("RESULTADO DA LEITURA DO CACHE", existingWeatherData)
  
  if (existingWeatherData !== null && existingWeatherData !== undefined) {
    const weatherData = existingWeatherData.created_at
  
    const date1 = new Date(weatherData);
    const date2 = new Date();

    const timeDifferenceInMilliseconds : number = date2.getTime() - date1.getTime();
  
    const timeDifferenceInHours: number = timeDifferenceInMilliseconds / (1000 * 60 * 60);

    if(timeDifferenceInHours < 0.3) {
      if(DEBUG) Alert.alert("Não precisa pegar novamente")

    } else {
      // > 1
      if(DEBUG) Alert.alert("Precisa pegar novamente, buscando novas informações")
      existingWeatherData = handleGetExternalWeatherData(lat, lon, units)
    }

    return existingWeatherData

  } else {
    // Alert.alert("nao tenho")
    const storageObject = await handleGetExternalWeatherData(lat, lon, units)
    await handleSaveStorageContent(storageObject)

    if(DEBUG) Alert.alert("Consegui salvar")
    return storageObject
  }
}

const handleGetExternalWeatherData = async (lat: string, lon: string, units: string) => {
  const API_KEY = handleGetEnvironmentVariables().WHEATHER_APIKEY_ANDROID
  const requestURL = `/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`

  const response = await apiGet(requestURL)
  
  const storageObject = {
    request_result: response,
    created_at: new Date().toISOString()
  }
  await handleSaveStorageContent(storageObject)
  
  return storageObject
}

const handleSaveStorageContent = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('weather', jsonValue);
  } catch (e) {
    // saving error
  }
}

const handleReadStorageContent = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
}

const handleRemoveStorageContent = async (key: string) => {
  try {
    await AsyncStorage.removeItem('weather')
  } catch (e) {
    // remove error
  }

}


export {handleGetWeatherData };