import React from "react";
import { Box } from "@chakra-ui/core";
import Header from "../components/Header";

import PageTitle from "../components/PageTitle";

export default function Home() {
  return (
    <>
      <Header />
      <Box height="xl" display="flex">
        <PageTitle
          textAlign="center"
          margin="auto"
          width="4xl"
          alignSelf="center"
        >
          We help sole traders, prove loss of income to the UK Govt during this
          national emergency
        </PageTitle>
      </Box>
    </>
  );
}
