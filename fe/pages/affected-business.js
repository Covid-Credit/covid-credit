import React, { useState } from "react";
import Router from "next/router";
import {
  Box,
  RadioButtonGroup,
  Heading,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  Button,
} from "@chakra-ui/core";
import { CustomRadio } from "../components/form/CustomRadio";
import { Wrapper } from "../components/Wrapper";
import { postApi } from "../utils";

export const AffectedBusiness = props => {
  const [state, setState] = useState({
    loading: false,
    errorMessage: null,
    errors: {},
  });

  const [formData, setFormData] = useState({
    cancelledWork: null,
    futureWorkCancelled: null,
    monthlyEarnings: "",
    futureEarnings: "",
  });

  const handleSubmit = async event => {
    event.preventDefault();

    const errors = {};

    if (!formData.cancelledWork) {
      errors["cancelledWork"] = "Required field";
    }

    if (!formData.futureWorkCancelled) {
      errors["futureWorkCancelled"] = "Required field";
    }

    if (Object.keys(errors).length > 0) {
      setState(state => ({
        ...state,
        errors,
      }));
      return;
    }

    const payload = {
      cancelled_work: formData.cancelledWork === "no" ? false : true,
      future_work_cancelled: formData.futureWorkCancelled,
      monthly_earnings: formData.monthlyEarnings,
      future_earnings: formData.futureEarnings,
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
    Router.push("/about-you");
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
      <Box mb={8}>
        <Heading as="h2" fontSize="4xl" margin="30px 0 40px">
          How has Covid-19 affected your business
        </Heading>

        <Box display="flex" justifyContent="space-between" mb="10">
          <FormControl isRequired isInvalid={!!state.errors["cancelledWork"]}>
            <FormLabel htmlFor="email">
              Have you had agreed work cancelled due to Covid-19?
            </FormLabel>
            <RadioButtonGroup
              value={formData.cancelledWork}
              onChange={val => {
                setFormData(data => ({
                  ...data,
                  cancelledWork: val,
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
            <FormErrorMessage>{state.errors["cancelledWork"]}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="space-between" mb="10">
          <FormControl
            isRequired
            isInvalid={!!state.errors["futureWorkCancelled"]}
          >
            <FormLabel htmlFor="email">
              Are you expecting some or all of your future work to be cancelled?
            </FormLabel>
            <RadioButtonGroup
              value={formData.futureWorkCancelled}
              onChange={val => {
                setFormData(data => ({
                  ...data,
                  futureWorkCancelled: val,
                }));
              }}
              isInline
              flexShrink="0"
              flexWrap="nowrap"
              alignSelf="center"
            >
              <CustomRadio value="no">No</CustomRadio>
              <CustomRadio value="some">Some</CustomRadio>
              <CustomRadio value="all">All</CustomRadio>
            </RadioButtonGroup>
            <FormErrorMessage>
              {state.errors["futureWorkCancelled"]}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="space-between" mb="10">
          <FormControl isRequired isInvalid={!!state.errors["monthlyEarnings"]}>
            <FormLabel htmlFor="email">
              How much on average do you usually earn per month?
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                color="gray.300"
                fontSize="1.2em"
                children="£"
              />
              <Input
                type="number"
                placeholder="e.g. £2800"
                name="monthlyEarnings"
                value={formData.monthlyEarnings}
                onChange={event => {
                  const value = event.target.value;
                  setFormData(data => ({
                    ...data,
                    monthlyEarnings: value,
                  }));
                }}
              />
            </InputGroup>
            <FormErrorMessage>
              {state.errors["monthlyEarnings"]}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="space-between" mb="10">
          <FormControl isRequired isInvalid={!!state.errors["futureEarnings"]}>
            <FormLabel htmlFor="email">
              How much on average do you expect to earn in the next few months?
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                color="gray.300"
                fontSize="1.2em"
                children="£"
              />
              <Input
                type="number"
                placeholder="e.g. £2800"
                name="futureEarnings"
                value={formData.futureEarnings}
                onChange={event => {
                  const value = event.target.value;
                  setFormData(data => ({
                    ...data,
                    futureEarnings: value,
                  }));
                }}
              />
            </InputGroup>
            <FormErrorMessage>
              {state.errors["futureEarnings"]}
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
export default AffectedBusiness;
