import React, { useState } from "react";
import Router from "next/router";
import {
  Box,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
} from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { postApi } from "../utils";

export const AboutYou = props => {
  const [state, setState] = useState({
    loading: false,
    errorMessage: null,
    errors: {},
  });

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    dob: "",
    address: "",
  });

  const handleSubmit = async event => {
    event.preventDefault();

    const errors = {};

    if (!formData.full_name) {
      errors["full_name"] = ["Required field"];
    }

    if (!formData.email) {
      errors["email"] = ["Required field"];
    }

    if (!formData.dob) {
      errors["dob"] = ["Required field"];
    }

    if (!formData.address) {
      errors["address"] = ["Required field"];
    }

    if (Object.keys(errors).length > 0) {
      setState(state => ({
        ...state,
        errors,
      }));
      return;
    }

    const payload = {
      full_name: formData.full_name,
      email: formData.email,
      dob: formData.dob,
      address: formData.address,
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
    Router.push("/references");
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
      <Box>
        <Heading as="h2" fontSize="4xl" margin="30px 0 40px">
          About You
        </Heading>

        <Box
          display="flex"
          flexFlow="row"
          justifyContent="space-between"
          mb="10"
        >
          <FormControl
            isRequired
            width="70%"
            isInvalid={!!state.errors["full_name"]}
          >
            <FormLabel htmlFor="full name">full name</FormLabel>
            <Input
              isRequired
              value={formData.full_name}
              onChange={event => {
                const value = event.target.value;
                setFormData(data => ({
                  ...data,
                  full_name: value,
                }));
              }}
              type="text"
              id="fullName"
              aria-describedby="full name"
              variant="flushed"
              placeholder="Your full name"
            />
            <FormErrorMessage>
              {state.errors["future_earnings"]}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="space-between" mb="10">
          <FormControl
            isRequired
            width="70%"
            isInvalid={!!state.errors["email"]}
          >
            <FormLabel htmlFor="email">Your e-mail</FormLabel>
            <Input
              isRequired
              type="email"
              id="email"
              value={formData.email}
              onChange={val => {
                const value = event.target.value;
                setFormData(data => ({
                  ...data,
                  email: value,
                }));
              }}
              aria-describedby="e-mail"
              variant="flushed"
              placeholder="Your e-mail"
            />
            <FormErrorMessage>{state.errors["email"]}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="space-between" mb="10">
          <FormControl isRequired width="70%" isInvalid={!!state.errors["dob"]}>
            <FormLabel htmlFor="email">Your DOB</FormLabel>
            <Input
              isRequired
              type="date"
              id="dob"
              value={formData.dob}
              onChange={val => {
                const value = event.target.value;
                setFormData(data => ({
                  ...data,
                  dob: value,
                }));
              }}
              aria-describedby="dob"
              variant="flushed"
              placeholder="Your date of birth"
            />
            <FormErrorMessage>{state.errors["dob"]}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="space-between" mb="10">
          <FormControl
            isRequired
            width="70%"
            isInvalid={!!state.errors["address"]}
          >
            <FormLabel htmlFor="email">Your address</FormLabel>
            <Input
              isRequired
              type="text"
              id="address"
              value={formData.address}
              onChange={val => {
                const value = event.target.value;
                setFormData(data => ({
                  ...data,
                  address: value,
                }));
              }}
              aria-describedby="address"
              variant="flushed"
              placeholder="Your address"
            />
            <FormErrorMessage>{state.errors["address"]}</FormErrorMessage>
          </FormControl>
        </Box>
        <Button variantColor="teal" type="submit" isLoading={state.loading}>
          Next
        </Button>
      </Box>
    </Wrapper>
  );
};
export default AboutYou;
