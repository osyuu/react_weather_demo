import { useQuery } from "@tanstack/react-query";
import { useWeatherRepository } from "./useWeatherRepository";

export const useWeatherQuery = (city: string) => {
  const repo = useWeatherRepository();

  return useQuery({
    queryKey: ["city"],
    queryFn: () => repo.getWeather(city),
    enabled: city.trim().length > 0,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
