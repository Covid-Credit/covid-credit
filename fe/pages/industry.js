import React, { useState } from "react";
import Router from "next/router";
import {
  Box,
  Heading,
  Button,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { postApi } from "../utils";

const Industry = props => {
  const [state, setState] = useState({
    loading: false,
    value: "",
  });

  const handleSubmit = async event => {
    event.preventDefault();
    const payload = {
      industry: state.value,
    };

    setState(state => ({
      ...state,
      loading: true,
    }));

    try {
      await postApi("/update-report", payload);
    } catch (error) {
      setState(state => ({
        ...state,
        errorMessage: "Failed to update",
      }));
    }
    Router.push("/affected-business");
  };

  return (
    <Wrapper onSubmit={handleSubmit} progress={25}>
      <Box>
        <Heading as="h2" fontSize="2xl" margin="30px 0 40px">
          Your Industry
        </Heading>

        <Box display="flex" justifyContent="space-between" mb="10">
          <FormControl isRequired width="70%">
            <FormLabel htmlFor="email">What's your occupation</FormLabel>
            <Input
              type="text"
              placeholder="e.g. Software Engineer"
              name="occupation"
              value={state.value}
              onChange={event => {
                const value = event.target.value;
                setState(state => ({
                  ...state,
                  value,
                }));
              }}
            />
          </FormControl>
        </Box>
        <Button variantColor="teal" type="submit" isLoading={state.loading}>
          Next
        </Button>
      </Box>
    </Wrapper>
  );
};

export default Industry;
