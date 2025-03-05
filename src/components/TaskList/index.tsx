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
  NativeSelect,
} from "@chakra-ui/react";

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import Task from "./TaskListComponents/Task";
import { CgCalendar, CgCalendarDates } from "react-icons/cg";
import { useEffect, useState } from "react";
import { InputGroup } from "../ui/input-group";
import { BiCheck, BiPlus, BiSort, BiTask, BiTaskX } from "react-icons/bi";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Task as TaskType } from "@/context/reducer";
import { useColorModeValue } from "@/components/ui/color-mode";
import { RiStarFill, RiStarLine } from "react-icons/ri";

interface TaskListProps {
  searchTerm: string;
}

export default function TaskList({ searchTerm }: TaskListProps) {
  const { state, dispatch } = useGlobalState();
  const { tasks } = state;
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState<
    "Urgente" | "Alta" | "Média" | "Baixa"
  >("Baixa");
  const [important, setImportant] = useState(false);
  const [category, setCategory] = useState("Outros");

  const [addVisible, setAddVisible] = useState(false);
  const name = state.name;
  const [date, setDate] = useState<string | null>(null);

  const [byDateIsVisible, setByDateIsVisible] = useState(false);
  const [byAlphabeticalIsVisible, setByAlphabeticalIsVisible] = useState(false);
  const [byCompletedIsVisible, setByCompletedIsVisible] = useState(false);
  const [allTasksIsVisible, setAllTasksIsVisible] = useState(false);
  const [incompleteTasksIsVisible, setIncompleteTasksIsVisible] =
    useState(true);

  const filteredTasks = tasks.filter((task: TaskType) =>
    task.name.toLowerCase().includes((searchTerm || "").toLowerCase())
  );
  const incompleteTasks = filteredTasks.filter((task: TaskType) => !task.done);
  const completedTasks = filteredTasks.filter((task: TaskType) => task.done);

  const sortedByName = [...incompleteTasks].sort((a: TaskType, b: TaskType) =>
    a.name.localeCompare(b.name)
  );
  
  const sortedByDate = [...incompleteTasks].sort(
    (a: TaskType, b: TaskType) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
  

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
    <HStack paddingTop={10} paddingBottom={10} overflow={"hidden"}>
      <Container width={"100%"} maxW={"container.xl"}>
        <Flex
          justifyContent="center"
          alignItems="start"
          flexDirection={"column"}
          gap={1}
          marginBottom={5}
        >
          <Text fontWeight={"bold"} fontSize={"2xl"} textAlign={"start"}>
            Olá{name ? `, ${name}` : ""}!
          </Text>
          <Flex gap={1} alignItems={"center"}>
            <CgCalendar />
            <Text fontWeight={"bold"} textAlign={"start"}>
              Hoje é {date}
            </Text>
          </Flex>
        </Flex>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            handleAddTask({
              id: Date.now(),
              name: taskName,
              done: false,
              createdAt: new Date().toISOString(),
              priority,
              important,
              category: category,
            });

            setTaskName("");
            setAddVisible(false);
            setImportant(false);
            setPriority("Baixa");
            setCategory("Outros");
          }}
        >
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
              _required={{ color: "red" }}
            >
              <Input
                placeholder="Add Task"
                required
                _placeholder={{
                  color: `${useColorModeValue("black", "white")}`,
                }}
                value={taskName}
                border="none"
                width="100%"
                backgroundColor={"transparent"}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </InputGroup>
            {addVisible && (
              <Flex
                justifyContent={"space-between"}
                width={"100%"}
                gap={2}
                flexDirection={{ base: "column", md: "row" }}
              >
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
                        <SelectItem
                          key={priorityItem.value}
                          item={priorityItem}
                        >
                          {priorityItem.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                  <NativeSelect.Root
                    size="md"
                    width="100px"
                    defaultValue={category}
                    onChange={(event) =>
                      setCategory((event.target as HTMLSelectElement).value)
                    }
                  >
                    <NativeSelect.Field placeholder="Selecione a categoria">
                      <option value="Saúde">Saúde</option>
                      <option value="Trabalho">Trabalho</option>
                      <option value="Estudo">Estudo</option>
                      <option value="Financeiro">Financeiro</option>
                      <option value="Lazer">Lazer</option>
                      <option value="Outros">Outros</option>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Flex>
                <Flex
                  justifyContent={{ base: "flex-start", md: "flex-end" }}
                  width={"100%"}
                  opacity={addVisible ? 1 : 0}
                  transform={addVisible ? "translateY(0)" : "translateY(-10px)"}
                  transition="opacity 0.3s ease, transform 0.3s ease"
                  marginTop={{ base: 2, md: 0 }}
                  marginLeft={{ base: 3, md: 0 }}
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
                    type="submit"
                  >
                    Save
                  </Button>
                </Flex>
              </Flex>
            )}
          </VStack>
        </form>
        <Separator mt={4} mb={5} />
        <Flex
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          gap={2}
          flexDirection={"column"}
        >
          <Flex flexDirection={"column"} gap={2}>
            <Text
              fontWeight={"bold"}
              fontSize={"xl"}
              textAlign={"start"}
              marginTop={4}
            >
              Tarefas
            </Text>
            <Text color={"gray.500"} fontSize={"12"} textAlign={"start"}>
              Filtros:
            </Text>
          </Flex>
          <Flex
            gap={2}
            alignItems={"end"}
            overflowX={"auto"}
            w={{ base: "100%", md: "550px" }}
            maxW={"100%"}
          >
            <Button
              size={"sm"}
              colorPalette="blue"
              variant={incompleteTasksIsVisible ? "solid" : "outline"}
              onClick={() => {
                setByDateIsVisible(false);
                setByAlphabeticalIsVisible(false);
                setByCompletedIsVisible(false);
                setIncompleteTasksIsVisible(true);
                setAllTasksIsVisible(false);
              }}
            >
              <BiTaskX /> A fazer
            </Button>

            <Button
              size={"sm"}
              colorPalette="blue"
              variant={allTasksIsVisible ? "solid" : "outline"}
              onClick={() => {
                setByDateIsVisible(false);
                setByAlphabeticalIsVisible(false);
                setByCompletedIsVisible(false);
                setAllTasksIsVisible(true);
                setIncompleteTasksIsVisible(false);
              }}
            >
              <BiTask /> Todas
            </Button>
            <Button
              size={"sm"}
              colorPalette="blue"
              variant={byCompletedIsVisible ? "solid" : "outline"}
              onClick={() => {
                setByDateIsVisible(false);
                setByAlphabeticalIsVisible(false);
                setByCompletedIsVisible(true);
                setIncompleteTasksIsVisible(false);
                setAllTasksIsVisible(false);
              }}
            >
              <BiCheck /> Completas
            </Button>
            <Button
              size={"sm"}
              colorPalette="blue"
              variant={byDateIsVisible ? "solid" : "outline"}
              onClick={() => {
                setByDateIsVisible(true);
                setByAlphabeticalIsVisible(false);
                setByCompletedIsVisible(false);
                setIncompleteTasksIsVisible(false);
                setAllTasksIsVisible(false);
              }}
            >
              <CgCalendarDates /> Data
            </Button>
            <Button
              size={"sm"}
              colorPalette="blue"
              variant={byAlphabeticalIsVisible ? "solid" : "outline"}
              onClick={() => {
                setByDateIsVisible(false);
                setByAlphabeticalIsVisible(true);
                setByCompletedIsVisible(false);
                setIncompleteTasksIsVisible(false);
                setAllTasksIsVisible(false);
              }}
            >
              <BiSort /> Alfabética
            </Button>
          </Flex>
        </Flex>
        <Separator mt={4} mb={5} />
        {allTasksIsVisible &&
          filteredTasks.map((task: TaskType) => (
            <div key={task.id}>
              <Task
                id={task.id}
                name={task.name}
                done={task.done}
                createdAt={task.createdAt}
                priority={task.priority}
                important={task.important}
                category={task.category}
              />
              <Separator />
            </div>
          ))}
        {byDateIsVisible &&
          sortedByDate.map((task: TaskType) => (
            <div key={task.id}>
              <Task
                id={task.id}
                name={task.name}
                done={task.done}
                createdAt={task.createdAt}
                priority={task.priority}
                important={task.important}
                category={task.category}
              />
              <Separator />
            </div>
          ))}

        {byAlphabeticalIsVisible &&
          sortedByName.map((task: TaskType) => (
            <div key={task.id}>
              <Task
                id={task.id}
                name={task.name}
                done={task.done}
                createdAt={task.createdAt}
                priority={task.priority}
                important={task.important}
                category={task.category}
              />
              <Separator />
            </div>
          ))}

        {incompleteTasksIsVisible &&
          incompleteTasks.map((task: TaskType) => {
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
                  category={task.category}
                />
                <Separator />
              </div>
            );
          })}

        {byCompletedIsVisible &&
          completedTasks.map((task: TaskType) => {
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
