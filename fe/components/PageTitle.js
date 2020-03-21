import React from "react";
import { Text } from "@chakra-ui/core";

export default function PageTitle(props) {
  return (
    <Text
      as="h1"
      fontWeight="700"
      lineHeight="1.3"
      fontSize={{ base: "2xl" }}
      {...props}
    >
      {props.children}
    </Text>
  );
}
