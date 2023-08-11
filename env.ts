const variables = {
  development: {
      WHEATHER_APIKEY_ANDROID:'YOUR_HERE',
      WEATHER_API_URL: 'https://api.openweathermap.org/data/3.0/onecall'
  },
  production: {
    WHEATHER_APIKEY_ANDROID:'YOUR_HERE',
    WEATHER_API_URL: 'https://api.openweathermap.org/data/3.0/onecall'
  }
};

const getEnvVariables = () => {
  if (__DEV__) {
      return variables.development;
  }
  return variables.production;
};

export default getEnvVariables; 