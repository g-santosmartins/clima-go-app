const variables = {
  development: {
      WHEATHER_APIKEY_ANDROID:'OPEN_WEATHER_API_KEY',
      WEATHER_API_URL: 'https://api.openweathermap.org/data/2.5'
  },
  production: {
    WHEATHER_APIKEY_ANDROID:'OPEN_WEATHER_API_KEY',
    WEATHER_API_URL: 'https://api.openweathermap.org/data/2.5'
  }
};

const handleGetEnvironmentVariables = () => {
  if (__DEV__) {
      return variables.development;
  }
  return variables.production;
};

export default handleGetEnvironmentVariables; 