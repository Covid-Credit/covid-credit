import React from "react";
import { Box, Heading, Input, FormControl, FormLabel } from "@chakra-ui/core";
import FormControls from "../components/form/Controls";
import { Wrapper } from "../components/Wrapper";

export const AboutYou = props => {
  return (
    <Wrapper>
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
          <FormControl isRequired width="70%">
            <FormLabel htmlFor="email">full name</FormLabel>
            <Input
              type="text"
              id="fullName"
              aria-describedby="full name"
              variant="flushed"
              placeholder="Your full name"
            />
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="space-between" mb="10">
          <FormControl isRequired width="70%">
            <FormLabel htmlFor="email">Your e-mail</FormLabel>
            <Input
              type="email"
              id="email"
              aria-describedby="e-mail"
              variant="flushed"
              placeholder="Your e-mail"
            />
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="space-between" mb="10">
          <FormControl isRequired width="70%">
            <FormLabel htmlFor="email">Your DOB</FormLabel>
            <Input
              type="date"
              id="dob"
              aria-describedby="dob"
              variant="flushed"
              placeholder="Your date of birth"
            />
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="space-between" mb="10">
          <FormControl isRequired width="70%">
            <FormLabel htmlFor="email">Your address</FormLabel>
            <Input
              type="text"
              id="address"
              aria-describedby="address"
              variant="flushed"
              placeholder="Your address"
            />
          </FormControl>
        </Box>
        <FormControls nextChunk="references" />
      </Box>
    </Wrapper>
  );
};
export default AboutYou;

