import React from "react";
import HeaderProgress from "../components/HeaderProgress";
import { Box } from "@chakra-ui/core";

export const Wrapper = ({ children, progress, noProgBar, ...rest }) => {
  return (
    <>
      <HeaderProgress progress={progress} noProgBar={noProgBar} />
      <Box as="form" maxWidth="2xl" margin="auto" mt="16" px="5" {...rest}>
        {children}
      </Box>
    </>
  );
};
