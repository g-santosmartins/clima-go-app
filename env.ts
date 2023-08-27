const variables = {
  development: {
      WHEATHER_APIKEY_ANDROID:'API_KEY',
      WEATHER_API_URL: 'https://api.openweathermap.org/data/2.5',
      WEATHER_SECOND_API_URL: 'https://api.open-meteo.com/v1'
  },
  production: {
    WHEATHER_APIKEY_ANDROID:'API_KEY',
    WEATHER_API_URL: 'https://api.openweathermap.org/data/2.5',
    WEATHER_SECOND_API_URL: 'https://api.open-meteo.com/v1'
  }
};

const handleGetEnvironmentVariables = () => {
  if (__DEV__) {
      return variables.development;
  }
  return variables.production;
};

export default handleGetEnvironmentVariables; 