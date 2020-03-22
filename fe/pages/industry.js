import React from "react";
import { Box, Heading, Input, FormControl, FormLabel } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import FormControls from "../components/form/Controls";

export const Industry = props => {
  return (
    <Wrapper>
      <Box>
        <Heading as="h2" fontSize="4xl" margin="30px 0 40px">
          Your Industry
        </Heading>

        <Box display="flex" justifyContent="space-between" mb="10">
          <FormControl isRequired width="70%">
            <FormLabel htmlFor="email">What's your occupation</FormLabel>
            <Input
              type="text"
              placeholder="e.g. Software Engineer"
              name="occupation"
            />
          </FormControl>
        </Box>
        <FormControls nextChunk="affected-business" />
      </Box>
    </Wrapper>
  );
};
export default Industry;
