import { theme as chakraTheme } from "@chakra-ui/core";

export default {
  ...chakraTheme,
  fonts: {
    ...chakraTheme.fonts,
    heading: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    body: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  },
};

let bp = chakraTheme.breakpoints;
export const BREAKPOINTS = {
  sm: `@media screen and (min-width: ${bp.sm})`,
  md: `@media screen and (min-width: ${bp.md})`,
  lg: `@media screen and (min-width: ${bp.lg})`,
  xl: `@media screen and (min-width: ${bp.xl})`,
};
