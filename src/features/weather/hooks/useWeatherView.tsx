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
  const [state, dispatch] = useReducer(reducer, initialState);
  const [city, setCity] = useState("");

  const fetchWeather = useCallback(async (city: string) => {
    dispatch({ type: "FETCH_START" });
    try {
      const weather = await repo.getWeather(city);
      dispatch({ type: "FETCH_SUCCESS", payload: weather });
      setWeatherCondition(weather.condition);
    } catch (e) {
      dispatch({ type: "FETCH_FAILURE" });
    }
  }, []);

  const refreshWeather = useCallback(() => {
    dispatch({ type: "REFRESH" });
    if (state.weather === null) return;
    fetchWeather(state.weather!.location);
  }, [state.weather]);

  useEffect(() => {
    console.log("[Weather] Mount");
    // 預設載入一個城市
    const fetchData = async () => fetchWeather("Taipei");

    fetchData();
    return () => {
      console.log("[Weather] Unmount");
    };
  }, []);

  return {
    state,
    temperatureUnits,
    city,
    setCity,
    fetchWeather,
    refreshWeather,
  };
};
