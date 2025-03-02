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
import { LuSun } from "react-icons/lu";

export default function Header() {
  return (
    <VStack bg={"blue"} p={4}>
      <Container maxW="container.xl">
        <Flex alignItems={"center"} justifyContent={"space-between"} gap={2}>
          <Flex alignItems={"center"} gap={2}>
            <FaCheck size={24} color="white" />
            <Text textStyle="lg" fontWeight={"bold"}>
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
            <Input placeholder="Username" width="400px" borderColor={"blue"} />
          </InputGroup>
          <Flex gap={{ base: "2px", md: "4px" }}>
            <ClientOnly fallback={<Skeleton boxSize="8" />}>
              <IconButton
                variant="outline"
                size="sm"
                border={"none"}
                _hover={{ bg: "transparent", scale: 1.1 }}
              >
                <LuSun />
              </IconButton>
            </ClientOnly>

            <Flex alignItems={"center"} gap={2}>
              <Text> Thalles Rafael</Text>
              <Avatar.Root width={8} height={8}>
                <Avatar.Fallback name="Thalles RafaelS" />
                <Avatar.Image src="https://bit.ly/sage-adebayo" />
              </Avatar.Root>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </VStack>
  );
}
