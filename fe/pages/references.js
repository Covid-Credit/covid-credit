import React from "react";
import { Box, Heading, Input, FormControl, FormLabel } from "@chakra-ui/core";
import FormControls from "../components/form/Controls";
import { Wrapper } from "../components/Wrapper";

export const References = props => {
  return (
    <Wrapper>
      <Box>
        <Heading as="h2" fontSize="4xl" margin="30px 0 40px">
          Your References
        </Heading>

        <Box display="flex" justifyContent="space-between" mb="10">
          <FormControl isRequired>
            <FormLabel htmlFor="email">National Insurance Number</FormLabel>
            <Input
              type="number"
              placeholder="e.g. QQ123456C..."
              name="futureEarnings"
            />
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="space-between" mb="10">
          <FormControl isRequired>
            <FormLabel htmlFor="email">
              Your Unique Tax Reference Number
            </FormLabel>
            <Input
              type="number"
              placeholder="e.g. 1234567890..."
              name="taxRefNumber"
            />
          </FormControl>
        </Box>
        <FormControls />
      </Box>
    </Wrapper>
  );
};
export default References;

