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
  createListCollection,
} from "@chakra-ui/react";

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import Task from "./TaskListComponents/Task";
import { CgCalendar } from "react-icons/cg";
import { useEffect, useState } from "react";
import { InputGroup } from "../ui/input-group";
import { BiPlus } from "react-icons/bi";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Task as TaskType } from "@/context/reducer";
import { useColorModeValue } from "@/components/ui/color-mode";
import { RiStarFill, RiStarLine } from "react-icons/ri";

export default function TaskList() {
  const { state, dispatch } = useGlobalState();
  const { tasks } = state;
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState<
    "Urgente" | "Alta" | "Média" | "Baixa"
  >("Baixa");
  const [important, setImportant] = useState(false);

  const [addVisible, setAddVisible] = useState(false);
  const name = "Thalles Rafael";
  const [date, setDate] = useState<string | null>(null);

  const incompleteTasks = tasks.filter((task: TaskType) => !task.done);
  const completedTasks = tasks.filter((task: TaskType) => task.done);

  const handleAddTask = (task: TaskType) => {
    dispatch({ type: "ADD_TASK", payload: task });
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
            <Flex justifyContent={"space-between"} width={"100%"} gap={2}>
              <Flex
                justifyContent={"flex-start"}
                alignItems={"center"}
                marginLeft={3}
                gap={2}
                width={"100%"}
                opacity={addVisible ? 1 : 0}
                transform={addVisible ? "translateY(0)" : "translateY(-10px)"}
                transition="opacity 0.3s ease, transform 0.3s ease"
              >
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setImportant(!important);
                  }}
                >
                  {important ? <RiStarFill /> : <RiStarLine />}
                </a>
                <SelectRoot
                  collection={priorityCollection}
                  size="md"
                  width="100px"
                  defaultValue={["Baixa"]}
                  onChange={(event) =>
                    setPriority(
                      (event.target as HTMLSelectElement).value as
                        | "Urgente"
                        | "Alta"
                        | "Média"
                        | "Baixa"
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValueText placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorityCollection.items.map((priorityItem) => (
                      <SelectItem key={priorityItem.value} item={priorityItem}>
                        {priorityItem.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Flex>
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

                    handleAddTask({
                      id: Date.now(),
                      name: taskName,
                      done: false,
                      createdAt: new Date().toISOString(),
                      priority,
                      important,
                      category: "",
                    });

                    setTaskName("");
                    setAddVisible(false);
                    setImportant(false);
                    setPriority("Baixa");
                  }}
                >
                  Save
                </Button>
              </Flex>
            </Flex>
          )}
        </VStack>
        <Separator mt={4} mb={5} />
        Tasks
        {incompleteTasks.map((task: TaskType) => {
          console.log("completa:", task);
          return (
            <div key={task.id}>
              <Task
                key={task.id}
                id={task.id}
                name={task.name}
                done={task.done}
                createdAt={task.createdAt}
                priority={task.priority}
                important={task.important}
                category={""}
              />
              <Separator />
            </div>
          );
        })}
        task completed
        {completedTasks.map((task: TaskType) => {
          console.log("imcompleta:", task);

          return (
            <div key={task.id}>
              <Task
                key={task.id}
                id={task.id}
                name={task.name}
                done={task.done}
                createdAt={task.createdAt}
                priority={task.priority}
                important={task.important}
                category={""}
              />
              <Separator />
            </div>
          );
        })}
      </Container>
    </HStack>
  );
}
export const priorityCollection = createListCollection({
  items: [
    { label: "Urgente", value: "Urgente" },
    { label: "Alta", value: "Alta" },
    { label: "Média", value: "Média" },
    { label: "Baixa", value: "Baixa" },
  ],
});
