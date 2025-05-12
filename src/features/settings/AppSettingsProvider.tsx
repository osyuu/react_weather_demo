import { createContext, useState } from "react";
import type { TemperatureUnits, WeatherCondition } from "../../models/weather";

interface AppSettingsContextType {
  temperatureUnits: TemperatureUnits;
  setTUnits: React.Dispatch<React.SetStateAction<TemperatureUnits>>;
  condition: WeatherCondition;
  setWeatherCondition: React.Dispatch<React.SetStateAction<WeatherCondition>>;
}

export const AppSettingsContext = createContext<AppSettingsContextType | null>(
  null
);

export const AppSettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [temperatureUnits, setTUnits] = useState<TemperatureUnits>("celsius");
  const [condition, setWeatherCondition] = useState<WeatherCondition>("clear");

  return (
    <AppSettingsContext.Provider
      value={{ temperatureUnits, setTUnits, condition, setWeatherCondition }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};
