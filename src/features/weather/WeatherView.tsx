import { WeatherEmpty } from "./components/WeatherEmpty";
import { WeatherError } from "./components/WeatherError";
import { WeatherLoading } from "./components/WeatherLoading";
import { WeatherPopulated } from "./components/WeatherPopulated";
import { Box, Flex } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchInput } from "./components/SearchInput";
import { SettingButton } from "./components/SettingButton";
import { useWeatherView } from "./hooks/useWeatherView";

export const WeatherView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSettingsPage = location.pathname === "/settings";

  const {
    temperatureUnits,
    city,
    setCity,
    fetchWeather,
    refreshWeather,
    query,
  } = useWeatherView();

  const { data: weather, isSuccess, isError, isLoading } = query;

  const renderContent = () => {
    if (isLoading) {
      return <WeatherLoading />;
    }
    if (isError) {
      return <WeatherError />;
    }
    if (isSuccess && weather) {
      return (
        <WeatherPopulated
          weather={weather}
          units={temperatureUnits}
          onRefresh={refreshWeather}
        />
      );
    }
    return null;
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
        <SearchInput
          value={city}
          onChange={setCity}
          onSearch={async () => {
            await fetchWeather(city);
          }}
        />
        <Box flex={3}>{renderContent()}</Box>
      </Flex>
      {!isSettingsPage && (
        <SettingButton onClick={() => navigate("/settings")} />
      )}
    </Box>
  );
};
