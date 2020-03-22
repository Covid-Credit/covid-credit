import React from "react";
import {
  Box,
  Text,
  List,
  ListItem,
  ListIcon,
  Button,
  Flex,
} from "@chakra-ui/core";
import Header from "../components/Header";

export default function BankingDataUsage() {
  return (
    <>
      <Header />
      <Box as="form" maxWidth="2xl" margin="auto" mt="16" px="5">
        <Text
          mb="5"
          fontSize="2xl"
          fontWeight="bold"
          alignSelf="center"
          letterSpacing={"-.1rem"}
          pr="2"
        >
          Your data dashboard
        </Text>
      </Box>
    </>
  );
}
