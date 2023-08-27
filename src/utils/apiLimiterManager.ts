import { apiGet } from "../controllers/apihandler"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

const DEBUG = false;
const STORAGE_NAME = "weather-data-clima-go";
const NEW_REQUEST_PERIOD = 0.5;

const handleGetWeatherData = async (lat: string, lon: string, units: string) => {

   await handleRemoveStorageContent(STORAGE_NAME)
  // let existingWeatherData = await handleReadStorageContent(STORAGE_NAME)
  
  // if (existingWeatherData !== null && existingWeatherData !== undefined) {
  //   const weatherData = existingWeatherData.created_at
  
  //   const date1 = new Date(weatherData);
  //   const date2 = new Date();

  //   const timeDifferenceInMilliseconds : number = date2.getTime() - date1.getTime();
  
  //   const timeDifferenceInHours: number = timeDifferenceInMilliseconds / (1000 * 60 * 60);

  //   if(timeDifferenceInHours < NEW_REQUEST_PERIOD) {
  //     if(DEBUG) Alert.alert("Não precisa pegar novamente")

  //   } else {
  //     // > 1
  //     if(DEBUG) Alert.alert("Precisa pegar novamente, buscando novas informações")
  //     existingWeatherData = await handleGetExternalWeatherData(lat, lon, units)
  //   }

  //   return existingWeatherData

  // } else {
    const storageObject = await handleGetExternalWeatherData(lat, lon, units)
    await handleSaveStorageContent(storageObject)

    if(DEBUG) Alert.alert("Consegui salvar")
    return storageObject
  // }
}

const handleGetExternalWeatherData = async (lat: string, lon: string, units: string) => {
  const API_KEY = 'OPEN_WEATHER_API_KEY'
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
    await AsyncStorage.setItem(STORAGE_NAME, jsonValue);
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
    await AsyncStorage.removeItem(STORAGE_NAME)
  } catch (e) {
    // remove error
  }

}


export {handleGetWeatherData };