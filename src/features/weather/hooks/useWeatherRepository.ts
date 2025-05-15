import { WeatherApiClient } from "../../../api/client/weatherApiClient";
import { WeatherRepository } from "../../../repository/weatherRepository";

export const useWeatherRepository = () => {
  return new WeatherRepository(new WeatherApiClient());
};
