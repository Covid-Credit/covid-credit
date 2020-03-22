import React from "react";
import Router from "next/router";
import { Box, Text, Button, RadioButtonGroup, Heading } from "@chakra-ui/core";

const changePage = page => {
  return Router.push({
    pathname: `/${page}`,
  });
};

export const FormControls = props => {
  return (
    <Box display="flex" justifyContent="space-around">
      <Button onClick={() => window.history.back()}>Previous</Button>
      <Button variantColor="teal" onClick={() => changePage(props.nextChunk)}>
        Next
      </Button>
    </Box>
  );
};

export default FormControls;
