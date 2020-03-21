import React from "react";
import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import theme from "../theme";
import { Global, css } from "@emotion/core";
import Head from "next/head";

export default function App({ Component, pageProps, persistentStateCookie }) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>COVID-19 Income Checker</title>
      </Head>
      <CSSReset />
      <Global
        styles={css`
          html {
            height: 100%;
            padding: 0;
            margin: 0;
          }
          body {
            height: 100%;
            overflow-x: hidden;
          }
          @font-face {
            font-family: "Inter";
            font-style: normal;
            font-weight: 100;
            font-display: swap;
            src: url("/fonts/Inter-Thin-subset.woff2?v=3.12") format("woff2"),
              url("/fonts/Inter-Thin-subset.woff?v=3.12") format("woff");
          }
          @font-face {
            font-family: "Inter";
            font-style: italic;
            font-weight: 100;
            font-display: swap;
            src: url("/fonts/Inter-ThinItalic-subset.woff2?v=3.12")
                format("woff2"),
              url("/fonts/Inter-ThinItalic-subset.woff?v=3.12") format("woff");
          }

          @font-face {
            font-family: "Inter";
            font-style: normal;
            font-weight: 200;
            font-display: swap;
            src: url("/fonts/Inter-ExtraLight-subset.woff2?v=3.12")
                format("woff2"),
              url("/fonts/Inter-ExtraLight-subset.woff?v=3.12") format("woff");
          }
          @font-face {
            font-family: "Inter";
            font-style: italic;
            font-weight: 200;
            font-display: swap;
            src: url("/fonts/Inter-ExtraLightItalic-subset.woff2?v=3.12")
                format("woff2"),
              url("/fonts/Inter-ExtraLightItalic-subset.woff?v=3.12")
                format("woff");
          }

          @font-face {
            font-family: "Inter";
            font-style: normal;
            font-weight: 300;
            font-display: swap;
            src: url("/fonts/Inter-Light-subset.woff2?v=3.12") format("woff2"),
              url("/fonts/Inter-Light-subset.woff?v=3.12") format("woff");
          }
          @font-face {
            font-family: "Inter";
            font-style: italic;
            font-weight: 300;
            font-display: swap;
            src: url("/fonts/Inter-LightItalic-subset.woff2?v=3.12")
                format("woff2"),
              url("/fonts/Inter-LightItalic-subset.woff?v=3.12") format("woff");
          }

          @font-face {
            font-family: "Inter";
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url("/fonts/Inter-Regular-subset.woff2?v=3.12") format("woff2"),
              url("/fonts/Inter-Regular-subset.woff?v=3.12") format("woff");
          }
          @font-face {
            font-family: "Inter";
            font-style: italic;
            font-weight: 400;
            font-display: swap;
            src: url("/fonts/Inter-Italic-subset.woff2?v=3.12") format("woff2"),
              url("/fonts/Inter-Italic-subset.woff?v=3.12") format("woff");
          }

          @font-face {
            font-family: "Inter";
            font-style: normal;
            font-weight: 500;
            font-display: swap;
            src: url("/fonts/Inter-Medium-subset.woff2?v=3.12") format("woff2"),
              url("/fonts/Inter-Medium-subset.woff?v=3.12") format("woff");
          }
          @font-face {
            font-family: "Inter";
            font-style: italic;
            font-weight: 500;
            font-display: swap;
            src: url("/fonts/Inter-MediumItalic-subset.woff2?v=3.12")
                format("woff2"),
              url("/fonts/Inter-MediumItalic-subset.woff?v=3.12") format("woff");
          }

          @font-face {
            font-family: "Inter";
            font-style: normal;
            font-weight: 600;
            font-display: swap;
            src: url("/fonts/Inter-SemiBold-subset.woff2?v=3.12")
                format("woff2"),
              url("/fonts/Inter-SemiBold-subset.woff?v=3.12") format("woff");
          }
          @font-face {
            font-family: "Inter";
            font-style: italic;
            font-weight: 600;
            font-display: swap;
            src: url("/fonts/Inter-SemiBoldItalic-subset.woff2?v=3.12")
                format("woff2"),
              url("/fonts/Inter-SemiBoldItalic-subset.woff?v=3.12")
                format("woff");
          }

          @font-face {
            font-family: "Inter";
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: url("/fonts/Inter-Bold-subset.woff2?v=3.12") format("woff2"),
              url("/fonts/Inter-Bold-subset.woff?v=3.12") format("woff");
          }
          @font-face {
            font-family: "Inter";
            font-style: italic;
            font-weight: 700;
            font-display: swap;
            src: url("/fonts/Inter-BoldItalic-subset.woff2?v=3.12")
                format("woff2"),
              url("/fonts/Inter-BoldItalic-subset.woff?v=3.12") format("woff");
          }

          @font-face {
            font-family: "Inter";
            font-style: normal;
            font-weight: 800;
            font-display: swap;
            src: url("/fonts/Inter-ExtraBold-subset.woff2?v=3.12")
                format("woff2"),
              url("/fonts/Inter-ExtraBold-subset.woff?v=3.12") format("woff");
          }
          @font-face {
            font-family: "Inter";
            font-style: italic;
            font-weight: 800;
            font-display: swap;
            src: url("/fonts/Inter-ExtraBoldItalic-subset.woff2?v=3.12")
                format("woff2"),
              url("/fonts/Inter-ExtraBoldItalic-subset.woff?v=3.12")
                format("woff");
          }

          @font-face {
            font-family: "Inter";
            font-style: normal;
            font-weight: 900;
            font-display: swap;
            src: url("/fonts/Inter-Black-subset.woff2?v=3.12") format("woff2"),
              url("/fonts/Inter-Black-subset.woff?v=3.12") format("woff");
          }
          @font-face {
            font-family: "Inter";
            font-style: italic;
            font-weight: 900;
            font-display: swap;
            src: url("/fonts/Inter-BlackItalic-subset.woff2?v=3.12")
                format("woff2"),
              url("/fonts/Inter-BlackItalic-subset.woff?v=3.12") format("woff");
          }
          #__next {
            height: 100%;
          }
        `}
      />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
