import React from "react";
import Router from "next/router";
import { Box, Heading, Flex, Text, Button, Link } from "@chakra-ui/core";

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

const Header = props => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

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
        <Heading as="h1" mr={5} size="lg" letterSpacing={"-.1rem"}>
          <Link textDecoration="none" href="/">
            Covid Credit
          </Link>
        </Heading>
      </Flex>

      <Box display={{ base: "flex", md: "none" }} onClick={handleToggle}>
        <Text mr="2">Menu</Text>
        <svg
          fill="white"
          width="20px"
          height="25px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems>
          <Link href="/#why">Why</Link>
        </MenuItems>
        <MenuItems>
          <Link href="/faq">FAQ</Link>
        </MenuItems>
        <MenuItems>
          <Link href="/#further">Further help</Link>
        </MenuItems>
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        {/* <Button as="Link" bg="transparent" border="1px" onClick={getStarted}> */}
        <Link href="mailto:covidcredit@fronted.rent">Get in touch</Link>
        {/* </Button> */}
      </Box>
    </Flex>
  );
};

export default Header;
