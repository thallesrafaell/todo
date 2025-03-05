import {
  Avatar,
  ClientOnly,
  Container,
  Flex,
  IconButton,
  Input,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import { InputGroup } from "../ui/input-group";
import { BiSearch } from "react-icons/bi";
import { LuMoon, LuSun } from "react-icons/lu";
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";
import { useGlobalState } from "@/context/GlobalStateContext";

export default function Header({ searchTerm, onSearch } : {searchTerm: string, onSearch: (term: string) => void}) {
  const { toggleColorMode, colorMode } = useColorMode();
  const {state} = useGlobalState();
  return (
    <VStack bg={"blue"} p={4} overflow={"hidden"}>
      <Container maxW="container.xl">
        <Flex alignItems={"center"} justifyContent={"space-between"} gap={2}>
          <Flex alignItems={"center"} gap={2}>
            <FaCheck size={24} color={useColorModeValue("white", "white")} />
            <Text
              textStyle="lg"
              fontWeight={"bold"}
              color={useColorModeValue("white", "white")}
            >
              Todo
            </Text>
          </Flex>

          <InputGroup
            bg="white"
            borderRadius={4}
            borderColor={"blue"}
            startElement={<BiSearch color="blue" />}
            color={"gray.900"}
            display={{ base: "none", md: "block" }}
          >
            <Input
              placeholder="Search task"
              width="400px"
              borderColor={"blue"}
              value={searchTerm} 
              onChange={(e) => onSearch(e.target.value)} 
            />
          </InputGroup>
          <Flex gap={{ base: "2px", md: "4px" }}>
            <ClientOnly fallback={<Skeleton boxSize="8" />}>
              <IconButton
                variant="outline"
                size="sm"
                border={"none"}
                _hover={{ bg: "transparent", scale: 1.1 }}
                color={useColorModeValue("white", "white")}
                onClick={toggleColorMode}
              >
                {colorMode === "light" ? <LuSun /> : <LuMoon />}
              </IconButton>
            </ClientOnly>

            <Flex alignItems={"center"} gap={2}>
              <Text color={useColorModeValue("white", "white")}>
                {" "}
                {state.name}
              </Text>
              <Avatar.Root width={8} height={8}>
                <Avatar.Fallback name="Thalles RafaelS" />
              </Avatar.Root>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </VStack>
  );
}
