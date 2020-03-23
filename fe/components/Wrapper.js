import React from "react";
import Header from "../components/Header";
import HeaderProgress from "../components/HeaderProgress";
import { Box } from "@chakra-ui/core";

export const Wrapper = ({ children, progress, ...rest }) => {
  return (
    <>
      <HeaderProgress progress={progress} />
      <Box as="form" maxWidth="2xl" margin="auto" mt="16" px="5" {...rest}>
        {children}
      </Box>
    </>
  );
};
