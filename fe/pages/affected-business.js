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
    cancelled_work: null,
    future_work_cancelled: null,
    monthly_earnings: "",
    future_earnings: "",
  });

  const handleSubmit = async event => {
    event.preventDefault();

    const errors = {};

    if (!formData.cancelled_work) {
      errors["cancelled_work"] = ["Required field"];
    }

    if (!formData.future_work_cancelled) {
      errors["future_work_cancelled"] = ["Required field"];
    }

    if (Object.keys(errors).length > 0) {
      setState(state => ({
        ...state,
        errors,
      }));
      return;
    }

    const payload = {
      cancelled_work: formData.cancelled_work === "no" ? false : true,
      future_work_cancelled: formData.future_work_cancelled,
      monthly_earnings: formData.monthly_earnings,
      future_earnings: formData.future_earnings,
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
    Router.push("/about-you");
  };

  return (
    <Wrapper onSubmit={handleSubmit} progress={50}>
      <Box mb={8}>
        <Heading as="h2" fontSize="2xl" margin="30px 0 40px">
          How has Covid-19 affected your business
        </Heading>

        <Box display="flex" justifyContent="space-between" mb="10">
          <FormControl isRequired isInvalid={!!state.errors["cancelled_work"]}>
            <FormLabel htmlFor="email">
              Have you had agreed work cancelled due to Covid-19?
            </FormLabel>
            <RadioButtonGroup
              value={formData.cancelled_work}
              onChange={val => {
                setFormData(data => ({
                  ...data,
                  cancelled_work: val,
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
            <FormErrorMessage>
              {state.errors["cancelled_work"]}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="space-between" mb="10">
          <FormControl
            isRequired
            isInvalid={!!state.errors["future_work_cancelled"]}
          >
            <FormLabel htmlFor="email">
              Are you expecting some or all of your future work to be cancelled?
            </FormLabel>
            <RadioButtonGroup
              value={formData.future_work_cancelled}
              onChange={val => {
                setFormData(data => ({
                  ...data,
                  future_work_cancelled: val,
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
              {state.errors["future_work_cancelled"]}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="space-between" mb="10">
          <FormControl
            isRequired
            isInvalid={!!state.errors["monthly_earnings"]}
          >
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
                value={formData.monthly_earnings}
                onChange={event => {
                  const value = event.target.value;
                  setFormData(data => ({
                    ...data,
                    monthly_earnings: value,
                  }));
                }}
              />
            </InputGroup>
            <FormErrorMessage>
              {state.errors["monthly_earnings"]}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="space-between" mb="10">
          <FormControl isRequired isInvalid={!!state.errors["future_earnings"]}>
            <FormLabel htmlFor="email">
              How much do you expect to earn in the next few months (without
              income support) as a result of COVID-19
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
                value={formData.future_earnings}
                onChange={event => {
                  const value = event.target.value;
                  setFormData(data => ({
                    ...data,
                    future_earnings: value,
                  }));
                }}
              />
            </InputGroup>
            <FormErrorMessage>
              {state.errors["future_earnings"]}
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
