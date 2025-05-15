import { Switch, Text, Box, Flex } from "@chakra-ui/react";
import { useAppSettingsView } from "./hooks/useAppSettingsView";

export const AppSettings = () => {
  const { temperatureUnits, handleToggle } = useAppSettingsView();

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
