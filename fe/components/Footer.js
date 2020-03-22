import React from "react";
import Router from "next/router";
import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Link,
  Image,
  Stack,
} from "@chakra-ui/core";

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const getStarted = () => {
  return Router.push({
    pathname: "/pre-questions",
  });
};

const Footer = props => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
    >
      <Box mr="24" mb="5" width="full">
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"} flexGrow="1">
          Covid Credit
        </Heading>
      </Box>
      <Box
        display="block"
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <Box margin="auto" maxWidth="5xl">
          <Flex direction={{ base: "column", md: "row" }}>
            <Text pr="10" mb="2">
              Covid Credit was designed and created by the UK Fintech Community.
              With input from:
            </Text>
            <Stack isInline spacing={4}>
              <Link
                mr="4"
                display="inline-block"
                display="flex"
                alignItems="center"
              >
                <Image
                  objectFit="cover"
                  alignSelf="center"
                  width="100px"
                  my="2"
                  src="/img/Fronted.png"
                  alt="Fronted"
                />
              </Link>
              {/* <Link
                mr="4"
                display="inline-block"
                display="flex"
                alignItems="center"
              >
                <Image
                  objectFit="cover"
                  alignSelf="center"
                  width="100px"
                  my="2"
                  src="/img/Coconut.png"
                  alt="Coconut"
                />
              </Link> */}
              <Link
                mr="4"
                display="inline-block"
                display="flex"
                alignItems="center"
              >
                <Image
                  objectFit="cover"
                  width="60px"
                  my="2"
                  src="/img/11FS.png"
                  alt="11:FS"
                />
              </Link>
              <Link
                mr="4"
                display="inline-block"
                display="flex"
                alignItems="center"
              >
                <Image
                  objectFit="cover"
                  width="160px"
                  my="2"
                  src="/img/CreditKudos.png"
                  alt="11:FS"
                />
              </Link>
            </Stack>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default Footer;
