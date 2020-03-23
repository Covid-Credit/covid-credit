import React from "react";
import Router from "next/router";
import {
  Heading,
  Box,
  List,
  ListItem,
  Text,
  Button,
  Input,
  InputGroup,
  InputAddon,
  InputRightElement,
  Flex,
  Link,
  Image,
} from "@chakra-ui/core";
import Header from "../components/Header";
import Footer from "../components/Footer";

import PageTitle from "../components/PageTitle";

export default function FAQ() {
  return (
    <>
      <Header />
      <Box maxWidth="5xl" px="5" margin="auto" mt="10" mb="20">
        <Text
          letterSpacing={"-.07rem"}
          fontSize="2xl"
          fontWeight="bold"
          mb="5"
          as="h1"
          id="faq"
        >
          Privacy Policy
        </Text>
        <Box mb="8">
          <Text fontWeight="bold" as="h2" fontSize="lg" mb="2">
            Who we are?
          </Text>
          <Text mb="2">
            Covid Credit is a group of UK Fintechs (“Covid
            Credit”/“we”/“us”/”our”) working on a proof of concept project to
            demonstrate how open banking data could support freelancers in the
            COVID-19 economic crisis. The tool will allow freelancers and sole
            traders to submit basic information and utilise open banking to
            create a simple report that can be sent to HMRC to verify your last
            12 months of income (“Report”).
          </Text>
          <Text mb="2">
            The team involved in the collection and processing of your data
            includes:
          </Text>
          <Text mb="2">
            Credit Kudos Limited, 4 Bath Place, London EC2A 3DR - the open
            banking service provider that you will connect your bank account
            with that will create your Report.
          </Text>
          <Text mb="2">
            Credit Kudos is a Credit Reference Agency ("CRA") and Account
            Information Services Provider ("AISP") that provides services that
            help consumer credit firms, identity verification companies, banks,
            and financial institutions (“Institutions”) to conduct income
            verification, identity verification and credit checks.
          </Text>
          <List styleType="disc">
            <ListItem mb={2}>Fronted</ListItem>
            <ListItem mb={2}>11:FS</ListItem>
            <ListItem mb={2}>Coconut</ListItem>
            <ListItem mb={2}>Capital on Tap</ListItem>
          </List>
        </Box>
        <Box mb="8">
          <Text fontWeight="bold" as="h2" fontSize="lg" mb="2">
            Account Information Services
          </Text>
          <Text mb="2">
            We use Credit Kudos, an Account Information Services Provider, to
            enable you to send your banking data and create the Report. When you
            connect, Credit Kudos gains read-only access and stores transaction
            data associated with the connected accounts. This lets us categorise
            your transactions and create the report in a PDF format. All your
            details are encrypted and protected by bank level security.
          </Text>
          <Text mb="2">
            By connecting with Credit Kudos you’ll be agreeing to their Terms of
            Service and Privacy Policy.
          </Text>
          <Text mb="2">
            <Link
              textDecoration="underline"
              color="teal"
              href="https://www.creditkudos.com/legal/privacy"
              isExternal
            >
              Privacy Policy
            </Link>
          </Text>
          <Text mb="2">
            <Link
              textDecoration="underline"
              color="teal"
              href="https://www.creditkudos.com/legal/terms"
              isExternal
            >
              Terms of Service
            </Link>
          </Text>
          <Text mb="2">
            For the purposes of providing Account Information Services, Credit
            Kudos will retain Personal Data. Such Personal Data may include your
            date of birth, account information, account balance, transactions,
            information on loans, insurance data and investments data. The
            manner in which Credit Kudos access, use, process and store your
            personal data for the provision of the Services is set out in Credit
            Kudos’s Privacy Policy.
          </Text>
        </Box>
        <Box mb="8">
          <Text fontWeight="bold" as="h2" fontSize="lg" mb="2">
            When does this Policy apply?
          </Text>
          <Text>
            When you start the submission process you will be asked to consent
            to us processing your personal information in accordance with this
            Covid Credit Privacy Policy “Policy” and the Terms of Use.
          </Text>
        </Box>
        <Box mb="8">
          <Text fontWeight="bold" as="h2" fontSize="lg" mb="2">
            The information we hold about you and how we use it
          </Text>
          <Text mb="2">
            Through the website you will be submit the following information:
          </Text>
          <List styleType="disc">
            <ListItem mb={2}>
              Email - so we can send you the report and keep in touch
            </ListItem>
            <ListItem mb={2}>Full name - so we can create your report</ListItem>
            <ListItem mb={2}>
              UTR - to complete your report and to support your self-declaration
              of your submission
            </ListItem>
            <ListItem mb={2}>
              NI - to complete your report and to support your self-declaration
              of your submission
            </ListItem>
            <ListItem mb={2}>
              Date of birth - to complete your report and to support your
              self-declaration of your submission
            </ListItem>
            <ListItem mb={2}>
              Residential address - to complete your report and to support your
              self-declaration of your submission
            </ListItem>
            <ListItem mb={2}>
              Your banking data - this will be used to create your Report by
              Credit Kudos. Your Report will be deleted from the database after
              30 days - if you need to create another Report you will need to
              complete the process again
            </ListItem>
          </List>
        </Box>
        <Box mb="8">
          <Text fontWeight="bold" as="h2" fontSize="lg" mb="2">
            Uses made of your personal information
          </Text>
          <Text mb="2">
            Your personal information will not be used for any other purpose
            than to create a report that you can submit to HMRC. We will not use
            your personal data for any other marketing purposes or for any other
            reason.
          </Text>
          <Text mb="2">
            We may use your data as part of our analysis of the project and how
            we have supported sole traders and freelancers to access financial
            support through the Coronavirus pandemic.
          </Text>
        </Box>
        <Box mb="8">
          <Text fontWeight="bold" as="h2" fontSize="lg" mb="2">
            Who we share your personal information with
          </Text>
          <Text mb="2">
            Your data will only be shared by the companies listed at the top of
            this “Policy” and used to create your report.
          </Text>
          <Text mb="2">
            We may use your data in an anonymised format to share publicly the
            number and types of sole traders and freelancers we have support to
            access additional financial support.
          </Text>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
