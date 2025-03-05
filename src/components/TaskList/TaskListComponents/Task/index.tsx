"use client";
import { Flex, HStack, Text, Badge } from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";
import { RiStarFill, RiStarLine } from "react-icons/ri";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useGlobalState } from "@/context/GlobalStateContext";

import { TbTrash } from "react-icons/tb";

import ModalEditTask from "./ModalEditTask";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type TaskProps = {
  id: number;
  name: string;
  done: boolean;
  createdAt: string;
  updatedAt?: string;
  priority: "Urgente" | "Alta" | "Média" | "Baixa";
  important: boolean;
  category: string;
  openModal?: boolean;
};

export default function Task({
  id,
  name,
  createdAt,
  updatedAt,
  priority,
  important,
  category,
  done,
}: TaskProps) {
  const { dispatch } = useGlobalState();
  const starColor = useColorModeValue("black", "white");
  const textColor = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("gray", "white");
  const [complete, setComplete] = useState(done);
  const [isRemoved, setIsRemoved] = useState(false);

  const handleRemoveTask = (id: number) => {
    setIsRemoved(true); // Ativa a animação de saída
    setTimeout(() => {
      dispatch({ type: "REMOVE_TASK", payload: id }); // Remove a tarefa após 500ms para permitir a animação
    }, 500);
  };

  const handleToggleComplete = () => {
    setIsRemoved(true);
    setComplete((prev) => prev); // Alterna o valor de 'complete'

    // Atualiza o estado global com a nova informação de 'done'
    dispatch({
      type: "EDIT_TASK",
      payload: {
        id,
        done: !complete,
      },
    });
  };

  const getTimeAgo = (createdAt: string) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diffInMilliseconds = now.getTime() - createdDate.getTime();
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    // Se a tarefa foi criada há menos de 1 minuto
    if (diffInMinutes < 1) return "Há menos de 1 minuto";

    // Se a tarefa foi criada há 1 minuto até 59 minutos
    if (diffInMinutes < 60)
      return `Há ${diffInMinutes} minuto${diffInMinutes > 1 ? "s" : ""}`;

    // Se a tarefa foi criada há 1 hora até 5 horas
    if (diffInHours <= 5)
      return `Há ${diffInHours} hora${diffInHours > 1 ? "s" : ""}`;

    // Se a tarefa foi criada entre 5 horas e 24 horas
    if (diffInHours < 24) return "Hoje";

    // Se a tarefa foi criada há mais de 1 dia
    if (diffInDays === 1) return "Há 1 dia";
    if (diffInDays > 1) return `Há ${diffInDays} dias`;
  };

  return (
    <>
      <AnimatePresence>
        {!isRemoved && (
          <motion.div
            initial={{ opacity: 0, x: -100 }} // Começa da esquerda com opacidade 0
            animate={{ opacity: 1, x: 0 }} // Anima para o centro com opacidade 1
            exit={{ opacity: 0, x: 100 }} // Quando for removida, sai pela direita
            transition={{ duration: 0.5 }}
          >
            <HStack
              align="center"
              mb={4}
              justifyContent={"space-between"}
              _hover={{
                border: `1px solid ${borderColor}`,
              }}
              border={"1px solid transparent"}
              borderRadius={4}
              padding={"8px 10px"}
              transition="border 0.3s ease, background-color 0.3s ease"
            >
              <Flex direction={"column"}>
                <Flex align={"center"} justifyContent={"space-between"} gap={4}>
                  <Flex gap={2} mb={2} direction={"row"} align={"center"}>
                    <Checkbox
                      variant={"solid"}
                      colorPalette={"blue"}
                      onCheckedChange={handleToggleComplete}
                      defaultChecked={done}
                    />
                    <Text color={textColor}>{name}</Text>
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
                        : "green"
                    }
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
                <Text display={{ base: "none", md: "block" }}>
                  {" "}
                  {getTimeAgo(createdAt)}
                </Text>
                {!important ? (
                  <RiStarLine color={starColor} />
                ) : (
                  <RiStarFill color={starColor} />
                )}
                <Text
                  cursor="pointer"
                  _hover={{ opacity: 0.8 }}
                  onClick={() => handleRemoveTask(id)}
                >
                  <TbTrash />
                </Text>
                <ModalEditTask
                  id={id}
                  name={name}
                  createdAt={createdAt}
                  updatedAt={updatedAt}
                  priority={priority}
                  category={category}
                  important={important}
                  done={done}
                />
              </Flex>
            </HStack>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
