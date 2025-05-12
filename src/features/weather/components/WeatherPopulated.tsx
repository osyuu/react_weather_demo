import { memo } from "react";
import type {
  TemperatureUnits,
  Weather,
  WeatherCondition,
} from "../../../models/weather";
import { Box, Button, IconButton, Text } from "@chakra-ui/react";
import { RepeatIcon, SpinnerIcon } from "@chakra-ui/icons";
import { TemperatureUtils } from "../../../utils/temperature";

interface Props {
  weather: Weather;
  units: TemperatureUnits;
  onRefresh: () => void;
}

export const WeatherPopulated: React.FC<Props> = memo(
  ({ weather, units, onRefresh }) => {
    const formatTemperature = () => {
      const temp =
        units === "celsius"
          ? weather.temperature
          : TemperatureUtils.toFahrenheit(weather.temperature);
      return `${temp.toFixed(2)}°${units === "celsius" ? "C" : "F"}`;
    };

    const formatTime = (date: Date) => {
      return `Last Updated at ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    };

    return (
      <Box>
        <Text fontSize="30px">{getWeatherEmoji(weather.condition)}</Text>
        <Text fontSize="30px">{weather.location}</Text>
        <Text fontSize="35px" as={"b"}>
          {formatTemperature()}
        </Text>
        <Text fontSize="15px">{formatTime(weather.lastUpdated)}</Text>

        <IconButton
          aria-label="Refresh weather"
          variant={"ghost"}
          icon={<RepeatIcon />}
          onClick={onRefresh}
        />
      </Box>
    );
  }
);

const getWeatherEmoji = (condition: WeatherCondition) => {
  switch (condition) {
    case "clear":
      return "☀️";
    case "rainy":
      return "🌧️";
    case "cloudy":
      return "☁️";
    case "snowy":
      return "🌨️";
    default:
      return "❓";
  }
};
