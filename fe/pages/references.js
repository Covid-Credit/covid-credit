import React, { useState } from "react";
import Router from "next/router";
import {
  Box,
  Button,
  Heading,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { postApi } from "../utils";

export const References = props => {
  const [state, setState] = useState({
    loading: false,
    errorMessage: null,
    errors: {},
  });

  const [formData, setFormData] = useState({
    national_insurance_number: "",
    unique_tax_reference: "",
  });

  const handleSubmit = async event => {
    event.preventDefault();

    const errors = {};

    if (!formData.national_insurance_number) {
      errors["national_insurance_number"] = ["Required field"];
    }

    if (!formData.unique_tax_reference) {
      errors["unique_tax_reference"] = ["Required field"];
    }

    if (Object.keys(errors).length > 0) {
      setState(state => ({
        ...state,
        errors,
      }));
      return;
    }

    const payload = {
      national_insurance_number: formData.national_insurance_number,
      unique_tax_reference: formData.unique_tax_reference,
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
    Router.push("/banking-data-usage");
  };

  return (
    <Wrapper onSubmit={handleSubmit} progress={100}>
      <Box>
        <Heading as="h2" fontSize="2xl" margin="30px 0 40px">
          Your References
        </Heading>

        <Box display="flex" justifyContent="space-between" mb="10">
          <FormControl
            isRequired
            isInvalid={!!state.errors["national_insurance_number"]}
          >
            <FormLabel htmlFor="email">National Insurance Number</FormLabel>
            <Input
              placeholder="e.g. QQ123456C..."
              value={formData.national_insurance_number}
              onChange={event => {
                const value = event.target.value;
                setFormData(data => ({
                  ...data,
                  national_insurance_number: value,
                }));
              }}
            />
            <FormErrorMessage>
              {state.errors["national_insurance_number"]}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="space-between" mb="10">
          <FormControl
            isRequired
            isInvalid={!!state.errors["unique_tax_reference"]}
          >
            <FormLabel htmlFor="email">
              Your Unique Tax Reference Number
            </FormLabel>
            <Input
              placeholder="e.g. 1234567890..."
              value={formData.unique_tax_reference}
              onChange={event => {
                const value = event.target.value;
                setFormData(data => ({
                  ...data,
                  unique_tax_reference: value,
                }));
              }}
            />
            <FormErrorMessage>
              {state.errors["unique_tax_reference"]}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Button variantColor="teal" type="submit" isLoading={state.loading}>
          Next
        </Button>
      </Box>
    </Wrapper>
  );
};
export default References;
