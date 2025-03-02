"use client";
import Header from "@/components/Header";
import TaskList from "@/components/TaskList";
import { ColorModeButton, useColorMode } from "@/components/ui/color-mode";
import { GlobalStateProvider } from "@/context/GlobalStateContext";
import { Box, HStack, VStack } from "@chakra-ui/react";

export default function Home() {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Box minH={"100vh"} height={"100%"} bg={"gray.900"}>
      <Header />
      <GlobalStateProvider>
        <TaskList />
      </GlobalStateProvider>
    </Box>
  );
}
