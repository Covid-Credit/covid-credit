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
          FAQ
        </Text>
        <Box mb="8">
          <Text fontWeight="bold" as="h2" fontSize="lg" mb="2">
            What is Covid Credit?
          </Text>
          <Text>
            Covid Credit is a proof of concept to demonstrate how open banking
            data could support freelancers in the COVID-19 economic crisis. The
            UK Government announced an historic level of support for PAYE
            employees who find themselves without work because of COVID-19
            (furloughed employees) will receive up to 80% of their income or
            £2,500 (whichever is lower). This support does not cover millions of
            self-employed workers in the UK that make significant contributions
            to the UK economy.
          </Text>
        </Box>
        <Box mb="8">
          <Text fontWeight="bold" as="h2" fontSize="lg" mb="2">
            How does it work?
          </Text>
          <Text>
            The Covid Credit proof of concept asks for your personal
            circumstances (e.g. you are a sole trader but have recently lost
            income or work due to the COVID-19 crisis). It then asks you to
            login to your bank account via Open Banking to retrieve 12 months’
            worth of transaction history to verify regular income generated by
            your activities as a sole trader in the past. This will be used to
            provide a reasonable estimate of lost future income.
          </Text>
        </Box>
        <Box mb="8">
          <Text fontWeight="bold" as="h2" fontSize="lg" mb="2">
            Why use open banking data?
          </Text>
          <Text>
            By collecting historic banking data it is possible to prove previous
            income to be eligible for income relief from the UK Government. Our
            objective is to demonstrate this for the UK Government in the hope
            this can help those in need in a time of crisis.
          </Text>
        </Box>
        <Box mb="8">
          <Text fontWeight="bold" as="h2" fontSize="lg" mb="2">
            Who is it for?
          </Text>
          <Text>
            In this proof of concept only “sole traders” are supported. We
            understand that this excludes a whole range of other self-employed
            workers in the UK (for example, those set up as limited companies or
            in unregistered partnerships), but limited companies involve more
            complexity. If this proof of concept is adopted for use by the UK
            Government, we intend to further build out the service to capture as
            many self-employed workers as possible. Having created this proof of
            concept in a single weekend the team are open to all ways to improve
            the platform.
          </Text>
        </Box>
        <Box mb="8">
          <Text fontWeight="bold" as="h2" fontSize="lg" mb="2">
            Is my data safe?
          </Text>
          <Text>
            Your personal data will be collected and processed in accordance
            with our Terms and Privacy Policy. None of the developers, team or
            any other party have access to your data unless you have consented
            to share it with someone else. You may share your PDF output with
            whomever you see fit.
          </Text>
        </Box>
        <Box mb="8">
          <Text fontWeight="bold" as="h2" fontSize="lg" mb="2">
            Will I get income support?
          </Text>
          <Text>
            At this stage, the UK Government has not announced any income
            support for the self-employed. An intended consequence of this proof
            of concept is that HM Government may look to introduce this service
            (or a service like it). Whilst you can access Universal Credit, we
            would encourage you to write to your MP to make them aware of this
            project.
          </Text>
        </Box>
        <Box mb="8">
          <Text fontWeight="bold" as="h2" fontSize="lg" mb="2">
            Doesn’t HMRC have all of this data already?
          </Text>
          <Text mb={2}>
            Covid Credit is creating a self attestation that someone is self
            employed as a sole trader and has lost work. It’s intended to give
            HMRC a high degree of confidence that someone
          </Text>
          <List styleType="disc">
            <ListItem mb={2}>Is who they say they are</ListItem>
            <ListItem mb={2}>
              Did indeed make self employed income as a sole trader (e.g.
              wedding photography)
            </ListItem>
            <ListItem mb={2}>
              Is no longer able to perform this work due to COVID-19
            </ListItem>
          </List>

          <Text mb={2}>
            HMRC may have some of this data already but there is no process for
            certification of COVID-19 related losses. This was simplified in the
            case of furloughed workers by placing the responsibility on the
            employers directly.
          </Text>
          <Text mb={2}>
            Covid Credit allows sole traders to self-certify in a simple and
            easy to use format. Covid Credit could in future cross reference
            with HMRC, saving time and effort at HM Government if they were to
            adopt this service. This would mean sole traders could get paid
            sooner, offers HMRC would a reliable and secure way of verifying
            income (reducing their administrative overheads), and economic
            hardship is reduced.
          </Text>
        </Box>
        <Box mb="8">
          <Text fontWeight="bold" as="h2" fontSize="lg" mb="2">
            When will this be live?
          </Text>
          <Text>
            At this stage it’s unclear. The team is working to get something in
            front of the right decision makers asap. However there are no
            guarantees. If you can support in any way please get in touch at{" "}
            <Link
              color="teal.500"
              textDecoration="underline"
              href="mailto:covidcredit@fronted.rent"
            >
              covidcredit@fronted.rent
            </Link>
          </Text>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
