"use client";
import Header from "@/components/Header";
import TaskList from "@/components/TaskList";
import { useColorModeValue } from "@/components/ui/color-mode";
import { GlobalStateProvider } from "@/context/GlobalStateContext";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box
      minH={"100vh"}
      height={"100%"}
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Header />
      <GlobalStateProvider>
        <TaskList />
      </GlobalStateProvider>
    </Box>
  );
}
