"use client";

import {
  Button,
  Flex,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Stack,
  createListCollection,
} from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

import { Field } from "@/components/ui/field";
import { useRef } from "react";
import { BiEdit } from "react-icons/bi";
import { priorityCollection } from "@/components/TaskList";

export default function ModalEditTask(id: number) {
  const ref = useRef<HTMLInputElement>(null);

  const categories = createListCollection({
    items: [
      { label: "Saúde", value: "Saúde" },
      { label: "Trabalho", value: "Trabalho" },
      { label: "Estudo", value: "Estudo" },
      { label: "Financeiro", value: "Financeiro" },
      { label: "Lazer", value: "Lazer" },
      { label: "Outros", value: "Outros" },
    ],
    itemToString: (item) => item.label,
    itemToValue: (item) => item.value,
  });

  return (
    <DialogRoot initialFocusEl={() => ref.current}>
      <DialogTrigger asChild>
        <Flex
          gap={2}
          alignItems="center"
          cursor="pointer"
          _hover={{ opacity: 0.8 }}
        >
          <BiEdit />
        </Flex>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
        </DialogHeader>
        <DialogBody pb="4">
          <Stack gap="4">
            <Field label="Titulo">
              <Input placeholder="Title" defaultValue={"titulo"} />
            </Field>
            <Field label="Prioridade">
              <SelectRoot
                collection={priorityCollection}
                size="md"
                defaultValue={["Baixa"]}
              >
                <SelectTrigger display="flex" justifyContent="space-between">
                  <SelectValueText placeholder="Selecione a prioridade" />
                  <span>&#9662;</span>{" "}
                  {/* Adicionando a seta manualmente se necessário */}
                </SelectTrigger>
                <SelectContent>
                  {priorityCollection.items.map((priorityItem) => (
                    <SelectItem key={priorityItem.value} item={priorityItem}>
                      {priorityItem.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Field>
            <Field label="Categoria">
              <SelectRoot
                collection={categories} // Passando a coleção de categorias aqui
                size="md"
                defaultValue={["Outros"]}
              >
                <SelectTrigger display="flex" justifyContent="space-between">
                  <SelectValueText placeholder="Selecione a categoria" />
                  <span>&#9662;</span>
                </SelectTrigger>
                <SelectContent>
                  {categories.items.map((categoryItem) => (
                    <SelectItem key={categoryItem.value} item={categoryItem}>
                      {categoryItem.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Field>

            <Checkbox defaultChecked={false} colorPalette={"blue"}>
              Importante
            </Checkbox>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button colorPalette="red" variant="outline">
              Cancelar
            </Button>
          </DialogActionTrigger>
          <Button colorPalette="blue">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
