import React from "react";
import { Box, Text, Button, RadioButtonGroup } from "@chakra-ui/core";
import Header from "../components/Header";

const CustomRadio = React.forwardRef((props, ref) => {
  const { isChecked, isDisabled, value, ...rest } = props;
  return (
    <Button
      ref={ref}
      variantColor={isChecked ? "teal" : "gray"}
      aria-checked={isChecked}
      role="radio"
      isDisabled={isDisabled}
      {...rest}
    />
  );
});

export default function PreQuestions() {
  return (
    <>
      <Header />
      <Box as="form" maxWidth="2xl" margin="auto" mt="16" px="5">
        <Box display="flex" justifyContent="space-between" mb="10">
          <Text mb="2" alignSelf="center" fontSize="xl" pr="2">
            Are you registered as a sole trader?
          </Text>
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
        </Box>
        <Box display="flex" justifyContent="space-between" mb="10">
          <Text mb="2" alignSelf="center" fontSize="xl" pr="2">
            Have you experienced a loss of business?
          </Text>
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
        </Box>

        <Box display="flex" justifyContent="space-between" mb="10">
          <Text mb="2" alignSelf="center" fontSize="xl">
            Will you experience a loss of business in future?
          </Text>
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
        </Box>

        <Box display="flex" justifyContent="space-between" mb="10">
          <Text mb="2" alignSelf="center" fontSize="xl">
            Is this reflected in your financials?
          </Text>
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
        </Box>
      </Box>
    </>
  );
}
