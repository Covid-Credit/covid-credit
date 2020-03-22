import React from "react";
import Header from "../components/Header";
import { Box } from "@chakra-ui/core";

export const Wrapper = ({ children }) => {
  return (
    <>
      <Header />
      <Box as="form" maxWidth="2xl" margin="auto" mt="16" px="5">
        {children}
      </Box>
    </>
  );
};
