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
} from "@chakra-ui/core";
import Header from "../components/Header";

export default function BankingDataUsage() {
  const [shareCode, setShareCode] = React.useState("HCSU472");
  const { onCopy, hasCopied } = useClipboard(shareCode);

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
          Your data dashboard
        </Text>
        <Text mb={5}>
          Here you can manage your generated report. Bookmark this page to come
          back here.
        </Text>
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
            <Button variantColor="teal" variant="link" size="md">
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
              <Input variant="filled" value={shareCode} pr="2em" />
              <InputRightElement width="4.5em">
                <Button onClick={onCopy} variantColor="teal" size="sm">
                  {hasCopied ? "Copied" : "Copy"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
          <Box borderTop="1px solid #EEE" pt={5}>
            <Text
              mb={2}
              textTransform="uppercase"
              fontWeight="bold"
              fontSize="xs"
            >
              Manage your data
            </Text>
            <Button variantColor="red" size="md" variant="link">
              Permanently delete all of my data
            </Button>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
