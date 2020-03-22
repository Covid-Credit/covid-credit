import React, { useState } from "react";
import Router from "next/router";
import {
  Heading,
  Box,
  Text,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Flex,
  Link,
  Image,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/core";
import Header from "../components/Header";
import Footer from "../components/Footer";

import YouTube from "react-youtube-embed";

import PageTitle from "../components/PageTitle";
import { postApi } from "../utils";

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
  const [state, setState] = useState({
    loading: false,
    saved: false,
    value: "",
    errorMessage: null,
  });

  const handleSubmit = async event => {
    event.preventDefault();

    setState(state => ({
      ...state,
      loading: true,
    }));

    try {
      await postApi("join-waitlist", { email: state.value });
    } catch (error) {
      setState(state => ({
        ...state,
        loading: false,
        errorMessage: "Error saving your email",
      }));
      return;
    }

    setState(state => ({
      ...state,
      loading: false,
      saved: true,
    }));
  };

  return (
    <>
      <Header />
      <Box
        minHeight={{ base: "sm", sm: "xl" }}
        display="flex"
        flexDirection="column"
      >
        <Box margin="auto" maxWidth="4xl" mx="5" py="5" alignSelf="center">
          <PageTitle textAlign={{ base: "left", sm: "center" }} mb="6">
            A proof of concept that helps self-employed workers demonstrate loss
            of income to HMRC from Covid-19.
          </PageTitle>
          <Text
            fontSize={{ base: "md", sm: "xl" }}
            textAlign={{ base: "left", sm: "center" }}
            alignSelf="center"
            mb="6"
            maxWidth="2xl"
            margin="auto"
          >
            This has yet to be given the green light by the UK Gov, join our
            waitlist to be the first to know.
          </Text>
          <Box
            as="form"
            maxWidth="lg"
            margin="auto"
            textAlign={{ base: "left", sm: "center" }}
            onSubmit={handleSubmit}
          >
            {state.saved ? (
              <Text
                color="darkText"
                textAlign="center"
                width="100%"
                minHeight="40px"
                py={2}
              >
                You’re on the list{" "}
                <span role="img" aria-label="thumbsup">
                  👍
                </span>
              </Text>
            ) : (
              <FormControl isInvalid={!!state.errorMessage}>
                <InputGroup size="lg">
                  <Input
                    variant="filled"
                    type="email"
                    size="lg"
                    placeholder="e-mail"
                    pr="2em"
                    borderRadius="lg"
                    value={state.value}
                    required
                    onChange={event => {
                      const value = event.target.value;
                      setState(state => ({
                        ...state,
                        value,
                      }));
                    }}
                  />
                  <InputRightElement width="7.4em">
                    <Button
                      variantColor="teal"
                      size="md"
                      borderRadius="lg"
                      type="submit"
                      isLoading={state.loading}
                    >
                      Join waitlist
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{state.errorMessage}</FormErrorMessage>
              </FormControl>
            )}
          </Box>
        </Box>
      </Box>
      <Box margin="auto" maxWidth="5xl" my="10">
        <YouTube id="I7F8qC2RVVQ" />
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
            as="h2"
            id="why"
          >
            Why are we doing this?
          </Text>
          <Text fontSize="lg" mb="5">
            More than 5 million self-employed and freelancers in the UK are not
            currently eligible to receive income support from the UK Government.
            This is largely due to the administrative complexities associated
            with self-employed income.
          </Text>
          <Text fontSize="lg" mb="5">
            In 48 hours a team from the fintech community got together and built
            a working proof of concept. It allows a sole trader in the UK to
            self certify that they have lost income and prove their previous 12
            months of income by connecting to their bank account.
          </Text>
          <Text fontSize="lg" mb="5">
            This is possible due to the unique capabilities in the UK banking
            system called "open banking". Recent transaction history provides
            proof that income has been affected recently and by the crisis.
            Whilst the proof of concept is not publicly available, it works, and
            by creating something that works the hope is to demonstrate that
            this service could help the 5 million self employed through the
            COVID-19 crisis.
          </Text>
          <Text fontSize="lg" mb="5">
            We urge the UK Government to collaborate with us, the Fintech
            community, to help solve the rapidly evolving problem facing the UK
            self employed community.
          </Text>
          <Text fontSize="lg" mb="5">
            We are here and we are able. This service is ready to go live, but
            we are waiting on input and support from the UK Government before we
            do so. Sole traders could use Covid Credit’s proof of concept to
            generate a self-certification of income loss to send to HMRC.
          </Text>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
