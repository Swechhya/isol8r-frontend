import { createTheme, Button, rem } from "@mantine/core";

export const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: "cyan",
        variant: "outline",
        mt: "20",
      },
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
