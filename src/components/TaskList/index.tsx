"use client";
import {
  Button,
  Container,
  Flex,
  HStack,
  Input,
  Text,
  VStack,
  Separator,
} from "@chakra-ui/react";
import Task from "./TaskListComponents/Task";
import { CgCalendar } from "react-icons/cg";
import { Key, useEffect, useState } from "react";
import { InputGroup } from "../ui/input-group";
import { BiPlus } from "react-icons/bi";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Task as TaskType } from "@/context/reducer";
import { useColorModeValue } from "@/components/ui/color-mode";

export default function TaskList() {
  const { state, dispatch } = useGlobalState();
  const { tasks } = state;
  const [taskName, setTaskName] = useState("");

  const [addVisible, setAddVisible] = useState(false);
  const name = "Thalles Rafael";
  const [date, setDate] = useState<string | null>(null);

  console.log("TASKSname >>>>", taskName);
  const handleAddTask = (task: { id: number; name: string }) => {
    console.log("Entrei aqui");
    dispatch({ type: "ADD_TASK", payload: task });
    console.log("TASK >>>>", task);
  };

  const handleRemoveTask = (id: number) => {
    dispatch({ type: "REMOVE_TASK", payload: id });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(
        new Date().toLocaleString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000);

    if (!date) {
      return;
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <HStack paddingTop={10} paddingBottom={10}>
      <Container width={"100%"} maxW={"container.xl"}>
        <Flex
          justifyContent="center"
          alignItems="start"
          flexDirection={"column"}
          gap={1}
          marginBottom={5}
        >
          <Text fontWeight={"bold"} fontSize={"2xl"} textAlign={"start"}>
            Olá, {name}
          </Text>
          <Flex gap={1} alignItems={"center"}>
            <CgCalendar />
            <Text fontWeight={"bold"} textAlign={"start"}>
              Hoje é {date}
            </Text>
          </Flex>
        </Flex>

        <VStack alignItems={"start"} width={"100%"}>
          <InputGroup
            bg="white"
            border="none"
            borderRadius={4}
            startElement={<BiPlus color="blue" />}
            color={useColorModeValue("gray.900", "white")}
            backgroundColor={"transparent"}
            fontSize={"xl"}
            width="100%"
            onFocus={() => setAddVisible(true)}
          >
            <Input
              placeholder="Add Task"
              _placeholder={{ color: `${useColorModeValue("black", "white")}` }}
              value={taskName}
              border="none"
              width="100%"
              backgroundColor={"transparent"}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </InputGroup>
          {addVisible && (
            <Flex
              justifyContent={"flex-end"}
              width={"100%"}
              opacity={addVisible ? 1 : 0}
              transform={addVisible ? "translateY(0)" : "translateY(-10px)"}
              transition="opacity 0.3s ease, transform 0.3s ease"
            >
              <Button
                colorPalette="red"
                variant="outline"
                onClick={() => setAddVisible(false)}
              >
                Cancel
              </Button>
              <Button
                size={"sm"}
                colorPalette="blue"
                marginLeft={2}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Clique no botão 'Save'!");
                  console.log("Task Name Before Add:", taskName);
                  handleAddTask({ id: Date.now(), name: taskName });
                  console.log("TASK NAME >>>>", taskName);
                  setTaskName("");
                  setAddVisible(false);
                }}
              >
                Save
              </Button>
            </Flex>
          )}
        </VStack>
        <Separator mt={4} mb={5} />

        {tasks.map((task: TaskType) => {
          return (
            <>
              <Task key={task.id} id={task.id} name={task.name} />
              <Separator />
            </>
          );
        })}
      </Container>
    </HStack>
  );
}
