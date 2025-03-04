"use client";
import Header from "@/components/Header";
import TaskList from "@/components/TaskList";
import { useColorModeValue } from "@/components/ui/color-mode";
import { GlobalStateProvider } from "@/context/GlobalStateContext";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const [isHydrated, setIsHydrated] = useState(false);
  

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const bgColor = useColorModeValue("gray.50", "gray.900");

  if (!isHydrated) {
    return null;
  }
  return (
    <Box minH={"100vh"} height={"100%"} bg={bgColor}>
      <GlobalStateProvider>
        <Header
          searchTerm={searchTerm}
          onSearch={(term) => setSearchTerm(term)}
        />
        <TaskList searchTerm={searchTerm} />
      </GlobalStateProvider>
    </Box>
  );
}
