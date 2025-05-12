import { Box, Center } from "@chakra-ui/react";
import { WeatherView } from "../features/weather/WeatherView";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AppSettingsContext } from "../features/settings/AppSettingsProvider";

export const WeatherLayout = () => {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  const { condition } = context;

  let bgColor = "white";
  switch (condition) {
    case "clear":
      bgColor = "blue.300";
      break;
    case "cloudy":
      bgColor = "blue.600";
      break;
    case "rainy":
      bgColor = "blue.800";
      break;
    default:
      bgColor = "white";
  }
  return (
    <Box bgColor={bgColor} width={"100vw"} padding={"2rem"}>
      <Center>
        <Outlet />
      </Center>
      <Center>
        <WeatherView />
      </Center>
    </Box>
  );
};
