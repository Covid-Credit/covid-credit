import React from "react";
import {
  Box,
  RadioButtonGroup,
  Heading,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/core";
import FormControls from "../components/form/Controls";
import { CustomRadio } from "../components/form/CustomRadio";
import { Wrapper } from "../components/Wrapper";

export const AffectedBusiness = props => {
  return (
    <Wrapper>
      <Box>
        <Heading as="h2" fontSize="4xl" margin="30px 0 40px">
          How has Covid-19 affected your business
        </Heading>

        <Box display="flex" justifyContent="space-between" mb="10">
          <FormControl isRequired>
            <FormLabel htmlFor="email">
              Have you had agreed work cancelled due to Covid-19?
            </FormLabel>
            <RadioButtonGroup
              defaultValue="rad1"
              onChange={val => console.log(val)}
              isInline
              flexShrink="0"
              flexWrap="nowrap"
              alignSelf="center"
            >
              <CustomRadio value="rad1">No</CustomRadio>
              <CustomRadio value="rad2">Yes</CustomRadio>
            </RadioButtonGroup>
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="space-between" mb="10">
          <FormControl isRequired>
            <FormLabel htmlFor="email">
              Are you expecting some or all of your future work to be cancelled?
            </FormLabel>
            <RadioButtonGroup
              defaultValue="rad1"
              onChange={val => console.log(val)}
              isInline
              flexShrink="0"
              flexWrap="nowrap"
              alignSelf="center"
            >
              <CustomRadio value="rad1">No</CustomRadio>
              <CustomRadio value="rad2">Some</CustomRadio>
              <CustomRadio value="rad3">All</CustomRadio>
            </RadioButtonGroup>
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="space-between" mb="10">
          <FormControl isRequired>
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
              />
            </InputGroup>
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="space-between" mb="10">
          <FormControl isRequired>
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
              />
            </InputGroup>
          </FormControl>
        </Box>
        <FormControls nextChunk="about-you" />
      </Box>
    </Wrapper>
  );
};
export default AffectedBusiness;
