import { useContext, useEffect, useReducer, useState } from "react";
import type { TemperatureUnits } from "../../models/weather";
import {
  FormControl,
  SimpleGrid,
  FormLabel,
  Switch,
  Text,
  Box,
  Flex,
} from "@chakra-ui/react";
import { AppSettingsContext } from "./AppSettingsProvider";

export const AppSettings = () => {
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

  return (
    <Box h={"100vh"} w={"50vw"}>
      <Flex fontSize="2xl" justify="space-between" align={"baseline"}>
        <Text>Celsius</Text>
        <Switch
          id="isChecked"
          isChecked={temperatureUnits === "fahrenheit"}
          onChange={handleToggle}
          size="md"
        />
        <Text>Fahrenheit</Text>
      </Flex>
    </Box>
  );
};
