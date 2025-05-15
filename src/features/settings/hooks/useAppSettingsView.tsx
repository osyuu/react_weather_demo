import { useContext, useEffect } from "react";
import type { TemperatureUnits } from "../../../models/weather";
import { AppSettingsContext } from "../AppSettingsProvider";

export const useAppSettingsView = () => {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  const { temperatureUnits, setTUnits } = context;
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const units: TemperatureUnits = event.target.checked
      ? "fahrenheit"
      : "celsius";
    setTUnits(units);
  };

  useEffect(() => {
    console.log("[AppSettings] Mount");
    return () => {
      console.log("[AppSettings] Unmount");
    };
  }, []);

  return { temperatureUnits, setTUnits, handleToggle };
};
