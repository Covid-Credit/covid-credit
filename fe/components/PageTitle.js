import React from "react";
import { Text } from "@chakra-ui/core";

export default function PageTitle(props) {
  return (
    <Text
      as="h1"
      fontWeight="700"
      letterSpacing={"-.1rem"}
      lineHeight="1.3"
      fontSize={{ base: "4xl" }}
      {...props}
    >
      {props.children}
    </Text>
  );
}
