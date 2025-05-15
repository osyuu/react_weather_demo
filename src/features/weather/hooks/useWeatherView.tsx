import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useWeatherRepository } from "./useWeatherRepository";
import { AppSettingsContext } from "../../settings/AppSettingsProvider";
import type { Weather } from "../../../models/weather";
import { useQuery } from "@tanstack/react-query";
import { useWeatherQuery } from "./useWeatherQuery";

type WeatherStatus = "initial" | "loading" | "failure" | "success";

type State = {
  status: WeatherStatus;
  weather: Weather | null;
};

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Weather }
  | { type: "FETCH_FAILURE" }
  | { type: "REFRESH" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        status: "loading",
      };
    case "FETCH_SUCCESS":
      state.status = "success";
      // state.weather =
      return {
        ...state,
        status: "success",
        weather: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        status: "failure",
      };
    case "REFRESH":
      return {
        ...state,
        status: "loading",
      };
    default:
      return state;
  }
}

const initialState: State = {
  status: "initial",
  weather: null,
};

export const useWeatherView = () => {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  const repo = useWeatherRepository();

  const { temperatureUnits, setWeatherCondition } = context;
  const [city, setCity] = useState("Taipei");

  const query = useWeatherQuery(city);
  const fetchWeather = useCallback(async (city: string) => {
    if (!(city.trim().length > 0)) return;
    const { data, isSuccess } = await query.refetch();
    if (isSuccess && data) {
      setWeatherCondition(data.condition);
    }
  }, []);

  const refreshWeather = useCallback(() => {
    fetchWeather(city);
  }, [query.data]);

  useEffect(() => {
    console.log("[Weather] Mount");
    // 預設載入一個城市
    fetchWeather(city);
    return () => {
      console.log("[Weather] Unmount");
    };
  }, []);

  return {
    // state,
    temperatureUnits,
    city,
    setCity,
    fetchWeather,
    refreshWeather,

    query,
  };
};
