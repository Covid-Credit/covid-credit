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
          Terms of Use
        </Text>
        <Box mb="8">
          <Text mb={2}>
            These terms of use govern your access to and use of the entire
            contents of the website www.covidcredit.uk (“Website”) owned and
            operated by Covid Credit (“Covid Credit”).
          </Text>
          <Text mb={2}>
            Please read these terms carefully before using the Website. Using
            the Website indicates that you accept these terms. If you do not
            accept these terms, do not use the Website. Covid Credit may revise
            these terms of use at any time by updating this posting.
          </Text>
          <Text mb={2}>
            We are committed to safeguarding the privacy of our website
            visitors; this policy sets out how we will treat your personal
            information.
          </Text>
        </Box>
        <Box mb="8">
          <Text fontWeight="bold" as="h2" fontSize="lg" mb="2">
            Introduction
          </Text>
          <Text mb={2}>
            Covid Credit is a group of UK Fintechs (“Covid
            Credit”/“we”/“us”/”our”) working on a proof of concept project to
            demonstrate how open banking data could support freelancers in the
            COVID-19 economic crisis. The tool will allow freelancers and sole
            traders to submit basic information and utilise open banking to
            create a simple report that can be sent to HMRC to verify your last
            12 months of income (“Report”).
          </Text>
          <Text mb={2}>
            Through the submission of the application form and where you will be
            prompted to agree to these terms and the Privacy Policy (Link) you
            agree to the following:
          </Text>
        </Box>
        <Box mb="8">
          <Text fontWeight="bold" as="h2" fontSize="lg" mb="2">
            Usage of your data
          </Text>
          <Text mb={2}>
            The Report that Covid Credit will create is populated with the
            information provided by you in the application form and using the
            data submitted through your bank account when completing your
            connection using Credit Kudos. The data collected is listed in the{" "}
            <Link
              textDecoration="underline"
              color="teal"
              href="/privacy-policy"
            >
              Privacy Policy
            </Link>
            .
          </Text>
          <Text mb={2}>
            Once the Report is created it will be made available to you through
            a unique URL where you can download it for up to 30 days after the
            initial submission.
          </Text>
          <Text mb={2}>
            There is also an option for the Report to be automatically sent to
            the appropriate government office. You will be able to select this
            option at the final step.
          </Text>
          <Text mb={2}>
            Covid Credit cannot guarantee that the submission of the Report to
            the government will be successful in
          </Text>
        </Box>
        <Box mb="8">
          <Text fontWeight="bold" as="h2" fontSize="lg" mb="2">
            Licence to use website
          </Text>
          <Text mb={2}>
            Unless otherwise stated, we or our licensors own the intellectual
            property rights in the website and material on the website. Subject
            to the licence below, all these intellectual property rights are
            reserved.
          </Text>
          <Text mb={2}>
            You may view, download for caching purposes only, and print pages or
            documents from the website for your own personal use, subject to the
            restrictions set out below and elsewhere in these terms and
            conditions.
          </Text>
          <Text mb={2}>You must not:</Text>
          <List styleType="disc">
            <ListItem mb={2}>
              Republish material from this website (including republication on
              another website). Sell, rent or sub-licence material from the
              website.
            </ListItem>
            <ListItem mb={2}>
              Show any material from the website in public.
            </ListItem>
            <ListItem mb={2}>
              Reproduce, duplicate, copy or otherwise exploit material on our
              website for a commercial purpose.
            </ListItem>
            <ListItem mb={2}>
              Edit or otherwise modify any material on the website; or
              redistribute material from this website.
            </ListItem>
          </List>
        </Box>
        <Box mb="8">
          <Text fontWeight="bold" as="h2" fontSize="lg" mb="2">
            Acceptable use
          </Text>
          <Text mb={2}>
            You must not use our website in any way that causes, or may cause,
            damage to the website or impairment of the availability or
            accessibility of the website; or in any way which is unlawful,
            illegal, fraudulent or harmful, or in connection with any unlawful,
            illegal, fraudulent or harmful purpose or activity.
          </Text>
          <Text mb={2}>
            You must not use our website to copy, store, host, transmit, send,
            use, publish or distribute any material which consists of (or is
            linked to) any spyware, computer virus, Trojan horse, worm,
            keystroke logger, rootkit or other malicious computer software.
          </Text>
          <Text mb={2}>
            You must not conduct any systematic or automated data collection
            activities (including without limitation scraping, data mining, data
            extraction and data harvesting) on or in relation to our website
            without our express written consent.
          </Text>
          <Text mb={2}>
            You must not use our website to transmit or send unsolicited
            commercial communications.
          </Text>
        </Box>
        <Box mb="8">
          <Text fontWeight="bold" as="h2" fontSize="lg" mb="2">
            Restricted access
          </Text>
          <Text mb={2}>
            Access to certain areas of our website is restricted. We reserve the
            right to restrict access to areas of our website, or indeed our
            whole website, at our discretion.
          </Text>
        </Box>
        <Box mb="8">
          <Text fontWeight="bold" as="h2" fontSize="lg" mb="2">
            Limited warranties
          </Text>
          <Text mb={2}>
            Whilst we endeavor to ensure that the information on this website
            (excluding user content) is correct, we do not warrant its
            completeness or accuracy, nor do we commit to ensuring that the
            website remains available or that the material on the website is
            kept up-to-date.
          </Text>
          <Text mb={2}>
            To the maximum extent permitted by applicable law we exclude all
            representations, warranties and conditions relating to this website
            and the use of this website (including, without limitation, any
            warranties implied by law of satisfactory quality, fitness for
            purpose and/or the use of reasonable care and skill).
          </Text>
        </Box>
        <Box mb="8">
          <Text fontWeight="bold" as="h2" fontSize="lg" mb="2">
            Limitations of liability
          </Text>
          <Text mb={2}>
            Nothing in these terms and conditions (or elsewhere on our website)
            will exclude or limit our liability for fraud, for death or personal
            injury caused by our negligence, or for any other liability which
            cannot be excluded or limited under applicable law.
          </Text>
          <Text mb={2}>
            Subject to this, our liability to you in relation to the use of our
            website or under or in connection with these terms and conditions,
            whether in contract, tort (including negligence) or otherwise, will
            be limited as follows:
          </Text>
          <Text mb={2}>
            To the extent that the website and the information and services on
            the website are provided free-of-charge, we will not be liable for
            any loss or damage of any nature.
          </Text>
          <Text mb={2}>
            We will not be liable for any consequential, indirect or special
            loss or damage.
          </Text>
          <Text mb={2}>
            We will not be liable for any loss of profit, income, revenue,
            anticipated savings, contracts, business, goodwill, reputation,
            data, or information.
          </Text>
          <Text mb={2}>
            We will not be liable for any loss or damage arising out of any
            event or events beyond our reasonable control.
          </Text>
        </Box>
        <Box mb="8">
          <Text fontWeight="bold" as="h2" fontSize="lg" mb="2">
            Indemnity
          </Text>
          <Text mb={2}>
            You hereby indemnify us and undertake to keep us indemnified against
            any losses, damages, costs, liabilities and expenses (including
            without limitation legal expenses and any amounts paid by us to a
            third party in settlement of a claim or dispute on the advice of our
            legal advisers) incurred or suffered by us arising out of any breach
            by you of any provision of these terms and conditions, or arising
            out of any claim that you have breached any provision of these terms
            and conditions.
          </Text>
        </Box>
        <Box mb="8">
          <Text fontWeight="bold" as="h2" fontSize="lg" mb="2">
            Breaches of these terms and conditions
          </Text>
          <Text mb={2}>
            Without prejudice to our other rights under these terms and
            conditions, if you breach these terms and conditions in any way, we
            may take such action as we deem appropriate to deal with the breach,
            including suspending your access to the website, prohibiting you
            from accessing the website, blocking computers using your IP address
            from accessing the website, contacting your internet service
            provider to request that they block your access to the website
            and/or bringing court proceedings against you.
          </Text>
        </Box>
        <Box mb="8">
          <Text fontWeight="bold" as="h2" fontSize="lg" mb="2">
            Variation
          </Text>
          <Text mb={2}>
            We may revise these terms and conditions from time-to-time. Revised
            terms and conditions will apply to the use of our website from the
            date of the publication of the revised terms and conditions on our
            website. Please check this page regularly to ensure you are familiar
            with the current version.
          </Text>
        </Box>
        <Box mb="8">
          <Text fontWeight="bold" as="h2" fontSize="lg" mb="2">
            Severability
          </Text>
          <Text mb={2}>
            If a provision of these terms and conditions is determined by any
            court or other competent authority to be unlawful and/or
            unenforceable, the other provisions will continue in effect. If any
            unlawful and/or unenforceable provision would be lawful or
            enforceable if part of it were deleted, that part will be deemed to
            be deleted, and the rest of the provision will continue in effect.
          </Text>
        </Box>
        <Box mb="8">
          <Text fontWeight="bold" as="h2" fontSize="lg" mb="2">
            Exclusion of third party rights
          </Text>
          <Text mb={2}>
            These terms and conditions are for the benefit of you and us, and
            are not intended to benefit any third party or be enforceable by any
            third party. The exercise of our and your rights in relation to
            these terms and conditions is not subject to the consent of any
            third party.
          </Text>
        </Box>
        <Box mb="8">
          <Text fontWeight="bold" as="h2" fontSize="lg" mb="2">
            Entire agreement
          </Text>
          <Text mb={2}>
            These terms and conditions, together with our privacy policy,
            constitute the entire agreement between you and us in relation to
            your use of our website, and supersede all previous agreements in
            respect of your use of this website.
          </Text>
        </Box>
        <Box mb="8">
          <Text fontWeight="bold" as="h2" fontSize="lg" mb="2">
            Law and jurisdiction
          </Text>
          <Text mb={2}>
            These terms and conditions will be governed by and construed in
            accordance with English law, and any disputes relating to these
            terms and conditions will be subject to the exclusive jurisdiction
            of the courts of England and Wales.
          </Text>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
