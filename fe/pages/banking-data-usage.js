import React from "react";
import {
  Box,
  Text,
  List,
  ListItem,
  ListIcon,
  Button,
  Flex,
} from "@chakra-ui/core";
import Header from "../components/Header";

export default function BankingDataUsage() {
  return (
    <>
      <Header />
      <Box maxWidth="2xl" margin="auto" mt={{ base: "10", sm: "16" }} px="5">
        <Text
          mb="5"
          fontSize="2xl"
          fontWeight="bold"
          alignSelf="center"
          letterSpacing={"-.1rem"}
          pr="2"
        >
          Connect your primary bank account
        </Text>
        <Text mb="5">
          We use open banking data via Credit Kudos to prove your income, This
          is how Covid Credit will use your data:
        </Text>
        <List spacing={6} mb={5}>
          <ListItem display="flex">
            <ListIcon
              icon="check-circle"
              color="teal.500"
              marginTop={2}
              marginRight={4}
              size={8}
            />
            <Box>
              <Text fontWeight="semibold">We’ll validate that it’s you</Text>
              <Text fontSize="sm">
                This requires access to your account details.
              </Text>
            </Box>
          </ListItem>
          <ListItem display="flex">
            <ListIcon
              icon="check-circle"
              marginTop={2}
              color="teal.500"
              marginRight={4}
              size={8}
            />
            <Box>
              <Text fontWeight="semibold">
                We'll generate an income report from your transactions
              </Text>
              <Text fontSize="sm">
                This requires access to your transactions.
              </Text>
            </Box>
          </ListItem>
          <ListItem display="flex">
            <ListIcon
              icon="check-circle"
              color="teal.500"
              marginTop={2}
              marginRight={4}
              size={8}
            />
            <Box>
              <Text fontWeight="semibold">We’ll keep your data private</Text>
              <Text fontSize="sm">
                You control when and who to send the report to.
              </Text>
            </Box>
          </ListItem>
          <ListItem display="flex">
            <ListIcon
              icon="check-circle"
              marginTop={2}
              color="teal.500"
              marginRight={4}
              size={8}
            />
            <Box>
              <Text fontWeight="semibold">
                You can delete your data at any time
              </Text>
              <Text fontSize="sm">
                You'll get a link at the end to manage your report.
              </Text>
            </Box>
          </ListItem>
        </List>
        <Box
          w="full"
          p={2}
          backgroundColor="yellow.50"
          borderColor="yellow.300"
          borderWidth={1}
          rounded={8}
          mb={10}
        >
          <Flex
            alignItems="center"
            flexDirection="row"
            justifyContent="left"
            p={2}
          >
            <Text
              display="block"
              fontSize="2.5em"
              paddingRight={4}
              paddingLeft={1}
              lineHeight={0}
            >
              <span role="img" aria-label="Information lightbulb icon">
                💡
              </span>
            </Text>
            <Flex alignItems="center">
              Make sure you connect the primary account you use for your
              business, this will ensure the report we create is accurate
            </Flex>
          </Flex>
        </Box>
        <Flex justifyContent="flex-end">
          <Button variantColor="teal" size="lg" mb={10}>
            Connect using Credit Kudos
          </Button>
        </Flex>
      </Box>
    </>
  );
}
