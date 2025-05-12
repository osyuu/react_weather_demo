import { RepeatIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/react";

export const WeatherLoading = () => {
  return (
    <Box>
      <Text fontSize="30px">⛅</Text>
      <Text fontSize="30px">Loading</Text>
    </Box>
  );
};
