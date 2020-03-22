import React from "react";
import Router from "next/router";
import {
  Box,
  Heading,
  Flex,
  Text,
  Stack,
  Button,
  Progress,
} from "@chakra-ui/core";

const Header = props => {
  const [progress, setProgress] = React.useState(props.progress || 40);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          Covid Credit
        </Heading>
      </Flex>

      <Box flexGrow={1}>
        <Progress
          size="sm"
          height="1"
          position="relative"
          top="6px"
          position="relative"
          margin="auto"
          color="orange"
          borderRadius={10}
          value={progress}
          maxWidth="xl"
        ></Progress>
        <Flex
          maxWidth="xl"
          margin="auto"
          position="relative"
          top="-4px"
          width="full"
          justifyContent="space-between"
        >
          <Box
            width={4}
            height={4}
            backgroundColor="orange.500"
            borderRadius="full"
          />
          <Box
            width={4}
            height={4}
            backgroundColor={progress >= 25 ? "orange.500" : "white"}
            borderRadius="full"
          />
          <Box
            width={4}
            height={4}
            backgroundColor={progress >= 50 ? "orange.500" : "white"}
            borderRadius="full"
          />
          <Box
            width={4}
            height={4}
            backgroundColor={progress >= 75 ? "orange.500" : "white"}
            borderRadius="full"
          />
          <Box
            width={4}
            height={4}
            backgroundColor={progress >= 90 ? "orange.500" : "white"}
            borderRadius="full"
          />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Header;
