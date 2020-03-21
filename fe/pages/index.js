import React from "react";
import { Box } from "@chakra-ui/core";

import PageTitle from "../components/PageTitle";

export default function Home() {
  return (
    <Box maxWidth="lg" mx="auto">
      <Box mt={6}>
        <PageTitle textAlign="center">
          Prove my income as a sole trader
        </PageTitle>
      </Box>
    </Box>
  );
}
