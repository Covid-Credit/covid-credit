import React from "react";
import Router from "next/router";
import { Heading, Box, Text, Button, Flex, Link, Image } from "@chakra-ui/core";
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
      <Text as="h2" fontSize="lg" pr="5">
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
            We’re helping self-employed workers get financial support due to
            loss of income from Coronavirus
          </PageTitle>
          <Text
            fontSize={{ base: "md", sm: "xl" }}
            textAlign={{ base: "left", sm: "center" }}
            alignSelf="center"
            mb="6"
          >
            This is an <span>early preview</span> to demonstrate effectiveness
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
          px="5"
          py="10"
        >
          <FlowSegment number="1">Tell us how you're affected</FlowSegment>
          <FlowSegment number="2">Fill in your company details</FlowSegment>
          <FlowSegment number="3">Link your primary bank account</FlowSegment>
          <FlowSegment number="4">Recieve and send your report</FlowSegment>
        </Box>
      </Box>
      <Box>
        <Box
          maxWidth="5xl"
          px="5"
          margin="auto"
          mt="10"
          pb="10"
          borderBottom="1px solid #EEE"
        >
          <Text
            letterSpacing={"-.07rem"}
            fontSize="2xl"
            fontWeight="bold"
            mb="5"
          >
            Why are we doing this?
          </Text>
          <Text mb="5">
            More than 5 million self-employed and freelancers in the UK are not
            currently eligible to receive income support from the UK Government.
            This is largely due to the administrative complexities associated
            with self-employed income.
          </Text>
          <Text>
            Individuals that are self-employed can use covid.credit to generate
            a self-certification of income loss to send to HMRC
          </Text>
        </Box>
        <Box maxWidth="5xl" px="5" margin="auto" mt="10" mb="20">
          <Text
            letterSpacing={"-.07rem"}
            fontSize="2xl"
            fontWeight="bold"
            mb="5"
          >
            FAQ
          </Text>
          <Box mb="8">
            <Text fontWeight="bold" mb="2">
              What is Covid.credit?
            </Text>
            <Text>
              This is a proof of concept to demonstrate how open banking data
              could support freelancers in the COVID-19 economic crisis. The UK
              Government announced an historic level of support for PAYE
              employees who find themselves without work because of COVID-19
              (furlonged employees) will receive up to 80% of their income or
              £2,500 (whichever is lower).
            </Text>
          </Box>
          <Box mb="8">
            <Text fontWeight="bold" mb="2">
              Why use open banking data?
            </Text>
            <Text>
              By collecting historic banking data it is possible to prove
              previous income to be eligible for income relief from the UK
              Government. Our objective is to demonstrate this for the UK
              Government in the hope this can help those in need in a time of
              crisis.
            </Text>
          </Box>
          <Box mb="8">
            <Text fontWeight="bold" mb="2">
              Who is it for?
            </Text>
            <Text>
              In this proof of concept only sole traders are supported, limited
              companies involve more complexity
            </Text>
          </Box>
          <Box mb="8">
            <Text fontWeight="bold" mb="2">
              Is my data safe?
            </Text>
            <Text>
              Your data is protected and only available to you. None of the
              developers, team or any other party have access to your data. You
              may share your PDF output with whomever you see fit.
            </Text>
          </Box>
          <Box mb="8">
            <Text fontWeight="bold" mb="2">
              Will I get income support?
            </Text>
            <Text>
              At this stage the UK Government has not announced any support for
              freelancers or sole traders. An intended consequence of this proof
              of concept is that HM Government may look to introduce this
              service (or a service like it). Whilst you can access Universal
              Credit, we would encourage you to write to your MP to make them
              aware of this project.
            </Text>
          </Box>
        </Box>
      </Box>
      <Flex
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        bg="teal.500"
        color="white"
      >
        <Flex align="center" mr="24" mb="5">
          <Heading as="h1" size="lg" letterSpacing={"-.1rem"} flexGrow="1">
            Covid Credit
          </Heading>
        </Flex>
        <Box
          display="block"
          width={{ base: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
        >
          <Box>
            <Flex>
              <Text>
                Covid Credit was designed and created by the UK Fintech
                Community. With input from:
              </Text>
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
                  src="/img/Coconut.png"
                  alt="Coconut"
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
                  width="100px"
                  my="2"
                  src="/img/CreditKudos.png"
                  alt="11:FS"
                />
              </Link>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </>
  );
}
