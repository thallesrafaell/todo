import { Flex, HStack, Text, Badge } from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";
import { RiStarLine } from "react-icons/ri";

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
      _hover={{ border: "1px solid white" }}
      borderRadius={4}
      padding={"8px 10px"}
    >
      <Flex direction={"column"}>
        <Flex gap={2} mb={2}>
          <Checkbox variant={"solid"} colorPalette={"blue"} />
          <Text color={"white"}>{name}</Text>
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
        <RiStarLine color={"white"} />
      </Flex>
    </HStack>
  );
}
