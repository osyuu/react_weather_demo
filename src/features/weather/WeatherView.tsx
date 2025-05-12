import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import type { TemperatureUnits, Weather } from "../../models/weather";
import { WeatherRepository } from "../../repository/weatherRepository";
import { WeatherApiClient } from "../../api/client/weatherApiClient";
import { WeatherEmpty } from "./components/WeatherEmpty";
import { WeatherError } from "./components/WeatherError";
import { WeatherLoading } from "./components/WeatherLoading";
import { WeatherPopulated } from "./components/WeatherPopulated";
import {
  Box,
  Button,
  Text,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import { AddIcon, SearchIcon, SettingsIcon } from "@chakra-ui/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppSettingsContext } from "../settings/AppSettingsProvider";

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

const initialState: State = {
  status: "initial",
  weather: null,
};

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

const repo = new WeatherRepository(new WeatherApiClient());

export const WeatherView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSettingsPage = location.pathname === "/settings";

  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  const { temperatureUnits, setWeatherCondition } = context;

  const [city, setCity] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

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

  const renderContent = () => {
    switch (state.status) {
      case "initial":
        return <WeatherEmpty></WeatherEmpty>;
      case "loading":
        return <WeatherLoading></WeatherLoading>;
      case "failure":
        return <WeatherError></WeatherError>;
      case "success":
        // if (state.weather === null) return <WeatherError></WeatherError>;
        return (
          <WeatherPopulated
            weather={state.weather!}
            units={temperatureUnits}
            onRefresh={refreshWeather}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box h={"100vh"} w={"50vw"}>
      {/* <Button onClick={() => alert("Navigate to settings")}>⚙️</Button> */}
      <Flex
        h={"full"}
        direction={"column"}
        justify="space-around"
        align="center"
      >
        <InputGroup flex={1}>
          <Input
            placeholder="Enter city"
            onChange={(event) => setCity(event.target.value)}
          />
          <InputRightElement>
            <IconButton
              aria-label="Search city"
              icon={<SearchIcon />}
              onClick={async () => {
                if (city.length === 0) return;
                await fetchWeather(city);
              }}
            />
          </InputRightElement>
        </InputGroup>
        <Box flex={3}>{renderContent()}</Box>
      </Flex>
      {!isSettingsPage && (
        <Button
          colorScheme="blue"
          borderRadius="full"
          size="lg"
          position="fixed"
          bottom={6}
          right={6}
          boxShadow="lg"
          // as={Link}
          // to="settings"
          onClick={() => navigate("/settings")}
        >
          <Icon as={SettingsIcon} boxSize={5} />
        </Button>
      )}
    </Box>
  );
};
