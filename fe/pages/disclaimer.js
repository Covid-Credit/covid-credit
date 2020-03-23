import React, { useState } from "react";
import Router from "next/router";
import {
  Box,
  Button,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Checkbox,
} from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";

export default function Disclaimer() {
  const [state, setState] = useState({
    loading: false,
    errorMessage: null,
    errors: {},
  });

  const [checked, setChecked] = useState(false);

  const handleSubmit = async event => {
    const errors = {};

    event.preventDefault();
    if (!checked) {
      errors["disclaimer"] = ["Please agree to the terms before continuing"];
    }

    if (Object.keys(errors).length > 0) {
      setState(state => ({
        ...state,
        errors,
      }));
    } else {
      Router.push("/pre-questions");
    }
  };

  return (
    <Wrapper onSubmit={handleSubmit} progress={1} noProgBar>
      <Box>
        <Heading as="h2" fontSize="2xl" margin="30px 0 40px">
          Disclaimer
        </Heading>

        <Box display="flex" justifyContent="space-between" mb="10">
          <FormControl isRequired isInvalid={!!state.errors["disclaimer"]}>
            <FormLabel htmlFor="email">
              I understand that this is for testing purposes only and doesn’t
              guarantee any kind of support or relief from the UK government for
              work lost due to the coronavirus pandemic
            </FormLabel>
            <Checkbox
              mt={3}
              size="md"
              variantColor="teal"
              value={checked}
              onChange={() => {
                setChecked(!checked);
              }}
            >
              I accept these terms
            </Checkbox>

            <FormErrorMessage>{state.errors["disclaimer"]}</FormErrorMessage>
          </FormControl>
        </Box>
        <Button variantColor="teal" type="submit" isLoading={state.loading}>
          Next
        </Button>
      </Box>
    </Wrapper>
  );
}
