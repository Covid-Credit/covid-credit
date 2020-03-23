import React, { useState } from "react";
import Router from "next/router";
import {
  Box,
  RadioButtonGroup,
  Button,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/core";
import { CustomRadio } from "../components/form/CustomRadio";
import { Wrapper } from "../components/Wrapper";
import { postApi } from "../utils";

export default function PreQuestions() {
  const [state, setState] = useState({
    loading: false,
    errorMessage: null,
    errors: {},
  });

  const [formData, setFormData] = useState({
    self_employed: null,
    ltd_company: null,
    employed_since: "2019-01-01",
  });

  const handleSubmit = async event => {
    event.preventDefault();

    const errors = {};

    if (!formData.self_employed) {
      errors["self_employed"] = "Required field";
    }

    if (!formData.ltd_company) {
      errors["ltd_company"] = "Required field";
    }

    if (!formData.employed_since) {
      errors["employed_since"] = "Required field";
    }

    if (Object.keys(errors).length > 0) {
      setState(state => ({
        ...state,
        errors,
      }));
      return;
    }

    const payload = {
      self_employed: formData.self_employed === "no" ? false : true,
      ltd_company: formData.ltd_company === "no" ? false : true,
      employed_since: formData.employed_since,
    };

    setState(state => ({
      ...state,
      loading: true,
    }));

    try {
      await postApi("/update-report", payload);
    } catch (error) {
      const { errors } = error.data;
      setState(state => ({
        ...state,
        loading: false,
        errors,
      }));
      return;
    }
    Router.push("/industry");
  };

  return (
    <Wrapper onSubmit={handleSubmit} progress={1}>
      <Box>
        <Heading as="h2" fontSize="2xl" margin="30px 0 40px">
          Let’s check we can help you
        </Heading>

        <Box display="flex" justifyContent="space-between" mb="10">
          <FormControl isRequired isInvalid={!!state.errors["self_employed"]}>
            <FormLabel htmlFor="email">Are you self-employed?</FormLabel>
            <RadioButtonGroup
              isInline
              flexShrink="0"
              flexWrap="nowrap"
              alignSelf="center"
              value={formData.self_employed}
              onChange={val => {
                setFormData(data => ({
                  ...data,
                  self_employed: val,
                }));
              }}
            >
              <CustomRadio value="no">No</CustomRadio>
              <CustomRadio value="yes">Yes</CustomRadio>
            </RadioButtonGroup>
            <FormErrorMessage>{state.errors["self_employed"]}</FormErrorMessage>
          </FormControl>
        </Box>

        <Box display="flex" justifyContent="space-between" mb="10">
          <FormControl isRequired isInvalid={!!state.errors["ltd_company"]}>
            <FormLabel htmlFor="email">
              Do you trade under your own LTD company?
            </FormLabel>
            <RadioButtonGroup
              value={formData.ltd_company}
              onChange={val => {
                setFormData(data => ({
                  ...data,
                  ltd_company: val,
                }));
              }}
              isInline
              flexShrink="0"
              flexWrap="nowrap"
              alignSelf="center"
            >
              <CustomRadio value="no">No</CustomRadio>
              <CustomRadio value="yes">Yes</CustomRadio>
            </RadioButtonGroup>
            <FormErrorMessage>{state.errors["ltd_company"]}</FormErrorMessage>
          </FormControl>
        </Box>

        <Box display="flex" justifyContent="space-between" mb="10">
          <FormControl
            isRequired
            width="70%"
            isInvalid={!!state.errors["employed_since"]}
          >
            <FormLabel htmlFor="email">
              How long have you been self employed?
            </FormLabel>
            <Input
              type="date"
              id="employed_since"
              aria-describedby="Self employed since"
              variant="flushed"
              placeholder="Self employed since..."
              value={formData.employed_since}
              onChange={e => {
                const value = e.target.value;
                setFormData(data => ({
                  ...data,
                  employed_since: value,
                }));
              }}
            />
            <FormErrorMessage>
              {state.errors["employed_since"]}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Button variantColor="teal" type="submit" isLoading={state.loading}>
          Next
        </Button>
      </Box>
    </Wrapper>
  );
}
