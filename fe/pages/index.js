import React from "react";
import Router from "next/router";
import { Box, Text, Button, Link } from "@chakra-ui/core";
import Header from "../components/Header";

import PageTitle from "../components/PageTitle";

const getStarted = () => {
  return Router.push({
    pathname: "/pre-questions",
  });
};

const FlowSegment = props => {
  return (
    <Box py="5" px="1" flexBasis="25%" flexGrow="0">
      <Text
        textAlign="center"
        width="40px"
        mb="4"
        padding="2"
        fontWeight="bold"
        borderRadius="full"
        backgroundColor="teal.500"
        color="white"
      >
        {props.number}
      </Text>
      <Text as="h2" fontSize="lg">
        {props.children}
      </Text>
    </Box>
  );
};

export default function Home() {
  return (
    <>
      <Header />
      <Box
        height={{ base: "sm", sm: "xl" }}
        display="flex"
        flexDirection="column"
      >
        <Box margin="auto" maxWidth="4xl" mx="5" alignSelf="center">
          <PageTitle textAlign={{ base: "left", sm: "center" }} mb="6">
            We help sole-traders prove loss of income to the UK Govt during the
            national emergency
          </PageTitle>
          <Text
            fontSize={{ base: "md", sm: "xl" }}
            textAlign={{ base: "left", sm: "center" }}
            alignSelf="center"
            mb="6"
          >
            We want everyone affected to have access to financial help
          </Text>
          <Box textAlign={{ base: "left", sm: "center" }}>
            <Button
              variantColor="teal"
              size="lg"
              disabled={true}
              onClick={getStarted}
            >
              Prove my income
            </Button>
            <Text>(available soon)</Text>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          maxWidth="5xl"
          margin="auto"
          borderTop="1px solid #EEE"
          borderBottom="1px solid #EEE"
          px={{ base: "5", md: "10" }}
          py="10"
        >
          <FlowSegment number="1">Tell us how you're affected</FlowSegment>
          <FlowSegment number="2">Fill in your company details</FlowSegment>
          <FlowSegment number="3">Link your primary bank account</FlowSegment>
          <FlowSegment number="4">Recieve and send your report</FlowSegment>
        </Box>
      </Box>
    </>
  );
}
