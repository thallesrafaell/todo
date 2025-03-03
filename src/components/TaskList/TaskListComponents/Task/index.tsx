import {
  Flex,
  HStack,
  Text,
  Badge,
  Button,
  MenuTrigger,
  MenuRoot,
  MenuContent,
  MenuItem,
  useDisclosure,
  Menu,
} from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";
import { RiStarFill, RiStarLine } from "react-icons/ri";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useGlobalState } from "@/context/GlobalStateContext";

import { FaEllipsis } from "react-icons/fa6";
import { TbTrash } from "react-icons/tb";
import { BiEdit } from "react-icons/bi";
import ModalEditTask from "./ModalEditTask";

export type TaskProps = {
  id: number;
  name: string;
  done: boolean;
  createdAt: string;
  updatedAt?: string;
  priority: "Urgente" | "Alta" | "Média" | "Baixa";
  important: boolean;
  category: string;
};

export default function Task({
  id,
  name,
  createdAt,
  updatedAt,
  priority,
  important,
  category,
}: TaskProps) {
  const { dispatch } = useGlobalState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleRemoveTask = (id: number) => {
    dispatch({ type: "REMOVE_TASK", payload: id });
  };
  const starColor = useColorModeValue("black", "white");

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
        <Flex align={"center"} justifyContent={"space-between"} gap={4}>
          <Flex gap={2} mb={2} direction={"row"} align={"center"}>
            <Checkbox variant={"solid"} colorPalette={"blue"} />
            <Text color={useColorModeValue("black", "white")}>{name}</Text>
          </Flex>
        </Flex>
        <Flex>
          <Badge
            variant={"surface"}
            colorPalette={
              priority === "Urgente"
                ? "red" 
                : priority === "Alta"
                ? "orange" 
                : priority === "Média"
                ? "yellow" 
                : "green"}
            ml={7}
          >
            {priority}
          </Badge>

          {category && (
            <Badge variant={"surface"} colorPalette={"cyan"} ml={2}>
              {category}
            </Badge>
          )}
        </Flex>
      </Flex>
      <Flex gap={2} align={"center"}>
        <Text display={{ base: "none", md: "block" }}>Há 1 minuto</Text>
        {important ? (
          <RiStarLine color={starColor} />
        ) : (
          <RiStarFill color={starColor} />
        )}
        <Text cursor="pointer" _hover={{ opacity: 0.8 }} onClick={() => handleRemoveTask(id)}>
          <TbTrash />
        </Text>
        <ModalEditTask />
      </Flex>
    </HStack>
  );
}
