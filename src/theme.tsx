import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "grey",
        color: "white",
      },
      "#root": {
        padding: 0,
        margin: 0,
      },
    },
  },
});
