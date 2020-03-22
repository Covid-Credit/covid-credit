import React from "react";
import {
  Box,
  Text,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useClipboard,
  Spinner,
} from "@chakra-ui/core";
import Error from "next/error";
import Header from "../../components/Header";
import { getApi } from "../../utils";

export default function ViewReport({ data, ref }) {
  const reportLink = `https://storage.googleapis.com/covid-credit-dev/${data.report_file}`;
  const { onCopy, hasCopied } = useClipboard(reportLink);

  if (!data) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <Header />
      <Box maxWidth="2xl" margin="auto" mt={{ base: "10", sm: "16" }} px="5">
        <Text
          mb="3"
          fontSize="2xl"
          fontWeight="bold"
          alignSelf="center"
          letterSpacing={"-.1rem"}
          pr="2"
        >
          Your report
        </Text>
        {data.status === "pending" ? (
          <Stack spacing={10}>
            <Text>
              Generating your report. This page will update as soon as it's
              ready
            </Text>
            <Spinner size="xl" />
          </Stack>
        ) : (
          <Stack spacing={10}>
            <Box borderTop="1px solid #EEE" pt={5}>
              <Text
                mb={2}
                textTransform="uppercase"
                fontWeight="bold"
                fontSize="xs"
              >
                View your income report & declaration
              </Text>
              <Button
                variantColor="teal"
                variant="link"
                size="md"
                as="a"
                href={reportLink}
              >
                View your report
              </Button>
            </Box>
            <Box>
              <Text
                mb={2}
                textTransform="uppercase"
                fontWeight="bold"
                fontSize="xs"
              >
                Share the above report
              </Text>
              <InputGroup size="md">
                <Input variant="filled" value={reportLink} readOnly pr="2em" />
                <InputRightElement width="4.5em">
                  <Button onClick={onCopy} variantColor="teal" size="sm">
                    {hasCopied ? "Copied" : "Copy"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>
          </Stack>
        )}
      </Box>
    </>
  );
}

ViewReport.getInitialProps = async ctx => {
  const { ref } = ctx.query;

  let data;
  try {
    data = await getApi(`report/${ref}`, ctx);
  } catch (error) {
    data = null;
  }

  return {
    data,
  };
};
