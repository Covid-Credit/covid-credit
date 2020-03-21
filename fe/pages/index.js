import React from "react";
import { Box, Text } from "@chakra-ui/core";
import Header from "../components/Header";

import PageTitle from "../components/PageTitle";

export default function Home() {
  return (
    <>
      <Header />
      <Box
        height={{ base: "sm", sm: "xl" }}
        display="flex"
        flexDirection="column"
      >
        <Box margin="auto" maxWidth="4xl" mx="5" alignSelf="center">
          <PageTitle textAlign={{ base: "left", sm: "center" }} mb="6">
            We help sole-traders prove loss of income to the UK Govt during the
            national emergency
          </PageTitle>
          <Text
            fontSize={{ base: "md", sm: "xl" }}
            textAlign={{ base: "left", sm: "center" }}
            alignSelf="center"
          >
            We believe everyone affected should have access to financial help
          </Text>
        </Box>
      </Box>
    </>
  );
}
