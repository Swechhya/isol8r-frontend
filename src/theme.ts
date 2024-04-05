import { createTheme, Button, rem } from "@mantine/core";
import classes from "./button.module.css";

export const theme = createTheme({
  components: {
    Button: Button.extend({
      classNames: classes,
    }),
  },
  fontSizes: {
    xs: rem(10),
    sm: rem(11),
    md: rem(14),
    lg: rem(16),
    xl: rem(20),
  },
  fontFamily: "Verdana, sans-serif",
});
