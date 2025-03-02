import { Flex, HStack, Text, Badge } from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";
import { RiStarLine } from "react-icons/ri";
import { useColorModeValue } from "@/components/ui/color-mode";

type TaskProps = {
  id: number;
  name: string;
};

export default function Task({ id, name }: TaskProps) {
  return (
    <HStack
      align="center"
      mb={4}
      justifyContent={"space-between"}
      _hover={{ border: `1px solid ${useColorModeValue("gray", "white")}` }}
      borderRadius={4}
      padding={"8px 10px"}
      transition="border 0.3s ease, background-color 0.3s ease"
    >
      <Flex direction={"column"}>
        <Flex gap={2} mb={2}>
          <Checkbox variant={"solid"} colorPalette={"blue"} />
          <Text color={useColorModeValue("black", "white")}>{name}</Text>
        </Flex>

        <Flex>
          <Badge variant={"surface"} colorPalette={"red"} ml={7}>
            Urgente
          </Badge>

          <Badge variant={"surface"} colorPalette={"green"} ml={2}>
            Estudos
          </Badge>
        </Flex>
      </Flex>
      <Flex alignItems={"center"} gap={2} color={"gray.400"}>
        <Text>Há 1 minuto</Text>
        <RiStarLine color={useColorModeValue("black", "white")} />
      </Flex>
    </HStack>
  );
}
